import * as React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
// import favicon from "../images/favicon.ico";

export default function Layout({ children }) {
  // const [pageTitle, setPageTitle] = useState("Home");
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

export function Head() {
  return (
    <>
      <meta
        name="facebook-domain-verification"
        content="lih9j34woa8ztip98myvop39w9zcy6"
      />
      <meta http-equiv="content-language" content="en-us" />
    </>
  );
}
