import { Component } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
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
