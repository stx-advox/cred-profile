// Remember to set type: module in package.json or use .mjs extension
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Adapter, Low } from "lowdb";
// @ts-ignore fucking typescript ain't nobody got time for that
import { JSONFile } from "lowdb/node";

import { DBData } from "./types";

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
export const db = new Low(adapter as Adapter<DBData>);
