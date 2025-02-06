import { Component } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  quantity: number = 1;


  openModal() {
    let modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
  }


increaseQuantity() {
  this.quantity++;
}

decreaseQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

removeItem() {
  console.log("تم حذف العنصر من السلة");
}

}
