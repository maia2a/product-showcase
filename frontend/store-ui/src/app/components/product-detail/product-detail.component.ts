import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    this.isLoading = true;
    this.error = null;

    //Pega o id da rota atual
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching product details:', err);
          if (err.status === 404) {
            this.error = 'Product not found.';
          } else {
            this.error =
              'Failed to load product details. Please check backend connectivity.';
          }
          this.isLoading = false;
        },
      });
    } else {
      this.error = 'ID of the product not found in route params.';
      this.isLoading = false;
      console.error('ID not found in route params.');
    }
  }

  addToCart(): void {
    if (this.product) {
      console.log('Adding to cart:', this.product.name);
      alert(`Added to cart: ${this.product.name}`);
    }
  }
}
