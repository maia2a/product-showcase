import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ProductList } from './components/product-list/product-list';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppComponent,
    ProductList,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
