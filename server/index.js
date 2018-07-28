const express = require("express");
const app = express();
const passport = require("passport");
const Datastore = require("@google-cloud/datastore");
const session = require("express-session");
const path = require("path");
const {google} = require('googleapis');
const DatastoreStore = require("@google-cloud/connect-datastore")(session);
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("node-uuid");
const pt = require("./util/passport");
const datastore = new Datastore({
    projectId: "calad-unihack"
});

const port = process.env.port || 8080;
const config = {
  MORGAN_LOGGER_MODE: "dev",
  DATASTORE: new Datastore({
    projectId: process.env.GCLOUD_PROJECT || "calad-unihack",
    keyFilename:
      process.env.GOOGLE_APPLICATION_CREDENTIALS || "./config/datastore.json"
  })
};
app.use(morgan(config.MORGAN_LOGGER_MODE));
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(
  session({
    store: new DatastoreStore({
      dataset: Datastore({
        prefix: "express-sessions",

        // For convenience, @google-cloud/datastore automatically looks for the
        // GCLOUD_PROJECT environment variable. Or you can explicitly pass in a
        // project ID here:
        projectId: process.env.GCLOUD_PROJECT || "calad-unihack",

        // For convenience, @google-cloud/datastore automatically looks for the
        // GOOGLE_APPLICATION_CREDENTIALS environment variable. Or you can
        // explicitly pass in that path to your key file here:
        keyFilename:
          process.env.GOOGLE_APPLICATION_CREDENTIALS ||
          "./config/datastore.json"
      })
    }),
    secret: "my-secret"
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "build")));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "https://www.googleapis.com/auth/calendar"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/api/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(403).send({ error: "Unauthenticated" });
  }
});

function userLogged(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/auth/google');
}

app.get("/calendar", userLogged, (req, res) => {
    let oauth2Client = new google.auth.OAuth2(
        pt.GOOGLE_CLIENT_ID,
        pt.GOOGLE_CLIENT_SECRET,
        "https://calad-unihack.appspot.com/auth/google/callback"
    );

    oauth2Client.credentials = {
        access_token: req.user.access_token,
        refresh_token: req.user.refresh_token
    };

    let calendar = google.calendar('v3');
    let resp = null;
    calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    }, function(err, response) {
        // process result
        console.log(response);
        if (response !== null) {
            resp = response;
        } else {
            resp = {};
        }
    });
    while (resp == null) {
        console.log("pending...")
    }
    res.send(resp);
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
