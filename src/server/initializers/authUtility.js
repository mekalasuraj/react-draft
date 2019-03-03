export default () => {

    const ensureAuthenticated = function ensureAuthenticated(role) {
        return (req, res, next) => {
            if(req.isAuthenticated() && req.user.type === role) {
                // user is authenticated and authorized to access
                next();
            } else {
                res.redirect('/');
            }
        };
    };

    return {
        ensureAuthenticated
    };
};
