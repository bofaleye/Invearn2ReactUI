export interface NewUser {

  userName: string,
  description: string,
  email: string,
  password: string,
}

export interface IUser{
    [x: string]: any;
    userName: string,
    description: string,
    dateCreated: string,
    dateUpdated: string,
    isActive: boolean;
    id: string,
    email: string,
}

export interface IUsersTableProps {
    data: any;
    refetch: any;
    openNewUserDrawer: ()=> void;
    handleEdit: (data: IUser)=> void;
}

  export interface INewUserProps {
    OnCreateComplete: (isSuccess: boolean)=> void
  }
