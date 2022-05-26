import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./models/user.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {

  constructor(private http: HttpClient)
  {
  }

  read(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseURL}/user`).pipe(
      map((obj) => obj),
    );
  }

  readById(id: number): Observable<User> {
    const url = `${environment.baseURL}/user/${id}`;
    return this.http.get<User>(url).pipe(
      map((obj) => obj),
    );
  }

  update(user: User): Observable<User> {
    const url = `${environment.baseURL}/user/${user.id}`;
    return this.http.put<User>(url, user).pipe(
      map((obj) => obj),
    );
  }

  updatePermissions(data) {
    return this.http.post(`${environment.baseURL}/user/permission`, data)
    .subscribe(result => {});
  }

  delete(id: number) {
    const url = `${environment.baseURL}/${id}`;
    return this.http.delete(url).subscribe(result => {})
  }
}
