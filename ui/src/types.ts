export type QueryResponse = {
  loading: boolean;
  refetch: () => void;
};

export interface IUserDoc {
  createdAt?: Date;
  username: string;
  email: string;
  isActive?: boolean;
  isOwner?: boolean;
  status?: string;
  permissionActions?: string[];
  configs?: any;
  configsConstants?: any;
}

export interface IUser extends IUserDoc {
  _id: string;
}

export type AllUsersQueryResponse = {
  allUsers: IUser[];
} & QueryResponse;

export type CurrentUserQueryResponse = {
  currentUser: IUser;
  subscribeToMore: any;
} & QueryResponse;

export type UsersQueryResponse = {
  users: IUser[];
} & QueryResponse;

export type IButtonMutateProps = {
  name?: string;
  values: any;
  isSubmitted: boolean;
  confirmationUpdate?: boolean;
  callback?: () => void;
  resetSubmit?: () => void;
  size?: string;
  object?: any;
  text?: string;
  icon?: string;
  type?: string;
  disableLoading?: boolean;
};

export interface IRouterProps {
  history: any;
  location: any;
  match: any;
};

export interface ISubNav {
  permission: string;
  link: string;
  value: string;
  icon: string;
  additional?: boolean;
};

export interface IConfig {
  _id: string;
  name: string;
  description?: string;
  brandId: string;
  tagIds?: string[];
  productDetails: string[];
  adminIds: string[];
  cashierIds: string[];
  kitchenScreen: any;
  waitingScreen: any;
  kioskMachine: any;
  formSectionTitle: string;
  formIntegrationIds: string[];
  token?: string;
  uiOptions: any;
};

export type CurrentConfigQueryResponse = {
  currentConfig: IConfig;
} & QueryResponse;
