import { ITableColumn } from '@/components/Table/model';

export const rolesTableColumns: ITableColumn[] = [
  { title: 'Role Name', dataIndex: 'name', key: 'name', sort: false },
  { title: 'Code', dataIndex: 'code', key: 'code', sort: false },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    sort: false,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sort: true,
  },
  {
    title: 'Action',
    dataIndex: 'option',
    key: 'option',
  },
];

export const permissionsTableColumn: ITableColumn[] = [
  { title: 'Permission Name', dataIndex: 'name', key: 'name', sort: true },
  { title: 'Module', dataIndex: 'module', key: 'module', sort: true },
  // { title: "Group", dataIndex: "group", key: "group", sort: true },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    sort: false,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    sort: false,
  },
];

export const menuPermissionsTableColumn: ITableColumn[] = [
  { title: 'Permission Name', dataIndex: 'name', key: 'name', sort: true },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    sort: false,
  },
];

export const roles = {
        "items": [
            {
                "isSystemRole": false,
                "code": null,
                "name": "Registrar Admin",
                "normalizedName": "REGISTRAR ADMIN",
                "permissions": [],
                "id": "d9998801-e182-8aa0-186e-948608859953",
                "description": 'For Admins',
                "isActive": true,
                "dateCreated": "2023-10-09T08:23:01.9578538+00:00",
                "dateUpdated": "2023-10-09T08:23:01.9578553+00:00"
            
        },
        {
            "isSystemRole": false,
            "code": null,
            "name": "Registrar Admin",
            "normalizedName": "SUPER ADMIN",
            "permissions": [],
            "id": "d9998801-e182-8aa0-186e-948608859953",
            "description": 'for SuperAdmin',
            "isActive": true,
            "dateCreated": "2023-10-09T08:23:01.9578538+00:00",
            "dateUpdated": "2023-10-09T08:23:01.9578553+00:00"
        
    },
    ],
        "pageNumber": 1,
        "totalPages": 2,
        "totalCount": 20,
        "hasPreviousPage": false,
        "hasNextPage": true,
}