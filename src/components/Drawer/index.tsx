"use client";

import React from "react";
import { Drawer as ADrawer } from "antd";

interface DrawerProps {
  title: string;
  placement: "right" | "left";
  closable: boolean;
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  title,
  closable,
  onClose,
  isOpen,
  placement = "right",
}) => {
  return (
    <ADrawer
      title={title}
      closable={closable}
      onClose={onClose}
      open={isOpen}
      placement={placement}
    >
      {children}
    </ADrawer>
  );
};
export default Drawer;
