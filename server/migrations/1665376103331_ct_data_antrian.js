query = `CREATE TABLE IF NOT EXISTS data_antrian (
    id_da INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id INT(11) NOT NULL,
    counter INT(11) NOT NULL,
    counter_kasir INT(11) NOT NULL,
    waktu DATETIME NOT NULL,
    status INT(11) NOT NULL,
    status_kasir INT(11) NOT NULL,
    waktu_panggil DATETIME NOT NULL,
    existence enum('0','1','2','3') NOT NULL DEFAULT '0'
    );
    `

queryInsert = `INSERT INTO data_antrian (id_da, id, counter, counter_kasir, waktu, status, status_kasir, waktu_panggil, existence) VALUES
(2, 1, 1, 0, '2022-11-08 14:53:21', 0, 0, '2022-09-12 08:17:07', '2'),
(3, 2, 1, 0, '2022-11-08 14:53:23', 0, 0, '2022-09-12 08:23:19', '2'),
(4, 3, 1, 0, '2022-11-08 14:53:25', 0, 0, '2022-09-12 08:26:11', '2'),
(5, 4, 1, 0, '2022-11-08 14:54:53', 0, 0, '2022-09-12 08:28:24', '2'),
(6, 5, 1, 0, '2022-11-028 14:55:23', 0, 0, '2022-09-12 08:31:21', '2');`
    
module.exports = {
    "up": query,
    "down": queryInsert,
    "custom": queryInsert
}