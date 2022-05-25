import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Resource } from "./models/resource.model";

@Injectable({
  providedIn: "root",
})
export class ResourceService {

  constructor(private http: HttpClient)
  {
  }

  baseUrl = "http://localhost:8000/api/resource";

  read(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.baseUrl).pipe(
      map((obj) => obj),
    );
  }

  readById(id: number): Observable<Resource> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Resource>(url).pipe(
      map((obj) => obj),
    );
  }

  update(user: Resource): Observable<Resource> {
    const url = `${this.baseUrl}/${user.id}`;
    return this.http.put<Resource>(url, user).pipe(
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
