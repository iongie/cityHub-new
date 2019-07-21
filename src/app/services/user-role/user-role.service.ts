import { Injectable, OnDestroy } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UserRoleService implements OnDestroy {
  private url = environment.baseUrl;
  private subs: Subject<void> = new Subject();
  private _refresh = new Subject();
  constructor(
    public http: HttpClient,
  ) { }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  // --------------------------for Handle Error----------------
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error Client Code: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Server Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  get refresh() {
    return this._refresh;
  }

  getByPrivilegeId(privilegeId: any): Observable<any> {
    return this.http.get<any>(this.url + '/user-role/' + privilegeId.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getById(userRole: any): Observable<any> {
    return this.http.get<any>(this.url + '/user-role/show/' + userRole.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }
}
