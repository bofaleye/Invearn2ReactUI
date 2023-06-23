"use client";

import { useRouter } from 'next/router';
import { HomeIcon } from "@/assets";
import ProfileInfo from "@/components/ProfileInfo";
import DepartmentUnit from "./DepartmentUnit";
import AppTabs, { AppTabItem } from "@/components/Tab";
import { useParams } from 'next/navigation';
import { useFetchRegistrarByIdQuery } from '../registrarApiSlice';
import { useState, useRef } from 'react';
import EditRegistrar from '../EditRegistrar';
import { ReusableDrawerRef } from '@/components/ReusableDrawer';
import { IRegistrarsTableData } from '@/models/registrar';

export const RegistrarProfile: React.FC = () => {
  let editRegistrarRef = useRef<ReusableDrawerRef>(null);
  const { id: routeOrgId } = useParams();
  const { data, isError, error, isFetching, isSuccess, refetch} =
    useFetchRegistrarByIdQuery(routeOrgId);

  const [activeTab, setActiveTab] = useState("department");
  const handleEditDrawer = () => {
    editRegistrarRef.current?.showDrawer();
  };
  const handleRegistrarRefresh =(isSuccess: boolean) =>{
    if(isSuccess){
      refetch();
    }
  }
  return (
    <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
      <div className="mb-4 col-span-full xl:mb-2">
        <nav className="flex mb-5" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:hover:text-white"
              >
                <HomeIcon />
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <a
                  href="#"
                  className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:hover:text-white"
                >
                  Registar
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span
                  className="ml-1 text-gray-400 md:ml-2"
                  aria-current="page"
                >
                  Profile
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Profile
        </h1>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Tab options
          </label>
          <select
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Basic Info</option>
            <option>Department and Unit</option>
            <option>Registar Users</option>
          </select>
        </div>
      </div>
        {/* <AppTabs tabItems={[]} /> */}
      <ul className="hidden w-fit col-start-2 col-end-4 text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400 row-gap-1">
        <li className="w-146 cursor-pointer" onClick={()=>setActiveTab('info')}>
          <p
            className={`${activeTab === 'info' ? 'bg-green-500 hover:text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white' : 'bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'} inline-block rounded w-full p-4 focus:ring-4 focus:ring-blue-300 focus:outline-none `}
          >
            Basic Info
          </p>
        </li>
        <li className="w-146 cursor-pointer" onClick={()=>setActiveTab('department')}>
          <p
            className={`${activeTab === 'department' ? 'bg-green-500 hover:text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white' : 'bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'} inline-block rounded w-full p-4 focus:ring-4 focus:ring-blue-300 focus:outline-none `}
          >
            Department and Unit
          </p>
        </li>
        <li className="w-146 cursor-pointer" onClick={()=>setActiveTab('users')}>
          <p
            className={`${activeTab === 'users' ? 'bg-green-500 hover:text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white' : 'bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'} inline-block rounded w-full p-4 focus:ring-4 focus:ring-blue-300 focus:outline-none `}
          >
            Registar Users
          </p>
        </li>
      </ul>

      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="col-span-2">
        <ProfileInfo
          RegistrarName={data?.name || ""}
          EmailAddress={data?.email || ""}
          OfficeAddress={data?.address || ""}
          PhoneNumber={data?.phone || ""}
          UserType={"Registrar"}
          handleEdit={handleEditDrawer}
        />
        </div>
        <section className="col-span-4 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-screen-2xl">
            {/* <!-- Start coding here --> */}
            {activeTab === 'info' && <DepartmentUnit />}
            {activeTab === 'department' && <DepartmentUnit />}
            {activeTab === 'users' && <DepartmentUnit />}
          </div>
        </section>
      </div>
      
      <EditRegistrar ref={editRegistrarRef} OnEditComplete={handleRegistrarRefresh} registrar={data as IRegistrarsTableData} />

      {/* <!-- Delete modal --> */}
      {/* <div id="popup-modal" tabIndex={-1}
        className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="popup-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-14 text-center">

                    <svg className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none"
                        stroke="currentColor" width="33" height="32" viewBox="0 0 33 32" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.5001 29.3332C23.8334 29.3332 29.8334 23.3332 29.8334 15.9998C29.8334 8.6665 23.8334 2.6665 16.5001 2.6665C9.16675 2.6665 3.16675 8.6665 3.16675 15.9998C3.16675 23.3332 9.16675 29.3332 16.5001 29.3332Z"
                            stroke="#E24D4D" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M16.5 10.6665V17.3332" stroke="#E24D4D" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.4927 21.3335H16.5047" stroke="#E24D4D" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <h3 className="mb-3 text-lg font-semibold text-black dark:text-black">Are you sure
                        you want to delete all departments?</h3>
                    <h5 className="mb-8 text-base font-normal text-gray-400 dark:text-gray-500">This would
                        delete all Department input</h5>
                    <button data-modal-hide="popup-modal" type="button"
                        className="text-gray-500 bg-gray-200 w-2/5 items-center justify-center hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                    <button data-modal-hide="popup-modal" type="button"
                        className="text-white bg-green-600 w-2/5 items-center justify-center hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                        Yes, Proceed
                    </button>
                </div>
            </div>
        </div>
      </div> */}
    </div>
  )
}
