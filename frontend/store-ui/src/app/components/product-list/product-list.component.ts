import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import {
  PaginatedProductResult,
  ProductService,
} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;

  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.productService
      .getProducts(this.searchTerm, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response: PaginatedProductResult) => {
          this.products = response.data;
          this.currentPage = response.meta.currentPage;
          this.itemsPerPage = response.meta.itemsPerPage;
          this.totalItems = response.meta.totalItems;
          this.totalPages = response.meta.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.error =
            'Failed to load products. Please check backend connectivity.';
          this.isLoading = false;
        },
      });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadProducts();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  getPageNumbers(): number[] {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxPagesToShow / 2)
    );
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
}
