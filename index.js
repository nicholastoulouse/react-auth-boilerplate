const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');

// this should be above the passport require
// you will get an error if you dont do this.
// this is because if you flip this require call
// we will be attempting to use the User model before we define it
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
  cookieSession({
    // the maxAge setting tells the browser how long it will take before this cookie expires
    // here I set it to 30 days. It has to be passed as milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // this keys setting will be used to sign and encrypt our cookie
    // we can specifies multiple keys here
    // it will use a random one to encrypt the cookie if you pass more keys
    keys: [ keys.cookieKey ]
  })
);
// These tells passport to use cookies to handle authentication
// once these functions run, our User model instance will be added to req.user
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.send({ hi: "there"});
});

app.listen(PORT, () => {
  console.log("Server has started on port:" + PORT);
});
