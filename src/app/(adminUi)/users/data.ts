import { ITableColumn } from "@/components/Table/model";

export const usersTableColumns: ITableColumn[] = [
    {
      title: "Name of User",
      dataIndex: "name",
      key: "name",
      sort: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sort: false,
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sort: false,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sort: false,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      sort: false,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sort: true,
    },
    {
      title: "Action",
      dataIndex: "option",
      key: "option",
    },
  ];