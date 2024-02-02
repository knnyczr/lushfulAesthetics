import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import AcceptDataDisclosure from "./AcceptDataDisclosure";
import { Context, initialState } from "./Context";

const isBrowser = typeof window !== `undefined`;

export default function Layout({ children }) {
  const setLocalStorage = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorageOrInitialState = (key, state) => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : state;
  };

  const [user, setUser] = useState(() => {
    return isBrowser
      ? getLocalStorageOrInitialState("user", initialState)
      : initialState;
  });

  useEffect(() => {
    if (isBrowser) setLocalStorage("user", user);
  }, [user]);

  return (
    <>
      <Context.Provider
        value={{
          user: {
            name: user.name,
            email: user.email,
          },
          setUser: (user) => setUser({ ...user }),
        }}
      >
        <Nav />
        {children}
        {!user.hasSeenDataDisclosurePopover && (
          <AcceptDataDisclosure
            setUser={(hasAcceptedArg) =>
              setUser({ ...user, hasSeenDataDisclosurePopover: hasAcceptedArg })
            }
          />
        )}
        <Footer />
      </Context.Provider>
    </>
  );
}

export function Head({ children }) {
  return (
    <>
      <meta
        name="facebook-domain-verification"
        content="lih9j34woa8ztip98myvop39w9zcy6"
      />

      <meta httpEquiv="content-language" content="en-us" />
      {children}
    </>
  );
}
