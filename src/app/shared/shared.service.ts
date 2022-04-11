import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private readonly uiUrl = document.location.origin;
  private readonly apiUrl: string;

  private readonly headers: HttpHeaders;

  constructor(private http: HttpClient) {

    if (this.uiUrl !== 'http://localhost:4200') {
      this.apiUrl = this.uiUrl;
    } else {
      this.apiUrl = 'http://localhost:8080';
    }
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'true',
    });

  }

  uploadFile(files: File[]): Observable<any> {

    const formData: FormData = new FormData();

    for (const file of files) {
      formData.append('files', file, file.name);
    }

    const url = this.apiUrl + '/files/upload';
    return this.http
      .post(url, formData, {responseType: 'blob' as 'blob'});
  }
}

