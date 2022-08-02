import { IProductCategory, IProduct } from 'modules/orders/types';

export type QueryResponse = {
  loading: boolean;
  error: any;
  refetch: (params?: any) => void;
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
  posCurrentUser: IUser;
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
}

export interface ISubNav {
  permission: string;
  link: string;
  value: string;
  icon: string;
  additional?: boolean;
}

export interface IEbarimtConfig {
  companyName: string;
  ebarimtUrl: string;
  checkCompanyUrl: string;
  hasVat: boolean;
  hasCitytax: boolean;
  districtCode: number;
  companyRD: string;
  defaultGSCode: string;
  vatPercent: number;
  cityTaxPercent: number;
  footerText: string;
}

export interface IConfig {
  _id: string;
  name: string;
  description?: string;
  brandId: string;
  tagIds?: string[];
  productDetails: string[];
  adminIds: string[];
  cashierIds: string[];
  beginNumber: string;
  maxSkipNumber: number;
  kitchenScreen: any;
  waitingScreen: any;
  kioskMachine: any;
  formSectionTitle: string;
  formIntegrationIds: string[];
  token?: string;
  uiOptions: any;
  ebarimtConfig: IEbarimtConfig;
  initialCategoryIds: string[];
  kioskExcludeProductIds: string[];
  slots: any[];
}

export type CurrentConfigQueryResponse = {
  currentConfig: IConfig;
} & QueryResponse;

export type IOption = {
  label: string;
  value: string;
  avatar?: string;
};

export interface ICustomField {
  field: string;
  value: any;
  stringValue?: string;
  numberValue?: number;
  dateValue?: Date;
}

export type ProductsQueryResponse = {
  poscProducts: IProduct[];
} & QueryResponse;

export type ProductCategoriesQueryResponse = {
  poscProductCategories: IProductCategory[];
} & QueryResponse;

export interface ISlot {
  _id: string;
  code: string;
  name: string;
}
