import passport from 'passport';
import {Strategy} from 'passport-local';

export default (app, configService) => {

    passport.use(new Strategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    }, (req, email, password, done) => {
        configService.getByEmail(email, password)
        .then((response) => {
            if(response.status === 'success') {
                return done(null, response.data);
            }
            return done(null, false);
        })
        .catch(err => {
            req.responseUtility.getFailureResponse(req, err);
            return done(null, false);
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());
};
