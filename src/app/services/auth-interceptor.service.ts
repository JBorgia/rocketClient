import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService, LoginInfoInStorage } from '@services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userInfoService: UserService) { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const jwtToken = this.userInfoService.getJwtToken();

        if (jwtToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'JWT ' + jwtToken)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
