// sql语句
var sqlMap = {
    // 用户
    user: {
        addUser: 'insert into user(id, name, age) values (7, ?, ?)',
        getALL: 'select * from user'
    }
}
    
module.exports = sqlMap;