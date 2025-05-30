import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface PaginatedProductResult {
  data: Product[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

@Injectable({
  providedIn: 'root', // Service is available application-wide
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products'; // Backend API URL

  constructor(private http: HttpClient) {}

  getProducts(
    searchTerm?: string,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedProductResult> {
    let params = new HttpParams();
    if (searchTerm && searchTerm.trim() !== '') {
      params = params.append('search', searchTerm);
    }
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http.get<PaginatedProductResult>(this.apiUrl, {
      params: params,
    });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
