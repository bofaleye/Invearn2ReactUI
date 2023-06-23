"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MyTextInput } from "@/components/FormElements/Inputs";
import Table from "@/components/Table";
import { DepartmentModel } from "@/models/department";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { UnitTableColumn } from "./data";
import AppButton from "@/components/Button";
import { Delete, Edit, LeftArrowIcon, PlusIcon } from "@/assets";
import ReusableDrawer, { ReusableDrawerRef } from "@/components/ReusableDrawer";
import { useCreateUnitMutation, useFetchUnitsQuery, useUpdateUnitMutation } from "./unitTypeApiSlice";
import { UnitModel } from "@/models/unit";
import SuccessModal from "@/components/Modals/SuccessModal";
import { ITableData } from "@/components/Table/model";
import TableAction, { TableActionItem } from "@/components/Table/TableAction";
import AppSkeleton from "@/components/Skeleton";

interface UnitProps {
  department: DepartmentModel | null;
  onBack: () => void;
}

const schema = Yup.object({
  unitName: Yup.string().required("Unit Name field empty"),
  unitDescription: Yup.string().required("Unit Description field empty"),
});
type FormData = Yup.InferType<typeof schema>;

const Unit: React.FC<UnitProps> = ({ department, onBack }) => {
  const { id, name } = department as DepartmentModel;
  let drawerRef = useRef<ReusableDrawerRef>(null);

  // internal states
  const [modalMessage, setModalMessage ] = useState("")
  const [toggleModal, setToggleModal] = useState(false);
  const [isEdit, setIsEditToggle] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitModel>();

  // api initializations
  const [createUnit, response] = useCreateUnitMutation();
  const { isLoading, isError, isSuccess } = response;
  const [updateUnit, updateResponse] = useUpdateUnitMutation();
  const {
    data,
    refetch,
    isFetching,
    isError: fetchError,
    isSuccess: fetchSuccess,
  } = useFetchUnitsQuery();

  // Drawer methods
  const openDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.showDrawer();
    }
  };

  const handleAddUnitDrawer = ()=>{
    setSelectedUnit(undefined);
    openDrawer();
  }

  const handleResetDrawer = () =>{
    reset()
    setIsEditToggle(false);
  }

  const tableAction: TableActionItem[] = [
    {
      text: "Edit Unit",
      icon: <Edit className="mr-3" />,
      disabled: false,
      visible: true,
      action: ()=>{setIsEditToggle(!isEdit); openDrawer()},
    },
    {
      text: "Delete Unit",
      icon: <Delete className="mr-3" />,
      disabled: true,
      visible: true,
      action: () => {},
    },
  ];

  const tableSource = useMemo(() => {
    return (
      undefined ||
      data
        ?.filter((unit: UnitModel) => unit.departmentId === department?.id)
        ?.map(
          (unitItem: UnitModel, index: number) =>
            new ITableData<UnitModel>({
              key: unitItem.id,
              sn: index,
              action: (
                <TableAction index={unitItem.id} actionItems={tableAction} onDropShow={()=>setSelectedUnit(unitItem)} />
              ),
              ...unitItem,
            })
        )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, department?.id]);
  // effects
  useEffect(() => {
    if (isSuccess || updateResponse?.isSuccess) {
      hideDrawer();
      refetch();
      setToggleModal(!toggleModal);
      setModalMessage(isSuccess? "Unit is added Successfully" : "Unit updated Successfully")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, updateResponse?.isSuccess]);

  const hideDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.hideDrawer();
    }
  };

  //Form methods
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    isEdit? updateUnit(new UnitModel(data.unitName, data.unitDescription, id, selectedUnit?.id)) :
    createUnit(new UnitModel(data.unitName, data.unitDescription, id));
  };


  return (
    <>
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg p-25 pb-24 sm:pb-28 p-4">
        <div className="flex flex-col md:flex-row items-center justify-start m-5">
          <AppButton
            isIcon={true}
            icon={<LeftArrowIcon className="w-4 mr-2" />}
            text="Back"
            appButtonType="green-outline"
            type="button"
            buttonClick={onBack}
          />
          <h5 className="mx-5 font-bold text-xl text-gray-900">{name}</h5>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 px-4 py-8 dark:border-gray-700">
          <div className="w-full flex flex-col">
            <h5 className="dark:text-white font-bold text-xl text-gray-900">
              Unit
            </h5>
            <div className="text-gray-500 font-normal text-sm">
              {"List of Department's Unit"}
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-end space-x-3">
            <AppButton
              text={"Add Unit"}
              // data-drawer-target="add-department-drawer"
              // data-drawer-show="add-department-drawer"
              aria-controls="add-unit-drawer"
              isIcon={true}
              icon={<PlusIcon className="h-4 w-4 mr-2" />}
              appButtonType="green-button"
              buttonClick={handleAddUnitDrawer}
              height="small"
            />
          </div>
        </div>
        {isFetching ? (
          <AppSkeleton type="table" />
        ) : (
          <Table
            // pageSize={5}
            emptyTableProps={{
              buttonProps: {
                "data-drawer-placement": "right",
                "aria-controls": "add-unit-drawer",
              },
              buttonMethod: handleAddUnitDrawer,
              bodyText: "new Unit",
              buttonText: "Add Unit",
            }}
            useSkeleton={false}
            // dataLoading={isFetching}
            useEmptyTable={true}
            dataSource={tableSource || []}
            columns={UnitTableColumn}
            showPagination={false}
            showPageSize={false}
            // onItemCheck={() => {}}
            // onMasterCheck={() => {}}
          />
        )}
      </div>
      {/* <UnitDrawer /> */}
      <ReusableDrawer
      drawerTitle={isEdit?"Edit Unit":"Add Unit"}
      drawerId="unit-drawer"
      placement="right"
      subTitle=""
      ref={drawerRef}
      onDrawerHide={handleResetDrawer}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyTextInput
          defaultValue={selectedUnit?.name}
          label="Unit Name"
          type="text"
          register={register}
          name="unitName"
          errors={formError}
        />
        <MyTextInput
          defaultValue={selectedUnit?.description}
          label="Unit Description"
          name="unitDescription"
          type="text"
          register={register}
          errors={formError}
        />

        <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
          <AppButton
            aria-controls="add-department-drawer"
            // data-drawer-hide="add-department-drawer"
            text="Cancel"
            buttonClick={hideDrawer}
            type="button"
            appButtonType="green-outline"
          />
          <AppButton
            appButtonType="green-button"
            isLoading={isLoading || updateResponse?.isLoading}
            disabled={isLoading || updateResponse?.isLoading}
            id="add-unit-button"
            type="submit"
            buttonClick={() => {}}
            text={isEdit?"Edit Unit":"Add Unit"}
          />
        </div>
      </form>
    </ReusableDrawer>

      {toggleModal && (
        <SuccessModal
          onDoneClicked={() => {setToggleModal(!toggleModal); setModalMessage("")}}
          message={modalMessage}
        />
      )}
    </>
  );
};

export default Unit;
