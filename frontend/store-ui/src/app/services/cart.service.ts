import { Injectable } from '@angular/core';
import { BehaviorSubject, map, type Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);

  public items$: Observable<CartItem[]> = this.itemsSubject.asObservable();
  constructor() {}

  addItem(productToAdd: Product, quantity: number = 1): void {
    const currentItems = this.itemsSubject.getValue();
    const existingItemIndex = currentItems.findIndex(
      (item) => item.product.id === productToAdd.id
    );
    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
      };
      this.itemsSubject.next(updatedItems);
    } else {
      const newItem: CartItem = {
        product: productToAdd,
        quantity: quantity,
      };
      this.itemsSubject.next([...currentItems, newItem]);
    }
  }

  getItemCount(): Observable<number> {
    return this.items$.pipe(
      map((items) => items.reduce((count, item) => count + item.quantity, 0))
    );
  }

  getTotalPrice(): Observable<number> {
    return this.items$.pipe(
      map((items) =>
        items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      )
    );
  }
}
