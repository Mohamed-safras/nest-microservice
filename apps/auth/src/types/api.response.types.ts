export type ApiResponse<T> = {
  data?: T;
  message?: string;
  statusCode?: number;
};

// import { User } from '../entities/user.entity';
// import { ErrorType } from './error.types';

// export class RegisterResponse {
//   user?: User;
//   error?: ErrorType;
// }
