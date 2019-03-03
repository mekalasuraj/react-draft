
export default (emailService) => {

    const index = function index(req, res) {
        res.render('home', {
            title: 'React-Draft',
            layout: 'pageLayout'
        });
    };
    const mainPageApp = function mainPageApp(req, res) {
        res.render('mainPage', {
            title: 'React-Draft',
            layout: 'pageLayout'
        });
    };
    const notesPage = function notesPage(req, res) {
        res.render('notesPage', {
            title: 'React-Draft',
            layout: 'pageLayout'
        });
    };
    return {
        index,
        mainPageApp,
        notesPage
    };
};
