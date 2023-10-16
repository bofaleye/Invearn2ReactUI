'use client';
import AppSkeleton from '@/components/Skeleton';
import Table from '@/components/Table';
import { ITableColumn, ITableData } from '@/components/Table/model';
import { IRolesTableProps, UserRole, UserRolesRequestModel, UserRolesResponseModel } from '@/models/UserRole';
import { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { roles, rolesTableColumns } from './data';
import Link from 'next/link';
import { Delete, Edit, Eye } from '@/assets';
// import { useFetchUserRolesQuery } from './userRolesApiSlice';
import TableAction, { TableActionItem } from '@/components/Table/TableAction';
import { useRouter } from 'next/navigation';
import APP_ROUTES from '@/constants/appRoute';

const RolesTable: React.FC<IRolesTableProps> = () => {
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [selectedRole, setselectedRole] = useState<UserRole>();
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [requestParams, setRequestParams] = useState<UserRolesRequestModel>({
    searchText: '',
    // query: '',
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'dateCreated',
    sortDirection: 'ascending',
  });

  function handleViewDetails(item: any) {
    // router.push(` ${APP_ROUTES.user_roles}/${item.id}`);
  }

  useEffect(() => {
    setRequestParams({ ...requestParams, pageNumber: page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  // const { data: userRoles, isFetching, refetch } = useFetchUserRolesQuery(requestParams);
  const isFetching = false;
  const userRoles = roles;
  useEffect(() => {
    setColumns(rolesTableColumns);
  }, []);

  const [filteredTableData, setFilteredTableData] = useState<UserRolesResponseModel | any>({
    items: [],
    pageNumber: 1,
    totalPages: 1,
    totalCount: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  useEffect(() => {
    if (userRoles === null) {
      setFilteredTableData({
        items: [],
        pageNumber: 1,
        totalPages: 1,
        totalCount: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      });
    }
    if (userRoles?.items) {
      setFilteredTableData(userRoles);
    }
    console.log(filteredTableData);
  }, [userRoles]);

  const tableAction: TableActionItem[] = [
    {
      text: 'View Details',
      icon: <Eye className="mr-3" />,
      disabled: false,
      visible: true,
      action: () => {
        handleViewDetails(selectedRole);
      },
    },
    // {
    //   text: 'Edit',
    //   icon: <Edit className="mr-3" />,
    //   disabled: false,
    //   visible: true,
    //   action: () => {
    //     toggleEditDrawer();
    //   },
    // },

    // {
    //   text: 'Delete',
    //   icon: <Delete className="mr-3" />,
    //   disabled: false,
    //   visible: true,
    //   action: () => {
    //     //handleDeleteModal();
    //   },
    // },
  ];

  const dataSource: ITableData[] =
    filteredTableData?.items && filteredTableData.items.length > 0
      ? filteredTableData?.items.map((row: any, index: number) => {
         console.log(row);
          return {
            uid: row.id,
            key: index,
            name: (
              <div className="flex items-center text-gray-900 text-base font-medium">
                <div className="ml-2">{`${row.normalizedName}`}</div>
              </div>
            ),
            code: row.code,
            description: row.description,
            status: (
              <div className="flex items-center text-gray-900 font-medium">
                <div className={`h-2.5 w-2.5 rounded-full mr-2 ${row.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {row.isActive ? 'Active' : 'Inactive'}
              </div>
            ),
            option: <TableAction index={row.id} actionItems={tableAction} onDropShow={() => setselectedRole(row)} />,
          };
        })
      : [];
  return (
    <div className="relative">
      {isFetching ? (
        <AppSkeleton type="table" />
      ) : (
        <Table
          columns={columns}
          dataSource={!isFetching ? dataSource : []}
          dataLoading={isFetching}
          useSkeleton={isFetching}
          showPagination={true}
          showPageSize={true}
        />
      )}
    </div>
  );
};
export default RolesTable;
