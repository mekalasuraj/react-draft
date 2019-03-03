import passport from 'passport';

export default (responseUtility) => {
    const login = function login(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if(err) {
                res.json(err);
            } else if(user === false) {
                // this means local strategy failed because of invalid info
                res.json(responseUtility.getInvalidResponse([{
                    param: 'summary',
                    msg: 'Invalid Email/Password combination'
                }]));
            } else {
                // this means valid user credentials, can proceed with login
                req.login(user, (err) => {
                    if(err) {
                        return next(err);
                    }
                    res.json({
                        status: 'success',
                        data: req.user
                    });
                });
            }
        })(req, res, next);
    };

    const logout = function logout(req, res) {
        req.logout();
        res.redirect('/');
    };

    return {
        login,
        logout
    };
};
