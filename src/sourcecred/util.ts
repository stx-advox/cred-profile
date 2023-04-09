import { sourcecred } from "sourcecred";

import { db } from "./db";

export const initRemoteSC = () => {
  return sourcecred.instance.readInstance.getRawGithubReadInstance(
    process.env.GH_ORG,
    process.env.REPO,
    process.env.BRANCH
  );
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

export const getNameTotalCred = async (name: string) => {
  name = btcNameToSC(name);
  if (!db.data) {
    await db.read();
  }

  const { participants } = db.data!;
  const personProfile = participants.find((id) => id.identity.name === name);

  return personProfile?.cred || 0;
};
