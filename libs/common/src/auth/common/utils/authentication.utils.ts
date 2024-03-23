import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const getAuthentication = (context: ExecutionContext) => {
  let authentication: string;
  if (context.getType() === 'rpc') {
    authentication = context.switchToRpc().getData().Authentication;
  } else if (context.getType() === 'http') {
    authentication = context.switchToHttp().getRequest().cookies
      ?.Authentication;
  }
  if (!authentication) {
    throw new UnauthorizedException('No value was provided for Authentication');
  }
  return authentication;
};
