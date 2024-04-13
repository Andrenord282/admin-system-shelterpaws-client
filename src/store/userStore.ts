import { observable, action, makeObservable } from 'mobx';
import { AuthorizedUser } from '@/services/api';

class UserStore {
    authorized = false;
    userID = '';
    userName = '';
    userEmail = '';
    accessToken = '';

    constructor() {
        makeObservable(this, {
            authorized: observable,
            userID: observable,
            userName: observable,
            userEmail: observable,
            accessToken: observable,
            setUser: action,
            clearUser: action,
        });
    }

    setUser(user: AuthorizedUser) {
        this.authorized = true;
        this.userID = user.userID;
        this.userName = user.userName;
        this.userEmail = user.userEmail;
        this.accessToken = user.accessToken;
    }

    clearUser() {
        this.authorized = false;
        this.userID = '';
        this.userName = '';
        this.userEmail = '';
        this.accessToken = '';
    }
}

export { UserStore };
