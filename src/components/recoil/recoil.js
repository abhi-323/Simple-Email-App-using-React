import { atom } from "recoil";

export const favouriteEmailAtom = atom({
  key: "favouriteEmail",
  default: [],
});

export const selectedFilterAtom = atom({
  key: "selectedFilter",
  default: null,
});

export const readEmailsAtom = atom({
  key: "readEmails",
  default: [],
});
