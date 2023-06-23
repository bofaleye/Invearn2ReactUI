"use client";

import { Drawer, DrawerOptions } from "flowbite";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import RequestDemoModal from "../Modals/RequestDemoModal";
import { RequestDemoFormState } from "@/app/forgot-password/securities/RequestDemoForm/schema";

export interface HomeNavBarRef {
  showDrawer: () => void;
}

const HomeNavBar: React.ForwardRefRenderFunction<HomeNavBarRef, any> = (
  props,
  ref
) => {
  // Refs
  const drawerRef = React.createRef<HTMLDivElement>();

  // Variables
  let drawer: Drawer | null = null;

  // State
  const [loading, setLoading] = React.useState<boolean>(false);

  // Effects
  React.useEffect(() => {
    if (drawerRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      drawer = new Drawer(drawerRef.current);
    }

    return () => {
      drawer?.hide();
    };
  }, [drawerRef]);

  // Hadlers
  const showDrawer = () => drawer?.show();

  const handleFormSubmit = (state: RequestDemoFormState) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(JSON.stringify(state));
    }, 1500);
  };

  // MenuItems
  type HomeMenuItem = {
    text: string;
    href: string;
  };
  const menuItems: HomeMenuItem[] = [
    { text: "About us", href: "" },
    { text: "How it works", href: "" },
    { text: "Partnership", href: "" },
    { text: "Pricing", href: "" },
    { text: "Contact", href: "" },
  ];

  // Elements

  // Mobile drawer
  const mobileDrawer = (
    <div
      ref={drawerRef}
      className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64 dark:bg-gray-800"
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <div className="flex flex-col px-3 space-y-6">
        <div>
          <Link href="/">
            <Image
              src="/Greenpole-Logo 1.svg"
              width={131}
              height={45}
              alt="Greenpole Logo"
            />
          </Link>
        </div>
        {menuItems.map((item, i) => (
          <Link
            key={`${i}hmn`}
            href={item.href}
            className="text-gray-900 hover:text-brand-200 font-medium"
          >
            {item.text}
          </Link>
        ))}
        <Link
          href="/request-demo"
          // onClick={handleRequestDemoClick}
          
          className="px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none bg-brand-200"
        >
          Request for a Demo
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <RequestDemoModal isLoading={loading} onFormSubmit={handleFormSubmit} />
      {mobileDrawer}
      <nav className="sticky top-0 w-full bg-white flex items-center py-4 z-10">
        {/** Logo area */}
        <div className="sm:pl-12 pl-8">
          <Link href="/">
            <Image
              src="/Greenpole-Logo 1.svg"
              width={131}
              height={45}
              alt="Greenpole Logo"
            />
          </Link>
        </div>

        {/** Responsive Spacer */}
        <div className="flex-1 lg:hidden"></div>

        {/** Menu Items */}
        <div className="flex-1 pl-10  space-x-6 lg:inline-flex hidden">
          {menuItems.map((item, i) => (
            <Link
              key={`${i}hmn`}
              href={item.href}
              className="text-gray-900 hover:text-brand-200 font-medium"
            >
              {item.text}
            </Link>
          ))}
        </div>

        {/** Actions */}
        <div className="justify-self-end pr-8 inline-flex items-center">
          <Link
            href="/request-demo"
            className="px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none bg-brand-200 lg:inline-block hidden"
          >
            Request for a Demo
          </Link>
          <Link
            href="/login"
            className="ml-5 px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none bg-black lg:inline-block hidden"
          >
            Login
          </Link>
          <button type="button" className="lg:hidden" onClick={showDrawer}>
            <RxHamburgerMenu className="text-gray-900" size={25} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default HomeNavBar;
