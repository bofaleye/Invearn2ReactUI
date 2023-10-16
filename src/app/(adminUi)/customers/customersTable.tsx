import { useEffect, useState } from "react";
import { ITableColumn, ITableData } from "@/components/Table/model";
import { usersTableColumns } from "./data";
import { downloadCSV, getInitials } from "@/utils";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { Delete, Edit, Eye } from "@/assets";
import { Modal, Select } from "flowbite-react";
import Table from "@/components/Table";
import { IUsersTableProps,  ICustomer } from "@/models/customer";
import { RiErrorWarningLine } from "react-icons/ri";
import Button from "@/components/Button";
import { useDeleteUserMutation, useActivateDeactivateUserMutation } from "./CustomerApiSlice";
import SuccessModal from "@/components/Modals/SuccessModal";
import { toast } from "react-toastify";
import { GpToast } from '@/components/Toast';

const PromptModal = (
  bodyText: string,
  showModal: boolean,
  onClose: () => void,
  onDone: () => void,
  doneBtnBusy: boolean
) => {
  return (
    <Modal size="sm" dismissible popup show={showModal} onClose={() => onClose}>
      <Modal.Body className="h-[300px] p-4 flex  items-center justify-center">
        <div className=" flex flex-col justify-around items-center text-center">
          <p>
            <RiErrorWarningLine color="red" size={34} />
          </p>
          <p>{bodyText}</p>
          <div className=" w-full flex justify-between mt-4 mb-4">
            <Button
              appButtonType="grey-button"
              className="w-[45%]"
              onClick={onClose}
            >Cancel</Button>
            <Button
              isLoading={doneBtnBusy}
              disabled={doneBtnBusy}
              appButtonType="red-button"
              className="w-[45%]"
              onClick={onDone}
            > Yes, Delete</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const ConfirmationModal = (
  bodyText: string,
  cta: string,
  showModal: boolean,
  onClose: () => void,
  onDone: () => void,
  doneBtnBusy: boolean
) => {
  return (
    <Modal size="sm" dismissible popup show={showModal} onClose={() => onClose}>
      <Modal.Body className="h-[300px] p-4 flex  items-center justify-center">
        <div className=" flex flex-col justify-around items-center text-center">
          <p className="mt-4">
            <RiErrorWarningLine color="red" size={34} />
          </p>
          <p>{bodyText}</p>
          <div className=" w-full flex justify-between mt-4 mb-4">
            <Button appButtonType="grey-button" className="w-[45%]" onClick={onClose}>
              Cancel
            </Button>

            <Button
              isLoading={doneBtnBusy}
              disabled={doneBtnBusy}
              appButtonType="red-button"
              className="w-[45%]"
              onClick={onDone}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const CustomersTable: React.FC<IUsersTableProps> = ({
  data,
  refetch,
  // handleEdit,
}) => {
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteUser, deleteResponse] = useDeleteUserMutation();

  const [showIsDeleteModal, setShowIsDeleteModal] = useState(false);
  const [deactivateActivateUser, deactivateActiveResponse] = useActivateDeactivateUserMutation();
  const handleDeleteModal = () => {
    setShowIsDeleteModal(!showIsDeleteModal);
  };
  const [toggleSuccessModal, setToggleSuccessModal] = useState(false);
  const [showIsDeactivateModal, setShowIsDeactivateModal] = useState<boolean>(false);
  const [showIsActivateModal, setShowIsActivateModal] = useState<boolean>(false);


  const handleDeactivateModal = () => {
    setShowIsDeactivateModal(!showIsDeactivateModal);
  };
  const handleActivateModal = () => {
    setShowIsActivateModal(!showIsActivateModal);
  };

  const handleDelete = (row: any) => {
    deleteUser(row.id)
      .then((res: any) => {
        if (deleteResponse.isSuccess) {
          handleDeleteModal();
          setToggleSuccessModal(!toggleSuccessModal);
          refetch();
        }
      })
      .catch((error: any) => {
        toast.error(`An error occured, kindly try again`, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const handleDeactivateUser = (row: IUser) => {
    deactivateActivateUser({
      id: row.id,
      userId: row.id,
      isActive: !row.isActive,
    }).then((res: any) => {
      if (res.error) {
        handleDeactivateModal();
        GpToast({
          type: 'error',
          message: 'An error occured, kindly try again',
          placement: toast.POSITION.TOP_LEFT,
        });
      }
    });
  };

  useEffect(() => {
    if (deactivateActiveResponse.isSuccess) {
      handleDeactivateModal();
      const { message } = deactivateActiveResponse.data;
      GpToast({
        type: 'success',
        message: message,
        placement: toast.POSITION.TOP_LEFT,
      });
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deactivateActiveResponse]);

  useEffect(() => {
    if (deleteResponse.isSuccess) {
      handleDeleteModal();
      setToggleSuccessModal(!toggleSuccessModal);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteResponse.isSuccess]);

  useEffect(() => {
    setColumns(usersTableColumns);
  }, []);

  const [filteredTableData, setFilteredTableData] = useState(data?.items);

  useEffect(() => {
    setFilteredTableData(data?.items);
  }, [data]);

  

  useEffect(() => {
    // if(data?.items?.length > 0){
      setVisibilities(() => filteredTableData?.map((x: any) => false));
  
  }, [filteredTableData]);

  const [visibilities, setVisibilities] = useState(() =>
    filteredTableData?.map((x: any) => false)
  );

  const handleClick = (index: number) => {
    const newVisibilities = [...visibilities];
    newVisibilities.map((_thisVisibility, ind) => {
      index !== ind
        ? (newVisibilities[ind] = false)
        : (newVisibilities[index] = !newVisibilities[index]);
      return 0;
    });
    setVisibilities(newVisibilities);
  };


  const dataSource: ITableData[] =
    filteredTableData && filteredTableData.length > 0
      ? filteredTableData.map((row: any, index: number) => {
          return {
            uid: row.id,
            key: index,
            name: (
              <div className="flex items-center text-gray-900 text-base font-medium">
                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {getInitials(row.name)}
                  </span>
                </div>
                <div className="ml-2">{`${row.name}`}</div>
              </div>
            ),
            email: row.email,
            phoneNumber: row.phoneNumber,
            address: row.address,
            state: row.state,
            status: (
              <div className="flex items-center text-gray-900 font-medium">
                <div
                  className={`h-2.5 w-2.5 rounded-full mr-2 ${
                    row.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>{" "}
                {row.isActive ? "Active" : "Inactive"}
              </div>
            ),
           option: (
              <div className="">
                <div className="relative">
                  <div className="flex items-center cursor-pointer">
                    <BsThreeDots onClick={() => handleClick(index)} size={24} />
                  </div>
                  {visibilities && visibilities[index] ? (
                    <div className="absolute border border-muted rounded-md z-10 right-0 top-full px-3 w-max bg-white">
                      <Link
                        href={`/customers/${row.id}`}
                        className="flex cursor-pointer text-left py-3 border-b border-neutral-50 text-small text-gray-700 items-center gap-2"
                      >
                        <Eye />
                        View
                      </Link>
                      {/* <div
                        onClick={() => {
                          handleEdit(row);
                        }}
                        className="flex cursor-pointer text-left py-3 border-b border-neutral-50 text-small text-gray-700 items-center gap-2"
                      >
                        <Edit />
                        Edit
                      </div> */}
                      <div
                        onClick={() => handleDeleteModal()}
                        className="flex cursor-pointer text-left py-3 border-b border-neutral-50 text-small text-red-600 items-center gap-2"
                      >
                        <Delete />
                        Delete
                        {ConfirmationModal(
                          'Are you sure you want to delete this user?',
                          'Delete',
                          showIsDeleteModal,

                          () => {
                            setShowIsDeleteModal(!showIsDeleteModal);
                          },
                          () => {
                            handleDelete(row);
                          },
                          deleteResponse.isLoading
                        )}
                      </div>
                      {row.isActive ? (
                        <div
                          onClick={() => handleDeactivateModal()}
                          className="flex cursor-pointer text-left py-3 border-b border-neutral-50 text-small text-red-600 items-center gap-2"
                        >
                          Deactivate
                          {ConfirmationModal(
                            'Are you sure you want to deactivate this user?',
                            'Deactivate',
                            showIsDeactivateModal,
                            () => {
                              setShowIsDeactivateModal(!showIsDeactivateModal);
                            },
                            () => {
                              handleDeactivateUser(row);
                            },
                            deactivateActiveResponse.isLoading
                          )}
                        </div>
                      ) : (
                        <div
                          onClick={() => handleActivateModal()}
                          className="flex cursor-pointer text-left py-3 border-b border-neutral-50 text-small text-gray-700 items-center gap-2"
                        >
                          Activate
                          {ConfirmationModal(
                            'Are you sure you want to activate this user?',
                            'Activate',
                            showIsActivateModal,
                            () => {
                              setShowIsActivateModal(!showIsActivateModal);
                            },
                            () => {
                              handleDeactivateUser(row);
                            },
                            deactivateActiveResponse.isLoading
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ),
          };
        })
      : [];

  return (
    <>
      <div className="pb-4 pr-8 pl-4 flex w-full items-center justify-between sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
        <div className="w-3/4">
          <div className="hidden pb-6 border-b space-x-6 md:flex ">
            {/* <Select className="w-1/4" id="countries" required={true}>
              <option>User</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
            <Select className="w-1/4" id="countries" required={true}>
              <option>Status</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
            <Select className="w-1/4" id="countries" required={true}>
              <option>Account type</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
            <Select className="w-1/4" id="countries" required={true}>
              <option>Rating</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select> */}
          </div>
        </div>
      </div>
      <div className="pb-4 pr-8 pl-4 flex w-full items-center justify-between sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
        {/* <div className="flex items-center gap-4">
          <div className="flex items-center">
            <h2 className="text-gray-900 font-medium text-base dark:text-gray-300">
              Show by:
            </h2>
          </div>
          <div className="flex items-center pl-4">
            <input
              id="bordered-radio-1"
              type="radio"
              value="all"
              name="show-by"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              All
            </label>
          </div>
          <div className="flex items-center pl-4">
            <input
              id="bordered-radio-2"
              type="radio"
              value="status"
              name="show-by"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Status
            </label>
          </div>
          <div className="flex items-center pl-4">
            <input
              id="bordered-radio-3"
              type="radio"
              value="name"
              name="show-by"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-3"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
          </div>
        </div> */}
      </div>
      <div className="relative overflow-x-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          showPagination={true}
          showPageSize={true}
          setCurrentPage={(value: number) => setPage(value)}
          totalItems={filteredTableData?.length}
          pageSize={10}
          useEmptyTable={true}
        />
        <div className="flex justify-between items-center pt-3 sm:pt-6">
          <div className="p-3">
            {/* <button
              type="button"
              onClick={() =>
                downloadCSV(usersTableColumns, filteredTableData, "temp")
              }
              className="inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 sm:ml-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Download CSV
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomersTable;
