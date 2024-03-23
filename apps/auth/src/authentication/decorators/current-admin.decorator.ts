import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Admin } from '../../users/schemas/admin.schema';

export const getCurrentAdminByContext = (context: ExecutionContext): Admin => {
  if (context.getType() === 'http') {
    console.log(context.switchToHttp().getRequest().user);
    return context.switchToHttp().getRequest()?.user;
  }
  if (context.getType() === 'rpc') {
    // console.log(context.switchToHttp().getRequest().user);
    return context.switchToRpc().getData()?.user;
  }
};

export const CurrentAdmin = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentAdminByContext(context),
);
