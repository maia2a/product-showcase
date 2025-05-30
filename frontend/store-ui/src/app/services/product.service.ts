import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root', // Service is available application-wide
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products'; // Backend API URL

  constructor(private http: HttpClient) {}

  getProducts(searchTerm?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (searchTerm && searchTerm.trim() !== '') {
      params = params.append('search', searchTerm);
    }
    return this.http.get<Product[]>(this.apiUrl, { params: params });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
