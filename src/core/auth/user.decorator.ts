import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/*
Header ile gelen token içindeki model
 */
export class JwtUser {
  user_id: number;
  user_title: string;
  session_id: string;
  mobile_phone?: string;
  user_type?: string;
  client: string;
  client_point: string;
  expires: any;
}


export class JwtNoneUser {
  user_title: string;
  user_role: string;
  user_dealer_id: number;
  dealer_id: number;
  client_point: string;
  session_id: string;
  expires: any;
}


export class JwtDealerUser {
  user_id: number;
  user_title: string;
  user_role: any;
  user_dealer_id: number;
  dealer_id: number;
  client_point: string;
  session_id: string;
  user_type: string;
  main_brand_id: number;
  expires: any;
}

export class JwtAdminUser {
  user_id: number;
  user_type: string;
  api_key?: string;
  dealer_id: number;
  main_brand_id: number;
  app_code?: string;
  SAD?: string;
  client_point?: string;
  expires: any;
}


export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const AuthAdmin = createParamDecorator(
  (data: string, ctx: ExecutionContext): JwtAdminUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
