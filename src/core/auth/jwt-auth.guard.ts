import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err, user) {
    if (!user || !user.user_id) {
      throw (
        err ||
        new UnauthorizedException({
          error_code: "UNAUTHORIZED",
          message: "Lütfen giriş yapınız.",
        })
      );
    }
    return user;
  }
}

@Injectable()
export class JwtNoneUserAuth extends AuthGuard("jwt") {
  handleRequest(err, user) {
    if (!user) {
      throw (
        err ||
        new UnauthorizedException({
          error_code: "UNAUTHORIZED",
          message: "Lütfen giriş yapınız.",
        })
      );
    }
    return user;
  }
}

/**
 * Dealer User Check
 */
@Injectable()
export class AuthDealerGuard extends AuthGuard("jwt") {
  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
  //   super()
  // }

  handleRequest(err, user) {
    if (!user || !user.user_id || user.user_type != "DEALER") {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}

/**
 * Admin User Check
 */
@Injectable()
export class AuthAdminGuard extends AuthGuard("jwt") {
  private brand_id: any = false;
  private dealer_id: any = false;

  async canActivate(context: ExecutionContext): Promise<any>  {
    const request = context.switchToHttp().getRequest();
    this.brand_id = Number(request.params?.brand_id);
    this.dealer_id = Number(request.params?.dealer_id);
    return super.canActivate(context);
  }

  handleRequest(err, user) {

    if (!user || !user.user_id || !['BRAND','DEALER','DOP'].includes(user.user_type))
      throw (err || new UnauthorizedException({error_code: "UNAUTHORIZED",  message: "Lütfen giriş yapınız."}));

    if (user.user_type == "BRAND" && user.main_brand_id != this.brand_id)
      throw new UnauthorizedException({error_code: "UNAUTHORIZED",  message: "Lütfen giriş yapınız."})

    if (user.user_type == "DEALER" && (user.main_brand_id != this.brand_id || user.dealer_id != this.dealer_id))
      throw new UnauthorizedException({error_code: "UNAUTHORIZED",  message: "Lütfen giriş yapınız."});

    if (user.user_type == 'DOP' && this.brand_id) {
      user.main_brand_id = Number(this.brand_id);
      if (this.dealer_id) {
        user.dealer_id = Number(this.dealer_id);
      }
    }

    return user;
  }

}
