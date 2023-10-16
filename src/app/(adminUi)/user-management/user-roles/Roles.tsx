'use client';
// import { useFetchUserRolesQuery } from './userRolesApiSlice';
import BreadCrumbs from '@/components/AdminUi/BreadCrumbs';
import APP_ROUTES from '@/constants/appRoute';
import { UserRolesRequestModel } from '@/models/UserRole';
// import RolesTable from './RolesTable';
// import { UserRolesRequestModel } from '@/models/UserRole';
import { useEffect, useState } from 'react';
import RolesTable from './RolesTable';
import { roles } from './data';

export default function Roles() {
  const [page, setPage] = useState<number>(1);
  const [requestParams, setRequestParams] = useState<UserRolesRequestModel>({
    searchText: '',
    // query: '',
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'dateCreated',
    sortDirection: 'ascending',
  });

  useEffect(() => {
    setRequestParams({ ...requestParams, pageNumber: page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
//   const { data, isFetching, refetch } = useFetchUserRolesQuery(requestParams);
  return (
    <div className="px-4 pt-6 pb-10 ">
      <BreadCrumbs
        links={[
          {
            label: 'User Management',
            link: '#',
            isActive: true,
          },
          {
            label: 'User Roles',
            link: APP_ROUTES.user_roles,
            isActive: true,
          },
        ]}
      />
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4  w-full  font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Roles</h1>
        </div>
        <RolesTable data={roles?.items} isFetching={false} refetch={()=>{}} />
      </div>
    </div>
  );
}
