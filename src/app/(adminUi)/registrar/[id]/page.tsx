import React from "react";
import { Metadata } from "next";
import { RegistrarProfile } from "./RegistrarProfile";

export const metadata: Metadata = {
  title: "Next.js",
};

const RegistrarProfilePage = () => {
  return (
    <RegistrarProfile />
  );
};

export default RegistrarProfilePage;
