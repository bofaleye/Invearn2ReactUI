import Link from "next/link";
import React from "react";

interface SidebarItemProps {
  title: string;
  mobileTag: string;
  hash?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  url?: string;
}

const generateRandomHash = (length: number): string => {
  let output = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    output += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return output;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({ url, children, title, mobileTag, icon, hash = generateRandomHash(7) }) => {

  const isActiveRoute = (path?: string): boolean => {
    if (!path) return false;
    return true;
  }

  return children ? (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 font-medium transition duration-75 rounded-lg group hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700"
        aria-controls={`${hash}-${mobileTag}`}
        data-collapse-toggle={`${hash}-${mobileTag}`}
      >
        {icon}
        <span className="flex-1 ml-3 text-left whitespace-nowrap">
          {title}
        </span>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ul
        id={`${hash}-${mobileTag}`}
        className="hidden py-2 space-y-2">
        {children}
      </ul>
    </li>
  ) : (
    <li>
      <Link
        href={url ?? ''}
        className={[
          'flex items-center p-2 text-base text-gray-900 font-medium rounded-lg hover:bg-green-100 group dark:text-gray-200 dark:hover:bg-gray-700',
          isActiveRoute(url) ? 'is-active bg-green-100 text-green-800 dark:bg-gray-700' : ''
        ].join(' ')}
      >
        {icon}
        <span className="ml-3">{title}</span>
      </Link>
    </li>
  );
}
