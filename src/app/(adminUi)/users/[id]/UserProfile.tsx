import ProfileInfo from "@/components/ProfileInfo";
import React, { Component, useEffect, useRef, useState } from "react";
import { IUser } from "@/models/User";
import { ReusableDrawerRef } from "@/components/ReusableDrawer";
import EditUser from "./EditUserProfile";
import { Badge, Modal } from "flowbite-react";
import AppButton from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {
  useAddRoleToUserMutation,
  useFetchUserRolesQuery,
} from "../userRolesApiSlice";
import { UserRole } from "@/models/UserRole";
import { MySelect } from "@/components/FormElements/Inputs";
import { toast } from "react-toastify";
import SuccessModal from "@/components/Modals/SuccessModal";

//TODO: Include skeleton when data is fetching
interface UserProfileProps {
  userData: IUser;
  isFetching: boolean;
  refetch: any;
}

export default function UserProfile({
  userData,
  isFetching,
  refetch,
}: UserProfileProps) {
  let editUserRef = useRef<ReusableDrawerRef>(null);
  const [openAddModal, setAddOpenModal] = useState<boolean>(false);
  const Roles = useFetchUserRolesQuery();
  const [addRoleToUser, response] = useAddRoleToUserMutation();
  const [addRoleSuccessModal, setAddRoleSuccessToggleModal] = useState(false);
  const [roleOptions, setRoleOptions] = useState<object[]>([]);
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

  const onSubmit = (data: any) => {
    const roles = [];
    roles.push(data.role);
    const newRole = {
      id: userData.id,
      roleNames: roles,
    };
    addRoleToUser(newRole).then((res: any) => {
      if (res.error) {
        toast.error("There was an error while adding role, try again", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  };
  useEffect(() => {
    if (response?.isSuccess) {
      setAddOpenModal(!openAddModal);
      setAddRoleSuccessToggleModal(true);
      reset();
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleEditDrawer = () => {
    editUserRef.current?.showDrawer();
  };

  const handleUsersRefresh = (isSuccess: boolean) => {
    if (isSuccess) {
      refetch();
    }
  };

  useEffect(() => {
    let options: object[] = [];
    if (Roles.data) {
      Roles.data.map((item: UserRole) =>
        options.push({
          name: item.name,
          value: item.name,
        })
      );
    }
    setRoleOptions(options);
  }, [Roles.data]);
  return (
    <div className="w-[90%]  flex justify-between">
      <div className="w-[33%]">
        <ProfileInfo
          RegistrarName={`${userData?.firstname} ${userData?.lastname}` || ""}
          EmailAddress={`${userData?.email}` || ""}
          OfficeAddress={
            userData?.organisation.address || "222B Palmgrove Ikorodu Rd"
          }
          PhoneNumber={"08098123456"}
          UserType={"User"}
          handleEdit={handleEditDrawer}
        />
      </div>
      <EditUser
        ref={editUserRef}
        userData={userData}
        OnEditComplete={handleUsersRefresh}
      />
      <div className="w-[65%] flex justify-center items-center  p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-4 dark:bg-gray-800">
        <div className="w-[90%]">
          <div className="grid grid-cols-2 grid-rows-2 gap-y-2.5">
            <div>
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Gender
              </h3>
              <b>{userData?.gender || "Male"}</b>
            </div>
            <div>
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
            </div>
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
            <div>
              <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Department
              </h3>
              <b>Operations</b>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Roles
            </h3>
            <div className="grid grid-cols-4 grid-rows-auto gap-4 mt-4 mb-6">
              {/* {userData.applicationRoles?.map((role) => (
                <Badge color="info" key={role}>
                  {role.toLowerCase() || "Staff"}
                </Badge>
              ))} */}
              <Badge size="sm" className="py-2" color="info">
                Staff
              </Badge>
              <Badge size="sm" className="py-2" color="warning">
                Admin
              </Badge>
              <Badge size="sm" className="py-2" color="success">
                Super Admin
              </Badge>
            </div>
            <div className="flex gap-4">
              <AppButton
                text="Add Role"
                appButtonType="green-button"
                buttonClick={() => setAddOpenModal(!openAddModal)}
                buttonWidth="w-[25%]"
              />

              <AppButton
                text="Remove Role"
                appButtonType="red-button"
                buttonClick={undefined}
                buttonWidth="w-[25%]"
              />
            </div>
            <SuccessModal
              openModal={addRoleSuccessModal}
              onDoneClicked={() => setAddRoleSuccessToggleModal(false)}
              message="Role added Successfully"
            />
            <Modal
              position="center"
              dismissible
              size="md"
              show={openAddModal}
              onClose={() => {
                reset();
                setAddOpenModal(!openAddModal);
              }}
            >
              <Modal.Body className="rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} className="px-4">
                  <MySelect
                    defaultValue=""
                    label="Add Role"
                    name="role"
                    options={roleOptions}
                    register={register}
                    errors={errors}
                  />
                  <div className=" flex gap-4">
                    <AppButton
                      text="Save"
                      appButtonType="green-button"
                      buttonClick={undefined}
                      buttonWidth="w-[25%]"
                      type="submit"
                      isLoading={response.isLoading}
                    />
                    <AppButton
                      text="Close"
                      appButtonType="red-button"
                      buttonClick={() => {
                        reset();
                        setAddOpenModal(!openAddModal);
                      }}
                      buttonWidth="w-[25%]"
                      type="button"
                    />
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
