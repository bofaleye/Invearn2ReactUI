import { DashboardIcon } from "@/assets";
import { Breadcrumb } from "flowbite-react";
import React from "react";

export interface BreadCrumbsLinkProps {
  label: string;
  link?: string;
  isActive?: boolean;
}
export interface BreadCrumbsProps {
  links?: BreadCrumbsLinkProps[];
}

const BreadCrumbs = ({ links }: BreadCrumbsProps) => {
  return (
    <div className="mb-4">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/dashboard" icon={DashboardIcon}>
          <p>Dashboard</p>
        </Breadcrumb.Item>

        {links &&
          links.map((item, i, arr) => {
            return (
              <Breadcrumb.Item key={i} href={item.link}>
                {item.label}
              </Breadcrumb.Item>
            );
          })}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
