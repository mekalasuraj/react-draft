export default(configService) => {

    const insertUserDetails = function insertUserDetails(req, res) {

        configService.insertUserDetails(req.body)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const getUsersignUpDetails = function getUsersignUpDetails(req, res) {
        configService.getUsersignUpDetails()
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };

    const registerUsers = function registerUsers(req, res) {

        configService.registerUsers(req.body)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const insertUserComments = function insertUserComments(req, res) {
       
        configService.insertUserComments(req.body)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const getUserComments = function getUserComments(req, res) {
        configService.getUserComments(req.params.id)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const getUserCommentById = function getUserCommentById(req, res) {
        configService.getUserCommentById(req.params.id)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const editCommentsById = function editCommentsById(req, res) {
        configService.editCommentsById(req.params.id,req.body.value)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const deleteCommentsById = function deleteCommentsById(req, res) {
        configService.deleteCommentsById(req.params.commentId)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const insertUserNotes = function insertUserNotes(req, res) {
       
        configService.insertUserNotes(req.body)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const getUserNotes = function getUserNotes(req, res) {
        configService.getUserNotes(req.params.id)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const getUserNotesById = function getUserNotesById(req, res) {
        configService.getUserNotesById(req.params.id)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const editNotesById = function editNotesById(req, res) {
        configService.editNotesById(req.params.id,req.body.value)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    const deleteNotesById = function deleteNotesById(req, res) {
        configService.deleteNotesById(req.params.notesId)
        .then(documentTypeList => {
            res.json(documentTypeList);
        });
    };
    return {
        insertUserDetails,
        getUsersignUpDetails,
        registerUsers,
        insertUserComments,
        getUserComments,
        getUserCommentById,
        editCommentsById,
        deleteCommentsById,
        insertUserNotes,
        getUserNotes,
        getUserNotesById,
        editNotesById,
        deleteNotesById
    };
};
