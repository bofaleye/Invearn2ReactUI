import ProfileInfo from "@/components/ProfileInfo";
import React, { Component, useEffect, useRef, useState } from "react";
import { ICustomer } from "@/models/customer";
import { ReusableDrawerRef } from "@/components/ReusableDrawer";
import EditUser from "./EditCustomerProfile";
import { Badge, Modal } from "flowbite-react";
import Button from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { UserRole } from "@/models/UserRole";
import { MySelect } from "@/components/FormElements/Inputs";
import { toast } from "react-toastify";
import SuccessModal from "@/components/Modals/SuccessModal";
import { useSuspendUnSuspendMutation } from "../CustomerApiSlice";
import { GpToast } from "@/components/Toast";
import { LockIcon, UnlockIcon } from "@/assets";
import { ConfirmationModal } from "../customersTable";

//TODO: Include skeleton when data is fetching
interface UserProfileProps {
  userData: ICustomer;
  isFetching: boolean;
  refetch: any;
}

export default function CustomerProfile({
  userData,
  isFetching,
  refetch,
}: UserProfileProps) {
  let editUserRef = useRef<ReusableDrawerRef>(null);
  const [openAddModal, setAddOpenModal] = useState<boolean>(false);
  const [suspendUser, suspendUserResponse] = useSuspendUnSuspendMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(
      Yup.object({
        role: Yup.string()
          .oneOf(["Registrar Staff", "Registrar Admin", "SuperAdmin"])
          .required(),
      })
    ),
  });

  
  // useEffect(() => {
  //   if (response?.isSuccess) {
  //     setAddOpenModal(!openAddModal);
  //     setAddRoleSuccessToggleModal(true);
  //     reset();
  //     refetch();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [response]);

  const handleEditDrawer = () => {
    editUserRef.current?.showDrawer();
  };

  const handleUsersRefresh = (isSuccess: boolean) => {
    if (isSuccess) {
      refetch();
    }
  };

  // useEffect(() => {
  //   let options: object[] = [];
  //   if (Roles.data) {
  //     Roles.data.forEach((item: UserRole) =>
  //       options.push({
  //         name: item.name,
  //         value: item.name,
  //       })
  //     );
  //   }
  //   setRoleOptions(options);
  // }, [Roles.data]);
  const [showIsSuspendModal, setShowIsSuspendModal] = useState<boolean>(false);

  const handleSuspendModal = () => {
    setShowIsSuspendModal(!showIsSuspendModal);
  };

  const handleSuspendUser = (row: ICustomer) => {
    suspendUser({
      id: row.id,
      userId: row.id,
      isDisabled: !row.isDisabled,
    }).then((res: any) => {
      if (res.error) {
        handleSuspendModal();
        GpToast({
          type: "error",
          message: "An error occured, kindly try again",
          placement: toast.POSITION.TOP_LEFT,
        });
      }
    });
  };

  useEffect(() => {
    if (suspendUserResponse.isSuccess) {
      const { message } = suspendUserResponse.data;
      GpToast({
        type: "success",
        message: message,
        placement: toast.POSITION.TOP_LEFT,
      });
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suspendUserResponse]);

  return (
    <div className="w-[90%]  flex justify-between">
      <div className="w-[33%]">
        <ProfileInfo
          RegistrarName={userData?.name || ""}
          EmailAddress={`${userData?.email}` || ""}
          OfficeAddress={
            userData?.organisation?.address || "N/A"
          }
          PhoneNumber={userData?.phoneNumber || "N/A"}
          UserType={"Customer"}
          // handleEdit={handleEditDrawer}
        />
      </div>
      <EditUser
        ref={editUserRef}
        userData={userData}
        OnEditComplete={handleUsersRefresh}
      />
      <div className="w-[65%] flex justify-center items-center  p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-4 dark:bg-gray-800">
        <div className="w-[90%]">
          <div className="my-2">
            {userData?.isDisabled ? (
              <div
                onClick={() => setShowIsSuspendModal(!showIsSuspendModal)}
                className="flex justify-start cursor-pointer  py-3 border-b border-neutral-50 text-red-600 items-center gap-2"
              >
                <LockIcon className="w-6 h-6" />
                Reinstate Customer
                {ConfirmationModal(
                  `Are you sure you want to ${
                    userData?.isDisabled ? "re-instate" : "suspend"
                  } this customer?`,
                  `${userData?.isDisabled ? "Reinstate" : "Suspend"}`,
                  showIsSuspendModal,

                  () => {
                    setShowIsSuspendModal(!showIsSuspendModal);
                  },
                  () => {
                    handleSuspendUser(userData);
                  },
                  suspendUserResponse.isLoading
                )}
              </div>
            ) : (
              <div
                onClick={() => setShowIsSuspendModal(!showIsSuspendModal)}
                className="flex justify-start cursor-pointer  py-3 border-b border-neutral-50 text-gray-700 items-center gap-2"
              >
                <UnlockIcon />
                Suspend customer
                {ConfirmationModal(
                  `Are you sure you want to ${
                    userData?.isDisabled ? "re-instate" : "suspend"
                  } this customer?`,
                  `${userData?.isDisabled ? "Reinstate" : "Suspend"}`,
                  showIsSuspendModal,

                  () => {
                    setShowIsSuspendModal(!showIsSuspendModal);
                  },
                  () => {
                    handleSuspendUser(userData);
                  },
                  suspendUserResponse.isLoading
                )}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-y-2.5">
            <div>
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Gender
              </h3>
              <b>{userData?.gender || "Male"}</b>
            </div>
            {/* <div>
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Position
              </h3>
              <b>Operations Officer</b>
            </div>
            <div>
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User Role
              </h3>
              <b>User</b>
            </div> */}
            <div>
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date of Birth
              </h3>
              <b>{userData?.dateOfBirth.split("T")[0]}</b>
            </div>

            <div>
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status
              </h3>
              <b>{userData?.isActive ? "Active" : "Inactive"}</b>
            </div>
            {/* <div>
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Department
              </h3>
              <b>Operations</b>
            </div> */}
          </div>
          <div className="mt-5">
          </div>
        </div>
      </div>
    </div>
  );
}
