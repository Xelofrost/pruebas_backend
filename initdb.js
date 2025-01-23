const betterSqlite3 = require('better-sqlite3');

const db = new betterSqlite3('database.db');

const stmt = "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, ip TEXT , userAgent TEXT , Localizacion TEXT, fecha TEXT)";

db.prepare(stmt).run();

//db.close();

module.exports = db;