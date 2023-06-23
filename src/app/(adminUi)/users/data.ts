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
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      sort: false,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "state",
      sort: false,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
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