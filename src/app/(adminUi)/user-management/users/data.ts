import { ITableColumn } from "@/components/Table/model";

export const usersTableColumns: ITableColumn[] = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sort: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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