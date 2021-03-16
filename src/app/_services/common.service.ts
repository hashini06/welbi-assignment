/*
Developer - Hashini De Silva (hashinids@gmail.com)
Date - 2021-03-16
*/

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonService {
    public CURRENT_USER = "currentUser";
    public USER_TOKEN = "userToken";
    public RESIDENTS_DETAIL = "residentsDetail";
    public PROGRAMS_DETAIL = "programsDetail";

    constructor() { }

    setLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    removeLocalStorage(key) {
        localStorage.removeItem(key);
    }

    clearLocalStorage() {
        localStorage.clear();
    }
}