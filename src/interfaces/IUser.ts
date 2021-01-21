export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  password: string;
  salt: string;
  profilePicture?: string;
  active?: true;
  isChild?: false;
  parentIds?: string[];
  childIds?: string[];
  following?: string[];
  followers?: string[];
  correctPassword?: any;
}

export interface IUserInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  password: string;
}
