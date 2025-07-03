import { ACCOUNT_STATUS } from "../../config/enums";

interface IUserPasswordAttrs {
  email?: string;
  tokenType?: string;
  token?: string;
  tokenExpire?: string;
  date?: Date;
}

export { IUserPasswordAttrs };
