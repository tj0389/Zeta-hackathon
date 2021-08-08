export interface User {
  isLogin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  mobile: number;
  childrenId: Array<string>;
};
