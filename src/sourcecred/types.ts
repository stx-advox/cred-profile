export interface Participant {
  active: boolean;
  identity: Identity;
  cred: number;
  credPerInterval: (number | string)[];
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
export type DBData = { expiry: number; participants: Participant[] };
