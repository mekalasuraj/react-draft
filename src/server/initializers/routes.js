import passport from 'passport';
import multer from 'multer';

export default (router, controllers, authUtility) => {

    const upload = multer({ dest: 'uploads/'});

    /***********************************************************************************************/
    /****************************** TEACHER ROUTES *************************************************/
    /***********************************************************************************************/
    router.get('/', controllers.home.index);
    router.get('/mainPage',authUtility.ensureAuthenticated(),controllers.home.mainPageApp);
    router.get('/notesPage',authUtility.ensureAuthenticated(),controllers.home.notesPage);
};
