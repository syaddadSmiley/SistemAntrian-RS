let MySqli = require('mysqli');
let conn = new MySqli({
    host: 'localhost',
    post: 3306,
    user: 'root',
    passwd: '',
    db: 'db_antrian'
});
let db = conn.emit(false, '');
module.exports = {
    database: db
}