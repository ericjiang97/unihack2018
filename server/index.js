const express = require("express");
const app = express();
const passport = require("passport");
const Datastore = require("@google-cloud/datastore");
const session = require("express-session");
const path = require("path");
const DatastoreStore = require("@google-cloud/connect-datastore")(session);
const morgan = require("morgan");
const bodyParser = require("body-parser");
const language = require("@google-cloud/language");
const uuid = require("node-uuid");
const data = require("./data");
const Fuse = require("fuse.js");
require("./util/passport");

const port = process.env.port || 8080;
const config = {
  MORGAN_LOGGER_MODE: "dev",
  GOOGLE_NLP_API_KEY: "AIzaSyCz1lbCoFb2G8_ewdTc6g9UijkW1CK3FrM",
  DATASTORE: new Datastore({
    projectId: process.env.GCLOUD_PROJECT || "calad-unihack",
    keyFilename:
      process.env.GOOGLE_APPLICATION_CREDENTIALS || "./config/datastore.json"
  }),
  DATASTORE_KINDS: "reviews",
  FUSE_SETTINGS: {
    caseSensitive: true,
    shouldSort: true,
    includeScore: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["unitCode", "unitName", "faculty"]
  }
};
const fuse = new Fuse(data, config.FUSE_SETTINGS);

const client = new language.LanguageServiceClient({
  projectId: process.env.GCLOUD_PROJECT || "monashunitreview-prod",
  keyFilename:
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "./config/datastore.json"
});
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

app.post("/api/user/reviews", (req, res) => {
  if (req.isAuthenticated && req.user) {
    const userId = req.user.id;
    const payload = req.body;

    const { review, unitCode } = payload;
    if (review && unitCode) {
      console.log(review);
      const document = {
        content: review,
        type: "PLAIN_TEXT"
      };
      client
        .analyzeSentiment({ document: document })
        .then(results => {
          const sentiment = results[0].documentSentiment;
          const data = {
            ...document,
            score: sentiment.score,
            userId,
            unitCode
          };
          const name = uuid.v4();
          const taskKey = config.DATASTORE.key([config.DATASTORE_KINDS, name]);
          const task = {
            key: taskKey,
            data
          };
          config.DATASTORE.save(task)
            .then(() => {
              console.log(`Saved ${task.key.name}`);
              res.send(task);
            })
            .catch(err => {
              console.error("ERROR:", err);
              res.status(500).send(err);
            });
        })
        .catch(err => {
          console.error(err);
          res.status(500).send({ error: err });
        });
      // res.status(200).send("OK!");
    } else {
      res.status(400).send({ error: "Need review and unitCode field in body" });
    }
  } else {
    res.status(403).send({ error: "Unauthenticated" });
  }
});

app.get("/api/user/reviews", (req, res) => {
  if (req.isAuthenticated && req.user) {
    const userId = req.user.id;
    const query = config.DATASTORE.createQuery(config.DATASTORE_KINDS).filter(
      "userId",
      userId
    );
    config.DATASTORE.runQuery(query)
      .then(results => {
        res.send({ reviews: results[0] });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(403).send({ error: "Unauthenticated" });
  }
});

app.get("/api/units/reviews/:unitCode", (req, res) => {
  const unitCode = req.params.unitCode;
  if (unitCode) {
    const query = config.DATASTORE.createQuery(config.DATASTORE_KINDS).filter(
      "unitCode",
      unitCode
    );
    config.DATASTORE.runQuery(query)
      .then(results => {
        res.send({ reviews: results[0] });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send({ error: "Need unitCode within params" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/api/search/:searchQuery", (req, res) => {
  var result = fuse.search(req.params.searchQuery);
  res.send(result);
});

app.get("*", function(req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
