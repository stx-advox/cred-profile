export interface Participant {
  active: boolean;
  identity: Identity;
  cred: number;
}

export interface Identity {
  id: string;
  subtype: string;
  name: string;
  address: string;
  aliases: Alias[];
}

export interface Alias {
  address: string;
  description: string;
}
export type DBData = {
  expiry: number;
  participants: Participant[];
  contributions: ScoredContribution[];
};

export interface ScoredContribution {
  expression: Expression;
  id: string;
  participants: ContribParticipant[];
  plugin: string;
  timestampMs: number;
  type: string;
}

interface ContribParticipant {
  id: string;
  score: number;
  shares: Share[];
}

interface Share {
  amount: number;
  key: string;
}

interface Expression {
  description: string;
  operator: string;
  score: number;
  weightOperands: any[];
}
