import { DashboardIcon, PagerRight } from "@/assets";

interface BreadCrumbProps {
  mainlocation: string;
  sublocation: string;
}
export const BreadCrumb = ({ mainlocation, sublocation }: BreadCrumbProps) => (
  <div className="mb-4">
    <nav className="flex mb-5" aria-label="Breadcrumb">
      <ol className="text-sm inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <DashboardIcon className="w-5 h-5" />
            {mainlocation}
          </a>
        </li>
        <li>
          <div className="flex items-center ">
            <PagerRight className="w-5 h-5 text-gray-500" />
            {sublocation}
          </div>
        </li>
      </ol>
    </nav>
  </div>
);
