import multer from 'multer';

export default (router, apis,controllers ,authUtility) => {

    const upload = multer({ dest: 'uploads/'});
router.get('/api/getUserDetails', apis.configApis.getUsersignUpDetails);
router.post('/api/insertUserDetails', apis.configApis.insertUserDetails);
router.post('/api/insertUsers', apis.configApis.registerUsers);
router.post('/login', controllers.auth.login);
router.get('/logout', controllers.auth.logout);
router.post('/api/insertUsersComments', apis.configApis.insertUserComments);
router.get('/api/getUsersComments/:id', apis.configApis.getUserComments);
router.get('/api/getUsersCommentById/:id', apis.configApis.getUserCommentById);
router.post('/api/editCommentsById/:id', apis.configApis.editCommentsById);
router.post('/api/deleteCommentsById/:commentId', apis.configApis.deleteCommentsById);
router.post('/api/insertUsersNotes', apis.configApis.insertUserNotes);
router.get('/api/getUsersNotes/:id', apis.configApis.getUserNotes);
router.get('/api/getUsersNotesById/:id', apis.configApis.getUserNotesById);
router.post('/api/editNotesById/:id', apis.configApis.editNotesById);
router.post('/api/deleteNotesById/:notesId', apis.configApis.deleteNotesById);
};

