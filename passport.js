var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
module.exports.passport = require('passport')
module.exports.init = (passportInstance) => {
    passportInstance.use(new OAuth2Strategy(
        {
            authorizationURL: '',
            tokenURL: '',
            clientID: '',
            clientSecret: '',
            callbackURL: ''
        }, (accessToken, refreshToken, profile, done) => {

        }
    ));
}
module.exports.routeSetup = (app, passportInstance) => {
    app.get('/auth/provider', passportInstance.authenticate('provider'));
    app.get('/auth/provider/callback',
        passportInstance.authenticate('provider', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
}