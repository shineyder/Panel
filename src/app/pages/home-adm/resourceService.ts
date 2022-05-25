import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Resource } from "./models/resource.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ResourceService {

  constructor(private http: HttpClient)
  {
  }

  read(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${environment.baseURL}/resource`).pipe(
      map((obj) => obj),
    );
  }
}
