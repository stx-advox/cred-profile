import { Participant, ScoredContribution } from "./types";

export const loadFolksContrib = async (
  instance: any,
  participants: Participant[]
) => {
  try {
    const scoredContribRes = (await instance._zipStorage.get(
      "output/scoredContributions"
    )) as Uint8Array;

    const participantsSet = new Set<string>();

    participants.forEach((part) => {
      const discordAlias = part.identity.aliases.find(
        (item) => item.address.slice(0, 20) === "N\x00sourcecred\x00discord"
      );

      if (discordAlias) {
        participantsSet.add(discordAlias.address);
      }
    });

    const decoder = new TextDecoder();

    const scoredContrib = decoder.decode(scoredContribRes);

    let scoredContribMap = JSON.parse(scoredContrib) as ScoredContribution[];

    scoredContribMap = scoredContribMap.filter((item) => {
      return item.participants.some((part) => participantsSet.has(part.id));
    });

    scoredContribMap = scoredContribMap.map(
      ({ expression, id, participants, plugin, timestampMs, type }) => {
        return { expression, id, participants, plugin, timestampMs, type };
      }
    );

    return scoredContribMap;
  } catch (_e) {
    console.log(_e);
    throw new Error(
      "Error in `loadFolksContrib` perhaps don't too make many requests, check the above exception for details"
    );
  }
};
