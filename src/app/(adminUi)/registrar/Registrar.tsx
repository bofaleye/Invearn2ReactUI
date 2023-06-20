"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DashboardIcon, PlusIcon } from "@/assets";
import { Breadcrumb } from "flowbite-react";
import SuccessModal from "@/components/Modals/SuccessModal";
import CreateRegistrar from "./CreateRegistrar";
import { ReusableDrawerRef } from "@/components/ReusableDrawer";
import RegistrarsTable from "./registrarTable";
import {
  useDeleteRegistrarMutation,
  useFetchRegistrarsQuery,
} from "./registrarApiSlice";
import { IRegistrarsTableData } from "@/models/registrar";
import AppButton from "@/components/Button";
import EditRegistrar from "./EditRegistrar";
import { Modal } from "flowbite-react";
import { RiErrorWarningLine } from "react-icons/ri";

const PromptModal = (
  headingText: string,
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
            <RiErrorWarningLine color="red" size={26} />
          </p>
          <p className="font-medium text-lg mt-4">{headingText}</p>
          <p className="font-normal text-base text-[#8891A5] my-6">
            {bodyText}
          </p>
          <div className=" w-full flex justify-between mt-4">
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
};

export const Registrar: React.FC = () => {
  let createRegistrarRef = useRef<ReusableDrawerRef>(null);
  let editRegistrarRef = useRef<ReusableDrawerRef>(null);

  const { data, isError, error, isFetching, isSuccess, refetch } =
    useFetchRegistrarsQuery();

  const [deleteRegistrar, deleteResponse] = useDeleteRegistrarMutation();
  const {
    isError: isDeleteError,
    error: deleteError,
    isLoading: deleteIsLoading,
    isSuccess: deletedSuccess,
  } = deleteResponse;

  const [showIsDeleteModal, setShowIsDeleteModal] = useState(false);
  const [toggleSuccessModal, setToggleSuccessModal] = useState(false);

  const [orgRegistrarData, setOrgRegistrarData] = useState<
    IRegistrarsTableData[]
  >([]);
  const [actionRegistrar, setActionRegistrar] =
    useState<IRegistrarsTableData>();

  useEffect(() => {
    if (deletedSuccess) {
      handleDeleteModal();
      setToggleSuccessModal(!toggleSuccessModal);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedSuccess]);

  useEffect(() => {
    setOrgRegistrarData(data?.items || []);
  }, [data]);

  const handleDelete = () => {
    deleteRegistrar(actionRegistrar?.id || "");
  };

  const handleEditDrawer = (data: IRegistrarsTableData) => {
    setActionRegistrar(data);
    editRegistrarRef.current?.showDrawer();
  };

  const handleDeleteModal = (data?: IRegistrarsTableData) => {
    if (data) setActionRegistrar(data);
    setShowIsDeleteModal(!showIsDeleteModal);
  };

  const handleRegistrarRefresh = (isSuccess: boolean) => {
    if (isSuccess) {
      refetch();
    }
  };
  return (
    <div className="px-8 pt-6 pb-10">
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={DashboardIcon}>
            Application Management
          </Breadcrumb.Item>
          <Breadcrumb.Item>Registrar</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {PromptModal(
        "Are you sure you want to delete this Registrar?",
        "This Beneficiary input would be deleted",
        showIsDeleteModal,
        handleDeleteModal,
        handleDelete,
        deleteIsLoading
      )}
      {/* <SuccessModal /> */}
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">All Registars</h1>
          <AppButton
            text="Add New Registrar"
            aria-controls="create-registrar-drawer"
            isIcon={true}
            icon={<PlusIcon className="h-8 w-8" />}
            appButtonType="green-button"
            buttonClick={() => createRegistrarRef.current?.showDrawer()}
            height="default"
          />
          <CreateRegistrar
            ref={createRegistrarRef}
            OnCreateComplete={handleRegistrarRefresh}
          />
          <EditRegistrar
            ref={editRegistrarRef}
            OnEditComplete={handleRegistrarRefresh}
            registrar={actionRegistrar as IRegistrarsTableData}
          />
        </div>
        <RegistrarsTable
          data={orgRegistrarData}
          handleEdit={(data: IRegistrarsTableData) => handleEditDrawer(data)}
          handleDelete={(data: IRegistrarsTableData) => handleDeleteModal(data)}
        />
      </div>
    </div>
  );
};
