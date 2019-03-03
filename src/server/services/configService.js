export default(configRepository,secureUtility,responseUtility) => {

    const registerUsers = function registerUsers(userObj){
        userObj.saltValue = secureUtility.getSaltValue();
        userObj.password = secureUtility.getHashPassword(userObj.password, userObj.saltValue);
        userObj.createdDate = new Date();
        return configRepository.registerUsers(userObj);
    };

    const insertUserDetails = function insertUserDetails(userObj) {
        return configRepository.insertUserDetails(userObj);
    };

    const getTeacherDocumentTypes = function getTeacherDocumentTypes() {
        let documentTypesArr = [];
        return configRepository.getTeacherDocumentTypes()
        .then(documentTypeList => {
            documentTypeList.map(docItem => {
                docItem.isUploaded = false;
                documentTypesArr.push(docItem);
            });

            return documentTypesArr;
        });
    };

    const getTimeZones = function getTimeZones() {
        return [
            {
                id: 1,
                value: "EST"
            },
            {
                id:2,
                value: "CST"
            },
            {
                id: 3,
                value: "MST"
            },
            {
                id: 4,
                value: "PST"
            }
        ];
    };
    const getUsersignUpDetails = function getUsersignUpDetails() {
        return configRepository.getUsersignUpDetails();
    };
    const getByEmail = function getByEmail(email,password) {
        return configRepository.getByEmail(email)
        .then(userList => {
            if(userList && userList.length > 0){
                const user = userList[0];
                const generatedHashPassword = secureUtility.getHashPassword(password, user.salt_value);
                if(generatedHashPassword === user.password) {
                    user.password = null; 
                    user.salt_value = null;
                    return responseUtility.getSuccessResponse(user);
                } else {
                    return responseUtility.getInvalidResponse('invalid credentials');
                }
            }
            else {
                return responseUtility.getInvalidResponse('invalid credentials');
            }
        });

    };
    const insertUserComments = function insertUserComments(userObj){
        return configRepository.insertUserComments(userObj)
        .then(response=>{
            return responseUtility.getSuccessResponse(response);
        });
    };
    const getUserComments = function getUserComments(id){
        return configRepository.getUserComments(id);
        // .then(response=>{
        //     return responseUtility.getSuccessResponse(response);
        // })
    };
    const getUserCommentById = function getUserCommentById(id){
        return configRepository.getUserCommentById(id);
    };
    const editCommentsById = function editCommentsById(id,value){
        return configRepository.editCommentsById(id,value)
        .then((response) => {
            return responseUtility.getSuccessResponse(response);
        });
    };
    const deleteCommentsById = function deleteCommentsById(id){
        return configRepository.deleteCommentsById(id)
        .then((response) => {
            return responseUtility.getSuccessResponse(response);
        });
    };
    const insertUserNotes = function insertUserNotes(userObj){
        return configRepository.insertUserNotes(userObj)
        .then(response=>{
            return responseUtility.getSuccessResponse(response);
        });
    };
    const getUserNotes = function getUserNotes(id){
        return configRepository.getUserNotes(id);
    };
    const getUserNotesById = function getUserNotesById(id){
        return configRepository.getUserNotesById(id);
    };
    const editNotesById = function editNotesById(id,value){
        return configRepository.editNotesById(id,value)
        .then((response) => {
            return responseUtility.getSuccessResponse(response);
        });
    };
    const deleteNotesById = function deleteNotesById(id){
        return configRepository.deleteNotesById(id)
        .then((response) => {
            return responseUtility.getSuccessResponse(response);
        });
    };
    return {
        registerUsers,
        insertUserDetails,
        getTeacherDocumentTypes,
        getTimeZones,
        getUsersignUpDetails,
        getByEmail,
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
