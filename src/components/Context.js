import { createContext } from "react";

export const initialState = {
  name: { first: "", last: "" },
  email: "",
  hasSeenDataDisclosurePopover: false,
  hasCheckedOrCreatedMailChimpForUser: false,
};

export const Context = createContext(initialState);
