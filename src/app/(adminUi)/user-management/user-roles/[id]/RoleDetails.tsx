'use client';
import { useParams } from 'next/navigation';
import { useAddPermissionToRoleMutation, useFetchRoleByIdQuery, useRemovePermissionFromROleMutation } from '../userRolesApiSlice';
import BreadCrumbs from '@/components/AdminUi/BreadCrumbs';
import { Badge, Dropdown, Modal } from 'flowbite-react';
import Button from '@/components/Button';
import { useEffect, useRef, useState } from 'react';
// import { useFetchPermissionsQuery } from '../permissionsApiSlice';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { IPermission } from '@/models/Permission';
import { MySelect } from '@/components/FormElements/Inputs';
import { GpToast } from '@/components/Toast';
import { toast } from 'react-toastify';
import AppSkeleton from '@/components/Skeleton';
import Table from '@/components/Table';
import { ITableColumn, ITableData } from '@/components/Table/model';
import { permissionsTableColumn } from '../data';
import { Delete } from '@/assets';
import { ConfirmationModal } from '../../users/usersTable';
import { displayErrorToast } from '@/utils';

interface AddpermissionRef {
  showAddpermissionModal: () => void;
}

export default function RoleDetails() {
  let addPermissionRef = useRef<AddpermissionRef>(null);
  const { id: routeRoleId } = useParams();
  const { data: Role, refetch } = useFetchRoleByIdQuery(routeRoleId);
  const { data: Permissions, isFetching } = useFetchPermissionsQuery();
  const [addPermissionToRole, addPermissionResponse] = useAddPermissionToRoleMutation();
  const [removePermissionFromRole, removePermissionResponse] = useRemovePermissionFromROleMutation();
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [openAddPermissionModal, setAddOpenModal] = useState<boolean>(false);
  const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
  const [permissionOptions, setPermissionOptions] = useState<object[]>([]);

  const {
    register: registerAddPermissions,
    handleSubmit: handleAddPermissionsSubmit,
    reset: resetAddPermissions,
    formState: { errors: addPermissionErrors },
  } = useForm<FormData>({
    resolver: yupResolver(
      Yup.object({
        permission: Yup.string().required(),
      })
    ),
  });

  const onAddPermissionSUbmit = (data: any) => {
    const permissions = [];
    permissions.push(data.permission);
    const newPermissions = {
      roleId: routeRoleId,
      permissionIds: permissions,
    };
    addPermissionToRole(newPermissions).then((res: any) => {
      if (addPermissionResponse.isError) {
        displayErrorToast(res.error?.data.errors);
      }
      if (res.error.originalStatus === 500) {
        displayErrorToast({ error: 'Server Error, Try again later' });
      }
    });
  };
  const handleRemovePermission = (id: string) => {
    const permissions = [];
    permissions.push(id);
    const newPermissions = {
      roleId: routeRoleId,
      permissionIds: permissions,
    };
    removePermissionFromRole(newPermissions).then((res: any) => {
      if (removePermissionResponse.isError) {
        displayErrorToast(res.error.data.errors);
      }
      if (res.error.originalStatus === 500) {
        displayErrorToast({ error: 'Server Error, Try again later' });
      }
    });
  };
  useEffect(() => {
    setColumns(permissionsTableColumn);
  }, []);
  useEffect(() => {
    if (addPermissionResponse.isSuccess) {
      GpToast({
        type: 'success',
        message: 'Permission added successfully',
        placement: toast.POSITION.TOP_RIGHT,
      });

      resetAddPermissions();
      refetch();
      setAddOpenModal(!openAddPermissionModal);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addPermissionResponse]);
  useEffect(() => {
    if (removePermissionResponse.isSuccess) {
      GpToast({
        type: 'success',
        message: 'Permission removed successfully',
        placement: toast.POSITION.TOP_RIGHT,
      });
      refetch();
      setOpenRemoveModal(!openRemoveModal);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removePermissionResponse]);
  useEffect(() => {
    let permissionOptions: object[] = [];
    if (Permissions) {
      Permissions.map((item: IPermission) =>
        permissionOptions.push({
          name: item.code,
          value: item.id,
        })
      );
    }
    setPermissionOptions(permissionOptions);
  }, [Permissions]);

  const dataSource: ITableData[] =
    Role?.permissions && Role?.permissions.length > 0
      ? Role?.permissions.map((row: any, index: number) => {
          return {
            uid: row.id,
            key: index,
            name: (
              <div className="flex items-center text-gray-900 text-base font-medium">
                <div className="ml-2">{`${row.name}`}</div>
              </div>
            ),
            module: row.module,
            // group: row.group,
            description: row.description,
            action: (
              <>
                <div
                  onClick={() => setOpenRemoveModal(!openRemoveModal)}
                  className="flex items-center cursor-pointer text-gray-900 text-base font-medium"
                >
                  <Delete />
                </div>
                {ConfirmationModal(
                  'Are you sure you want to remove permission?',
                  'Remove',
                  openRemoveModal,
                  () => {
                    setOpenRemoveModal(!openRemoveModal);
                  },
                  () => {
                    handleRemovePermission(row.id);
                  },
                  removePermissionResponse.isLoading
                )}
              </>
            ),
          };
        })
      : [];
  return (
    <div className="px-4 pt-6 pb-10 ">
      <BreadCrumbs
        links={[
          {
            label: 'App Management',
            link: '/application-management',
            isActive: true,
          },
          {
            label: 'User Roles',
            link: '/application-management/user-roles',
            isActive: true,
          },
          {
            label: 'Role',
            link: `/application-management/user-roles/${routeRoleId}`,
            isActive: true,
          },
        ]}
      />
      {isFetching ? (
        <AppSkeleton type={'card'} />
      ) : (
        <div className="w-[90%] h-[75vh] flex flex-col  items-center  p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-4 dark:bg-gray-800">
          <div className="w-[95%]  grid grid-cols-2 grid-rows-auto gap-y-2.5">
            <div className="max-h-[100px]">
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</h3>
              <b>{Role?.name}</b>
            </div>
            <div className="max-h-[100px]">
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</h3>
              <b>{Role?.description}</b>
            </div>
            <div className="max-h-[100px]">
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</h3>
              <b>{Role?.isActive ? 'Active' : 'Inactive'}</b>
            </div>
          </div>
          <div className="w-[95%] mt-[30px] overflow-y-auto no-scrollbar">
            <div className=" flex justify-between mb-2">
              <div>Permissions</div>
              <div className="flex justify-end gap-4 w-[50%]">
                <Button appButtonType="green-button" onClick={() => setAddOpenModal(!openAddPermissionModal)} className="w-[30%]">
                  Add Permission
                </Button>
              </div>
              <Modal
                position="center"
                dismissible
                size="md"
                show={openAddPermissionModal}
                onClose={() => {
                  resetAddPermissions();
                  setAddOpenModal(!openAddPermissionModal);
                }}
              >
                <Modal.Body className="rounded-md">
                  <form key={1} onSubmit={handleAddPermissionsSubmit(onAddPermissionSUbmit)} className="px-4">
                    <MySelect
                      label="Add Permission"
                      register={registerAddPermissions}
                      errors={addPermissionErrors}
                      name="permission"
                      options={permissionOptions}
                    />
                    <div className=" flex gap-4">
                      <Button
                        appButtonType="green-button"
                        onClick={undefined}
                        className="w-[35%]"
                        type="submit"
                        isLoading={addPermissionResponse.isLoading}
                      >
                        Add
                      </Button>
                      <Button
                        appButtonType="red-button"
                        onClick={() => {
                          resetAddPermissions();
                          setAddOpenModal(!openAddPermissionModal);
                        }}
                        className="w-[35%]"
                        type="button"
                      >
                        Close
                      </Button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
            {isFetching ? (
              <AppSkeleton type="table" />
            ) : (
              <Table
                emptyTableProps={{
                  buttonProps: {
                    'data-drawer-placement': 'right',
                    'aria-controls': 'add-permission',
                  },
                  buttonMethod: () => addPermissionRef.current?.showAddpermissionModal(),
                  bodyText: 'Permission',
                  buttonText: 'Add Permission',
                }}
                columns={columns}
                dataSource={dataSource}
                useEmptyTable={true}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
