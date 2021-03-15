import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Resolve } from '@angular/router';

@Injectable()
export class ApiService<T> {
    configUrl = '/api/';

    constructor(private http: HttpClient) { }

    get(endPoint: string): Observable<any> {
        return this.http.get<T>(this.configUrl + endPoint)
    }

    post(endPoint: string, data) {
        return this.http.post<T>(this.configUrl + endPoint, data);
    }

    patch(endPoint: string, data) {
        return this.http.patch<T>(this.configUrl + endPoint, data);
    }

    put(endPoint: string, data) {
        return this.http.put<T>(this.configUrl + endPoint, data);
    }

    delete(endPoint: string) {
        return this.http.delete<T>(this.configUrl + endPoint);
    }
}
