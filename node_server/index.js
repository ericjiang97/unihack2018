const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Datastore = require("@google-cloud/datastore");
const bodyParser = require("body-parser");

const datastore = new Datastore({
  projectId: "calad-unihack"
});

const APPLICATION_PORT = process.env.port || 8080;
const GOOGLE_CLIENT_ID =
  "1074396627262-0tcuf75tlk4gld2pjus7rt1en00occ74.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "4_GYu7iDWmGB9PV_o46whdg_";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://calad-unihack.appspot.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(require("serve-static")(__dirname + "/../../public"));
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/test", (req, res) => {
  let data = {
    name: "testing"
  };
  const objKey = datastore.key("Test");
  const obj = {
    key: objKey,
    data: data
  };
  datastore.upsert(obj).then(() => {
    console.log("Worked!");
  });

  res.status(200).send("Test");
});

app.get("/", (req, res) => res.send("Hello from Google App Engine!"));

app.get("/teapot", (req, res) => {
  res.status(418).send("Hello I'm a teapot running on Node Standard GAE");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.listen(APPLICATION_PORT, () =>
  console.log(`Example app listening on port ${APPLICATION_PORT}!`)
);
