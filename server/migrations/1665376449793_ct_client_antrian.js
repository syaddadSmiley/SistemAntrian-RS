query = `CREATE TABLE IF NOT EXISTS client_antrian (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        client INT(11) NOT NULL
    );
    `
    
module.exports = {
    "up": query,
    "down": ""
}