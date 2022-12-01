const sqlite3 = require('better-sqlite3');
const args = require('yargs').argv;
const fs = require("fs");

const data = require('../src/data/facts.json');

const dbDir = `${process.cwd()}/${args.outputPath}`;
const dbPath = dbDir + 'facts.db';

fs.mkdirSync(dbDir, { recursive: true });
fs.closeSync(fs.openSync(dbPath, 'w'));

const db = new sqlite3(dbPath);

db.prepare(`CREATE TABLE facts (
    id INTEGER PRIMARY KEY,
    fact TEXT NOT_NULL
)`).run();

data.forEach((fact) => {
    db.prepare('INSERT INTO facts (fact) VALUES (?)').run(fact);
})

db.close();
