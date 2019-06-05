import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "./products.service";
import { Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  product;
  greetingbuttonstatus = false;
  products = [];
  private productSubscription: Subscription

  constructor(private productsService: ProductsService) {
    this.products = this.productsService.getProducts();
    setTimeout(() => {
     this.greetingbuttonstatus = true;
    },3000)
  }

  onAddProduct(form) {
    // this.products.push(this.product)
    //  this.products.push(form.value.productName)
    if (form.valid) {
      this.productsService.addProduct(form.value.productName);
      this.productSubscription =  this.productsService.productsUpdated.subscribe(() => {
        this.products = this.productsService.getProducts()
      });
    }
  }

  onRemoveProduct(productName: string) {
   this.products =  this.products.filter(p => p !== productName)
  }

  ngOnInit() {
    this.products = this.productsService.getProducts();


  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe()
  }

}
