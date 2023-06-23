import { ITableColumn, ITableData } from "@/components/Table/model";
import { DepartmentModel } from "@/models/department";

export const DepartmentTableColumn: ITableColumn[] = [
    {
        title: 'Department Name',
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: 'Department Description',
        key: 'description',
        dataIndex: 'description',
    },
    {
        title: 'Action',
        key: 'action',
        dataIndex: 'action'
    }
]

export const DepartmentData: DepartmentModel[] = [
    {
        description: "Description of Department 15",
        id: "id-15",
        name: "Department 15",
        organisationId: 'asdad',
      }, ]

export const DepartmentTableData: ITableData[] = [];

export const UnitTableColumn: ITableColumn[] = [
    {
        title: 'Unit Name',
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: 'Unit Description',
        key: 'description',
        dataIndex: 'description',
    },
    {
        title: 'Action',
        key: 'action',
        dataIndex: 'action'
    }
]

export const UnitTableData: ITableData[] = [
    {
        description: "Description of Unit 15",
        id: "id-15",
        name: "Department 15",
        organisationId: 'asdad',
        deptId: '1234534'
      },
]
