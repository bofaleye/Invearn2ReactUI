"use client";
import UserProfile from "./UserProfile";
import BreadCrumbs from "@/components/AdminUi/BreadCrumbs";
import { useParams } from "next/navigation";
import { useFetchuserByIdQuery } from "../UserApiSlice";
import { IUser } from "@/models/User";

export default function DisplayProfile() {
  const { id: routeUserId } = useParams();
  const { data, isFetching, refetch } = useFetchuserByIdQuery(routeUserId);
  return (
    <div className="px-4 pt-6 pb-10 ">
      <BreadCrumbs
        links={[
          { label: "App Management", link: "#", isActive: true },
          { label: "Users", link: "/users", isActive: true },
          { label: "Profile", link: `/${routeUserId}`, isActive: true },
        ]}
      />
      <div>
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-black">Profile</h1>
        </div>
      </div>
      <UserProfile
        userData={data as IUser}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  );
}
