
export default (emailService) => {

    const index = function index(req, res) {
        res.render('home', {
            title: 'Welcome to ptemps.com',
            layout: 'pageLayout'
        });
    };
    const mainPageApp = function mainPageApp(req, res) {
        res.render('mainPage', {
            title: 'Welcome to ptemps.com',
            layout: 'pageLayout'
        });
    };
    const notesPage = function notesPage(req, res) {
        res.render('notesPage', {
            title: 'Welcome to ptemps.com',
            layout: 'pageLayout'
        });
    };
    return {
        index,
        mainPageApp,
        notesPage
    };
};
