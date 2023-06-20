export interface IUser{
    applicationUserId: string,
    organisationId: string,
    firstname: string,
    lastname: string,
    middlename: string,
    gender: string,
    email: string,
    dateOfBirth: string,
    applicationRoles: string[],
    organisation: any


}

export interface IUsersTableProps {
    data: any;
    handleEdit: any;
    handleDelete: any
  }