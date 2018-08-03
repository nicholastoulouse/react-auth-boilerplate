const passport = require('passport');

module.exports = app => {
  // The route for logging users into google
  app.get(
    '/auth/google',
    // the first  parameter to authenticate tells passport which strategy to use
    // the 2nd one is an options object
    // the scope specifies to google what access we want to have from this profile
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // for this specific route below, make sure you have this route available in the
  // google developers console otherwise you will get an error when you hit the /auth/google route
  // the error will give you the link to fix the problem
  // make sure something like http:localhost:3000/auth/google/callback
  // is input into the authorized redirect urls


  // This route will be hit automatically when the user hits the /auth/google route
  // this tells passport that the user is not attempting to be authenticated for the first time
  // we are turning the actual code into an actual profile
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/')
    }
  );

  app.get('/api/logout', (req, res) => {
    // this logout method is automatically added by passport
    // this takes the cookie that's associated with the users id
    // and destroys it
    req.logout();
    // sends back undefined
    res.redirect('/');w
  });

  app.get('/api/current_user', (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
};