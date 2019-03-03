export default(dbPromise) => {

    const registerUsers = function(userInfo){
        return dbPromise.one('insert into users (first_name,last_name,email,password,salt_value,created_date)' + 'values(${firstName}, ${lastName},${email}, ${password},${saltValue}, ${created_date}) RETURNING id',{firstName:userInfo.firstName,lastName:userInfo.lastName,email:userInfo.userName,password:userInfo.password,saltValue:userInfo.saltValue,created_date:userInfo.createdDate});
    };
    const insertUserDetails = function(userInfo){
        const paramsObj = {
            userName: userInfo.userName,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName
        };
        // const sqlText = 'insert into usersignup(username,firstname, lastname) ' +
        // ' VALUES (${userName}, ${firstName}, ${firstName}) RETURNING id';
        //  return dbPromise.one(sqlText, paramsObj);
        return dbPromise.one('insert into usersignup (username,firstname,lastname)' + 'values(${userName}, ${firstName}, ${lastName}) RETURNING id',{userName:userInfo.userName,firstName:userInfo.firstName,lastName:userInfo.lastName});
    };
    const getUsersignUpDetails = function getUsersignUpDetails() {
        return dbPromise.any('select * from usersignup');
    };
    const getByEmail = function getByEmail(email) {
        return dbPromise.any(`select id,email,password,salt_value from users where email=$[email]`,{email});
    };
    const insertUserComments = function insertUserComments(userObj){
        return dbPromise.any('insert into user_comments (comment,user_id)'+'Values(${comments},${userId})',{comments:userObj.comments,userId:userObj.userId});
    };
    const getUserComments = function getUserComments(id){
        
        return dbPromise.any(`select * from user_comments where user_id=${id}`);
    };
    const getUserCommentById = function getUserCommentById(id){
        
        return dbPromise.any(`select * from user_comments where id=${id}`);
    };
    const editCommentsById = function editCommentsById(id,value){
        
        return dbPromise.none('update user_comments set comment=${value} where id=${id}',{id:id,value:value});
    };
    const deleteCommentsById = function deleteCommentsById(id){    
    return dbPromise.none(`delete from user_comments where id=${id}`);
    };
    const insertUserNotes = function insertUserNotes(userObj){
       
        return dbPromise.any('insert into user_notes (notes,user_id)'+'Values(${notes},${userId})',{notes:userObj.notes,userId:userObj.userId});
    };
    const getUserNotes = function getUserNotes(id){
        
        return dbPromise.any(`select * from user_notes where user_id=${id}`);
    };
    const getUserNotesById = function getUserNotesById(id){
        return dbPromise.any(`select * from user_notes where id=${id}`);
    };
    const editNotesById = function editNotesById(id,value){
        
        return dbPromise.none('update user_notes set notes=${value} where id=${id}',{id:id,value:value});
    };
    const deleteNotesById = function deleteNotesById(id){   
        return dbPromise.none(`delete from user_notes where id=${id}`);
        };
    return {
        registerUsers,
        insertUserDetails,
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
