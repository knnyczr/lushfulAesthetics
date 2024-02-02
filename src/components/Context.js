import React, { createContext } from "react";

export const initialState = {
  name: "",
  email: "",
  hasSeenDataDisclosurePopover: false,
};

export const Context = createContext(initialState);
