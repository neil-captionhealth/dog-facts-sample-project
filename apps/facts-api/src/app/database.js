import * as sqlite3 from 'better-sqlite3';
import * as path from 'path'

export const db = new sqlite3(path.resolve(__dirname)+'/data/facts.db');
