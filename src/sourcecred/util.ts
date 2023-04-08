import { sourcecred } from "sourcecred";
// Remember to set type: module in package.json or use .mjs extension
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Adapter, Low } from "lowdb";
// @ts-ignore
import { JSONFile } from "lowdb/node";
import { DBData, Participant } from "./types";

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter as Adapter<DBData>);

const initRemoteSC = () => {
  return sourcecred.instance.readInstance.getRawGithubReadInstance(
    process.env.GH_ORG,
    process.env.REPO,
    process.env.BRANCH
  );
};

export const readCredGrainView = async () => {
  const instance = initRemoteSC();
  await db.read();

  const data = db.data;

  let dataFresh = false;
  if (data) {
    dataFresh = data.expiry > Date.now();
  }

  if (dataFresh) {
    return;
  }

  const DAY = 24 * 60 * 60 * 1000;
  const backup: DBData = {
    expiry: new Date().getTime() + DAY,
    participants: [],
  };

  try {
    const credGrainView = await instance.readCredGrainView();
    const participants = credGrainView.participants() as Participant[];
    backup.participants = participants.filter((item) =>
      item.identity.name.includes("btc")
    );
    db.data = backup;
    await db.write();
  } catch (_e) {
    throw new Error(
      "Look brah ya machine couldn't get ya cred data from da fucking github servers"
    );
  }
};

export const getNameTotalCred = async (name: string) => {
  await readCredGrainView();
  name = btcNameToSC(name);
  const { participants } = db.data!;
  const personProfile = participants.find((id) => id.identity.name === name);

  return personProfile?.cred || 0;
};

export const scNameToBtc = (name: string) => {
  if (!name.includes("-btc")) {
    return name;
  }

  return name.replace("-btc", ".btc");
};

export const btcNameToSC = (name: string) => {
  return name.replace(".btc", "-btc");
};

export { db };
