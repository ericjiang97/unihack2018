const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Datastore = require("@google-cloud/datastore");
const bodyParser = require("body-parser");
const session = require("express-session");
const DatastoreStore = require("@google-cloud/connect-datastore")(session);
require("./passport");

const datastore = new Datastore({
  projectId: "calad-unihack"
});

const APPLICATION_PORT = process.env.port || 8080;

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
app.use(passport.initialize());
app.use(
  session({
    store: new DatastoreStore({
      dataset: Datastore({
        prefix: "express-sessions",

        // For convenience, @google-cloud/datastore automatically looks for the
        // GCLOUD_PROJECT environment variable. Or you can explicitly pass in a
        // project ID here:
        projectId: "calad-unihack" || process.env.GCLOUD_PROJECT,

        // For convenience, @google-cloud/datastore automatically looks for the
        // GOOGLE_APPLICATION_CREDENTIALS environment variable. Or you can
        // explicitly pass in that path to your key file here:
        keyFilename:
          "./datastore.json" || process.env.GOOGLE_APPLICATION_CREDENTIALS
      })
    }),
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.session());

app.get("/api/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(403).send({ error: "Unauthenticated" });
  }
});
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
  passport.authenticate("google", {
    scope: ["profile", "https://www.googleapis.com/auth/calendar.readonly"]
  })
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
