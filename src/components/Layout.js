import React from "react";
import { Header } from "./Header";

export const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);
