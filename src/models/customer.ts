export interface NewCustomer {

  organisationId: string,
  firstname: string,
  lastname: string,
  middlename: string,
  gender: string,
  email: string,
  dateOfBirth: string,
  applicationRoleId: string
}

export interface ICustomer{
    [x: string]: any;
    name: string;
    phoneNumber: string;
    isLockedOut: any;
    roles: any;
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
    organisation: any,
    isDisabled: boolean,


}

export interface IUsersTableProps {
    data: any;
    refetch: any;
  }

  export interface INewUserProps {
    OnCreateComplete: (isSuccess: boolean)=> void
  }
