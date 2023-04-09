import { Participant } from "./types";

export const loadFolksCredScore = async (instance: any) => {
  try {
    const credGrainView = await instance.readCredGrainView();
    let participants = credGrainView.participants() as Participant[];
    participants = participants
      .filter((item) => item.identity.name.endsWith("btc"))
      .map(({ active, cred, identity }) => ({ active, cred, identity }));
    return participants;
  } catch (_e) {
    console.log(_e);
    throw new Error(
      "Error in `loadFolksCredScore` perhaps don't too make many requests, check the above exception for details"
    );
  }
};
