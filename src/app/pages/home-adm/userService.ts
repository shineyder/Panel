import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {

  constructor(private http: HttpClient)
  {
  }

  baseUrl = "http://localhost:8000/api/user";

  read(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map((obj) => obj),
    );
  }

  readById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      map((obj) => obj),
    );
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.id}`;
    return this.http.put<User>(url, user).pipe(
      map((obj) => obj),
    );
  }

  updatePermissions(data) {
    return this.http.post('http://localhost:8000/api/permission', data);
  }

  delete(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url).subscribe(result => {})
  }
}
