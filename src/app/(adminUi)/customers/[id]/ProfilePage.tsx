"use client";
import CustomerProfile from "./CustomerProfile";
import BreadCrumbs from "@/components/AdminUi/BreadCrumbs";
import { useParams } from "next/navigation";
import { useFetchuserByIdQuery } from "../CustomerApiSlice";
import { ICustomer } from "@/models/customer";

export default function DisplayProfile() {
  const { id: routeUserId } = useParams();
  const { data, isFetching, refetch } = useFetchuserByIdQuery(routeUserId);
  return (
    <div className="px-4 pt-6 pb-10 ">
      <BreadCrumbs
        links={[
          { label: "Customer Management", link: "#", isActive: true },
          { label: "Customers", link: "/customers", isActive: true },
          { label: "Profile", link: `/${routeUserId}`, isActive: true },
        ]}
      />
      <div>
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-black">Profile</h1>
        </div>
      </div>
      <CustomerProfile
        userData={data as ICustomer}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  );
}
