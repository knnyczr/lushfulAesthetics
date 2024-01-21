import React, { createContext } from "react";

export const initialState = {
  name: "",
  email: "",
};

export const Context = createContext(initialState);
