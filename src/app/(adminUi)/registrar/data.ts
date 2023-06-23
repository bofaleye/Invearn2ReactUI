import { IRegistrarsTableData } from "../../../models/registrar";
import { ITableColumn } from "../../../components/Table/model";

export const registrarsTableColumns: ITableColumn[] = [
  {
    title: "Name of registrar",
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
    title: "State",
    dataIndex: "state",
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

export const registrarsTableData: IRegistrarsTableData[] = []
// [
//   {
//     uid: 1,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
//   {
//     uid: 2,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
//   {
//     uid: 3,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Inactive",
//   },
//   {
//     uid: 4,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
//   {
//     uid: 5,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
//   {
//     uid: 6,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
//   {
//     uid: 7,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
//   {
//     uid: 8,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
//   {
//     uid: 9,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
//   {
//     uid: 10,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
//   {
//     uid: 11,
//     image: "",
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@ap.com",
//     currency: "Nigerian Naira",
//     state: "Lagos",
//     country: "Nigeria",
//     status: "Active",
//   },
// ];
