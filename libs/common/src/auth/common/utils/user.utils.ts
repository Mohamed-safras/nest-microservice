import { ExecutionContext } from '@nestjs/common';

export const addUser = (user: any, context: ExecutionContext) => {
  if (context.getType() === 'rpc') {
    context.switchToRpc().getData().user = user;
  } else if (context.getType() === 'http') {
    context.switchToHttp().getRequest().user = user;
  }
};
