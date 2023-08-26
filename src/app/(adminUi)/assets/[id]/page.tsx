"use client";

import Image from "next/image";
import moment from "moment";
import {  useParams } from "next/navigation";
import { FC} from "react";
import { useFetchAssetByIdQuery } from "../assetsApiSlice";
import { AssetData } from "@/models/bank";

interface AssetDetailsProps {}

const AssetDetails: FC<AssetDetailsProps> = () => {

  const { id } = useParams();
  const { data } = useFetchAssetByIdQuery(id);


  return (
    <main>
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">
        {/* <!-- Right Content --> */}
        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
            <div className="sm:flex xl:block sm:space-x-4 xl:space-x-0">
              {/* <Image 
                className="mb-2 w-20 h-20 rounded-lg"
                /> */}
                <Image src={(data as AssetData)?.logoUrl} alt="" width={100} height={100} className="mb-2 rounded-lg" />

              <div>
                <h2 className="text-xl font-bold dark:text-white">
                  {(data as AssetData)?.name}
                </h2>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div className="mt-1 flex flex-row space-x-2">
                      <span className="">Code: </span>
                      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {(data as AssetData)?.code}
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                    
                    <div className="mt-1 flex flex-row space-x-2">
                      <span className="">Current Price: </span>
                      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {(data as AssetData)?.currentPrice}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sm:flex xl:block xl:space-y-4">
              <div className="sm:flex-1">
                <address className="text-sm not-italic font-normal text-gray-500 dark:text-gray-400">
                  <div className="mt-4">Email address</div>
                  <a
                    className="text-sm font-medium text-gray-900 dark:text-white"
                    href={`${(data as AssetData)?.email}`}
                  >
                    {(data as AssetData)?.email}
                  </a>
                  <div className="mt-4">Company address</div>
                  <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {(data as AssetData)?.companyAddress}
                  </div>
                  <div className="mt-4">Telephone</div>
                  <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {(data as AssetData)?.telephone}
                  </div>
                  <div className="mt-4">Website</div>
                  <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {(data as AssetData)?.website}
                  </div>
                </address>
              </div>
            </div>
          </div>
          <div className="p-4 mb-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
            <div className="flow-root">
              <h3 className="text-xl font-bold dark:text-white">Registrar</h3>
              <div className="sm:flex xl:block xl:space-y-4">
                <div className="sm:flex-1">
                  <address className="text-sm not-italic font-normal text-gray-500 dark:text-gray-400">
                    <div className="mt-4 flex flex-row space-x-2">
                      <span className="">Name: </span>
                      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {(data as AssetData)?.registrar?.name}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-row space-x-2">
                      <span className="">Description: </span>
                      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {(data as AssetData)?.registrar?.description}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-row space-x-2">
                      <span className="">Platform: </span>
                      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {(data as AssetData)?.registrar?.platform}
                      </div>
                    </div>
                    
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-4 mb-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold dark:text-white">
              General information
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-lg font-medium text-gray-900 dark:text-white">
                  Description
                </dt>
                <dd className="mt-1 space-y-3 max-w-prose text-sm text-gray-500 dark:text-gray-400">
                  <p>{(data as AssetData)?.description}</p>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date of Incoparation
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {moment((data as AssetData)?.dateofIncorporation).format(
                    "DD MMM YY,  h:mm "
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date Listed
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {moment((data as AssetData)?.dateListed).format(
                    "DD MMM YY,  h:mm "
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Sector
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {(data as AssetData)?.sector}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Sub-Sector
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {(data as AssetData)?.subSector}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Board of Directors
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {(data as AssetData)?.boardOfDirectors}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Company Secretary
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {(data as AssetData)?.companySecretary}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Market Classification
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {(data as AssetData)?.marketClassification}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Nature of Business
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {(data as AssetData)?.natureofBusiness}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Auditor
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {(data as AssetData)?.auditor}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Fax
                </dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                  {(data as AssetData)?.fax}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssetDetails;
