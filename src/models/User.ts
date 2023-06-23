export interface NewUser {

  organisationId: string,
  firstname: string,
  lastname: string,
  middlename: string,
  gender: string,
  email: string,
  dateOfBirth: string,
  applicationRoleId: string
}

export interface IUser{
    isActive: boolean;
    id: string,
    userId: string,
    applicationUserId?: string,
    organisationId: string,
    firstname: string,
    lastname: string,
    middlename: string,
    gender: string,
    email: string,
    dateOfBirth: string,
    applicationRoles?: string[],
    organisation: any


}

export interface IUsersTableProps {
    data: any;
    handleEdit: any;
    refetch: any;
  }

  export interface INewUserProps {
    OnCreateComplete: (isSuccess: boolean)=> void
  }
