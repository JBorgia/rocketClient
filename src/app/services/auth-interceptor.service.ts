import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const jwtToken = this.authenticationService.getJwtToken();

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
