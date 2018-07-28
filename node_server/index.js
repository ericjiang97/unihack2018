const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Datastore = require("@google-cloud/datastore");
const {google} = require('googleapis');
const bodyParser = require("body-parser");
const session = require("express-session");
const DatastoreStore = require("@google-cloud/connect-datastore")(session);
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
app.use(passport.initialize());
app.use(passport.session());
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
          "datastore.json" || process.env.GOOGLE_APPLICATION_CREDENTIALS
      })
    }),
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  })
);
app.get("/api/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(403).send({ error: "Unauthenticated" });
  }
});

app.get("/", (req, res) => res.send("Hello from Google App Engine!"));

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

app.get("/user", (req, res) => {
    res.send(req.user);
});

app.put("/setPriority", (req, res) => {
    let body = req.body;

    let eventId = body['eventId'];
    let prio = body['priority'];

    let eventPriorityKey = datastore.key(["EventPriorities"]);
    let data = {
        eventId: eventId,
        priority: prio,
    };

    datastore.save({
        key: eventPriorityKey,
        data: data
    }).then(() => {
        console.log(data);
    }).catch((e) => {
        console.log(e);
    });

    res.send(data);
});

function userLogged(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/auth/google');
}

app.get("/calendar", userLogged, (req, res) => {

    let oauth2Client = new OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        "https://calad-unihack.appspot.com/auth/google/callback"
    );

    oauth2Client.credentials = {
        access_token: req.user.access_token,
        refresh_token: req.user.refresh_token
    };

    let calendar = google.calendar('v3');
    calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    }, function(err, response) {
        // process result
    });

    let auth = req.auth;
    console.log(auth);
    res.send(listEvents(auth));
});

app.listen(APPLICATION_PORT, () =>
  console.log(`Example app listening on port ${APPLICATION_PORT}!`)
);
