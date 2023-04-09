import { db } from "./db";
import { loadFolksContrib } from "./loadFolksContribs";
import { loadFolksCredScore } from "./loadFolksCredScore";
import { DBData } from "./types";
import { initRemoteSC } from "./util";

export const loadSCData = async () => {
  const instance = initRemoteSC();

  const data = db.data;

  let dataFresh = false;
  if (data) {
    dataFresh = data.expiry > Date.now();
  }

  if (dataFresh && data) {
    return data;
  }

  const DAY = 24 * 60 * 60 * 1000;

  const participants = await loadFolksCredScore(instance);
  const contributions = await loadFolksContrib(instance, participants);

  const backup: DBData = {
    expiry: new Date().getTime() + DAY,
    participants,
    contributions,
  };
  db.data = backup;
  await db.write();

  return backup;
};
