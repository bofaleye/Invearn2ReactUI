"use client";

import { useParams } from "next/navigation";
import AppButton from "@/components/Button";
import Table from "@/components/Table";
import { DepartmentTableColumn } from "./data";
import { ITableData } from "@/components/Table/model";
import { DepartmentModel } from "@/models/department";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Delete, Edit, Eye, PlusIcon } from "@/assets";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";
import {
  useDeleteDepartmentMutation,
  useFetchDepartmentsQuery,
} from "./departmentTypeApiSlice";
import AppSkeleton from "@/components/Skeleton";
import { Modal } from "flowbite-react";
import { RiErrorWarningLine } from "react-icons/ri";
import SuccessModal from "@/components/Modals/SuccessModal";
import { ReusableDrawerRef } from "@/components/ReusableDrawer";
import TableAction, { TableActionItem } from "@/components/Table/TableAction";


const PromptModal=(
  bodyText: string,
  showModal: boolean,
  onClose: () => void,
  onDone: () => void,
  doneBtnBusy: boolean
) =>{
  
  return (
    <Modal size="sm" dismissible popup show={showModal} onClose={() => onClose}>
      <Modal.Body className="h-[300px] p-4 flex  items-center justify-center">
        <div className=" flex flex-col justify-around items-center text-center">
          <p>
            <RiErrorWarningLine color="red" />
          </p>
          <p>{bodyText}</p>
          <div className=" w-full flex justify-between mt-4 mb-4">
            <AppButton
              text="Cancel"
              appButtonType="grey-button"
              buttonWidth="w-[45%]"
              buttonClick={onClose}
            />

            <AppButton
              isLoading={doneBtnBusy}
              disabled={doneBtnBusy}
              text="Yes, Delete"
              appButtonType="red-button"
              buttonWidth="w-[45%]"
              buttonClick={onDone}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

interface DepartmentProps {
 toggleView: (dept?: DepartmentModel) =>void ;
}

const Department: React.FC<DepartmentProps> = ({toggleView}) => {
  let addDeptRef = useRef<ReusableDrawerRef>(null);
  let editDeptRef = useRef<ReusableDrawerRef>(null);

  const { id: routeOrgId } = useParams();
  const { data, isError, error, isFetching, isSuccess, refetch} =
    useFetchDepartmentsQuery();
  
    const [deleteDepartment,  deleteResponse] = useDeleteDepartmentMutation();
    const { isError: isDeleteError, error: deleteError, isLoading: deleteIsLoading, isSuccess: deletedSuccess} = deleteResponse;

  const [showIsDeleteModal, setShowIsDeleteModal] = useState(false);
  const [toggleSuccessModal, setToggleSuccessModal] = useState(false);

  const [orgDepartmentData, setOrgDepartmentData] = useState<DepartmentModel[]>(
    []
  );
  const [actionDept, setActionDept] = useState<DepartmentModel>();
  const [visibilities, setVisibilities] = useState<boolean[]>([]);

  useEffect(()=>{ 
  if(deletedSuccess){
    handleDeleteModal();
    setActionDept({} as DepartmentModel);
    setToggleSuccessModal(!toggleSuccessModal)
    refetch();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[deletedSuccess])

  useEffect(() => {
    let _orgDepartmentData = data?.filter(
      (x: DepartmentModel) => x.organisationId === routeOrgId
    );
    setOrgDepartmentData(_orgDepartmentData || []);
  }, [data, routeOrgId, actionDept]);

  useEffect(() => {
    let _visibilities = orgDepartmentData?.map((x: any) => false);
    setVisibilities(_visibilities || []);
  }, [orgDepartmentData]);

  

  const handleDelete =() =>{
    deleteDepartment(actionDept?.id || '');
  }

  const handleDeleteModal = () => {
    setShowIsDeleteModal(!showIsDeleteModal);
  };

  const handleDepartmentRefresh =(isSuccess: boolean) =>{
    if(isSuccess){
      setActionDept({} as DepartmentModel);
      refetch();
    }
  }
  const tableAction : TableActionItem[] = [
    {
      text: 'View Department',
      icon : <Eye className="mr-3" />,
      disabled: false,
      visible: true,
      action: ()=>toggleView(actionDept),
    },
    {
      text: 'Edit Department',
      icon : <Edit className="mr-3" />,
      disabled: false,
      visible: true,
      action: ()=>editDeptRef.current?.showDrawer(),
    },
    {
      text: 'Delete',
      icon : <Delete className="mr-3" />,
      disabled: false,
      visible: true,
      action: handleDeleteModal,
    }
  ]

  let tableSource = useMemo(() => {
    return (
      undefined ||
      orgDepartmentData?.map(
        (dept, index) =>
          new ITableData<DepartmentModel>({
            key: dept.id,
            sn: index,
            action: ( <TableAction
                          index={dept.id}
                          actionItems={tableAction}
                          onDropShow={()=>setActionDept(dept)}
              />),
            ...dept,
          })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgDepartmentData, visibilities]);

  return (
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden pb-24 sm:pb-28 xl:pb-32">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 px-4 py-8 dark:border-gray-700">
        <div className="w-full flex flex-col">
          <h5 className="dark:text-white font-bold text-xl text-gray-900">
            Department
          </h5>
          <div className="text-gray-500 font-normal text-sm">
            List of registered Department
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-end space-x-3">
          <AppButton
            text="Add Department"
            // data-drawer-target="add-department-drawer"
            // data-drawer-show="add-department-drawer"
            aria-controls="add-department-drawer"
            isIcon={true}
            icon={<PlusIcon className="h-4 w-4 mr-2" />}
            appButtonType="green-button"
            buttonClick={()=>addDeptRef.current?.showDrawer()}
            height="small"
          />
        </div>
      </div>
      {/* {selectedData?.length >= 1 && (
        <div className="w-full flex items-center justify-between p-3 bg-white rounded-lg mb-2 flex-wrap gap-4 px-4">
          <div className="flex gap-2 items-center justify-between">
            <p className="font-semibold">{selectedData.length} Selected</p>
            <AppButton
              appButtonType="green-outline"
              text="Select All"
              buttonClick={() => {}}
            />
          </div>

          <div className="flex gap-1 items-center justify-between">
            <AppButton
              appButtonType="light-green"
              buttonClick={() => {}}
              text="Save"
            />
            <AppButton
              appButtonType="red-outline"
              text="Delete Selection"
              buttonClick={() => {}}
            />
          </div>
        </div>
      )} */}
      {PromptModal(
        "Are you sure you want to delete this department?",
        showIsDeleteModal,
        handleDeleteModal,
        handleDelete,
        deleteIsLoading
      )}
      {toggleSuccessModal && <SuccessModal onDoneClicked={()=>setToggleSuccessModal(!toggleSuccessModal)} message="Department is deleted 
                     Successfully" />}
      <div className="px-4">
        {isFetching ?
          <AppSkeleton type="table" />:
          <Table
            // pageSize={5}
            emptyTableProps={{
              buttonProps:{
                "data-drawer-placement": "right",
                "aria-controls": "add-department-drawer",
              },
              buttonMethod: ()=>addDeptRef.current?.showDrawer(),
              bodyText:"new Department",
              buttonText:"Add Department"
            }}
            useSkeleton={false}
            dataLoading={isFetching}
            useEmptyTable={true}
            dataSource={tableSource}
            columns={DepartmentTableColumn}
            showPagination={false}
            showPageSize={false}
            // onItemCheck={() => {}}
            // onMasterCheck={() => {}}
          />
         } 
        <AddDepartment ref={addDeptRef} OnAddComplete={handleDepartmentRefresh} organisationId={routeOrgId} />
        <EditDepartment ref={editDeptRef} onEditDone={handleDepartmentRefresh} department={actionDept as DepartmentModel} />
      </div>
    </div>
  );
};
export default Department;
