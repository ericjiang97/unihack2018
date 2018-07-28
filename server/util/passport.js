const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Datastore = require("@google-cloud/datastore");

const GOOGLE_CLIENT_ID =
  "1074396627262-0tcuf75tlk4gld2pjus7rt1en00occ74.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "4_GYu7iDWmGB9PV_o46whdg_";

const PASSPORT_CALLBACK_URI = `${
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://calad-unihack.appspot.com"
}/auth/google/callback`;

const DataStore = new Datastore({
  projectId: process.env.GCLOUD_PROJECT || "calad-unihack",
  keyFilename:
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "./config/datastore.json"
});
const DS_User_Kind = "user";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: PASSPORT_CALLBACK_URI
    },
    (accessToken, refreshToken, profile, cb) => {
      const query = DataStore.createQuery(DS_User_Kind).filter(
        "id",
        profile.id
      );

      DataStore.runQuery(query)
        .then(results => {
          if (results[0].length === 0) {
            const taskKey = DataStore.key([DS_User_Kind, profile.id]);
            const task = {
              key: taskKey,
              data: Object({}, profile)
            };
            DataStore.save(task)
              .then(() => {
                return cb(null, profile);
              })
              .catch(err => {
                console.error("ERROR:", err);
                throw new Error(err);
              });
          } else {
            return cb(null, profile);
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  )
);

module.exports = {
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    PASSPORT_CALLBACK_URI
};