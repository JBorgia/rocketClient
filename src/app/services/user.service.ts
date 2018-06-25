import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';




import { User} from '@models/user.model';


export interface UserInStorage {
    fullName: string;
    email: string;
    displayName: string;
    token: string;
    jwt: string;
}

export interface LoginInfoInStorage {
    success: boolean;
    message: string;
    landingPage: string;
    user?: UserInStorage;
}

@Injectable()
export class UserService {

    public currentUserKey: 'currentUser';
    public storage: Storage = sessionStorage; // <--- you may switch between sessionStorage or LocalStrage (only one place to change)

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<any> {
        return this.http.get('http://localhost:8080/arsUsers');
    }

    saveUser(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:8080/arsUsers', user);
    }

    // Store userinfo from session storage
    storeUserInfo(userInfoString: string) {
        this.storage.setItem(this.currentUserKey, userInfoString);
    }

    // Remove userinfo from session storage
    removeUserInfo() {
        this.storage.removeItem(this.currentUserKey);
    }

    // Get userinfo from session storage
    getUserInfo(): UserInStorage | null {
        try {
            const userInfoString: string = this.storage.getItem(this.currentUserKey);
            if (userInfoString) {
                const userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
                return userObj;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }

    isLoggedIn(): Observable<boolean> {
        return of(this.storage.getItem(this.currentUserKey) ? true : true);
    }

    // Get User's Display name from session storage
    getUserName(): string {
        const userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            // console.log(userObj.fullName);
            return userObj.fullName;
        }
        return 'no-user';
    }

    // Get User's Display name from session storage
    getUserEmail(): string {
        const userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.email;
        }
        // console.log(userObj.email);
        return 'no-user';
    }

    getStoredToken(): string | null {
        const userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.token;
        }
        return null;
    }

    getJwtToken(): string | null {
        const userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.jwt;
        }
        return null;
    }
}

