import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const baseUrl = 'https://api.opencagedata.com/geocode/v1/json?';
const API = 'ed6b4490e4ed4706a54cd7d07e2a7027';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  forwardConvert(address: string) {
    return this.http.get(`${baseUrl}q=${address}&key=${API}`);
  }
}
