import {Injectable} from '@angular/core';
import {Product} from '../interface/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];
  private baseUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + `/${id}`);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put(this.baseUrl + `/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }

}
