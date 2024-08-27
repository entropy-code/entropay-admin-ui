import React from "react";
import { Layout } from "react-admin";
import { CustomMenu } from "./CustomMenu";

export const CustomLayout: React.FC = ({ ...props }) => {
  //@ts-ignore
  return <Layout {...props} menu={CustomMenu} />;
};
