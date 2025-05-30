import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItem$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItem$ = cartService.items$;
    this.totalPrice$ = cartService.getTotalPrice();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // Método para remover um item do carrinho
  removeItem(productId: string): void {
    this.cartService.removeItem(productId);
  }

  // Método para aumentar a quantidade de um item
  increaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.product.id, item.quantity + 1);
  }

  // Método para diminuir a quantidade de um item
  decreaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.product.id, -1);
  }

  // Método para limpar o carrinho
  clearCart(): void {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartService.clearCart();
    }
  }
}
