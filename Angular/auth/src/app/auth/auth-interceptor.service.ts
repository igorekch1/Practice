import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) return next.handle(req); // if no user - for signin/signup

        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token) // setting token from user for every request
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
