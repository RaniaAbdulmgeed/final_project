import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { ReviewComponent } from './review/review.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { CustomProductFormComponent } from './custom-product-form/custom-product-form.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EditcategoriesComponent } from './editcategories/editcategories.component';
import { EditproductsComponent } from './editproducts/editproducts.component';
import { EditordersComponent } from './editorders/editorders.component';
import { EditpaymentsComponent } from './editpayments/editpayments.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WomanComponent } from './woman/woman.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { MenComponent } from './men/men.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { OrdersComponent } from './orders/orders.component';
import { NgChartsModule } from 'ng2-charts'; // Import NgChartsModule
import { ApiService } from './services/api.service';
import { CreatecategoryComponent } from './createcategory/createcategory.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PolicyComponent } from './policy/policy.component';
import { HelppComponent } from './helpp/helpp.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    ReviewComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    DashHeaderComponent,

    CustomProductFormComponent,
    EdituserComponent,
    EditcategoriesComponent,
    EditproductsComponent,
    EditordersComponent,
    EditpaymentsComponent,
    WishlistComponent,
    WomanComponent,
    CheckoutComponent,
    ShopComponent,
    MenComponent,
    ProductComponent,
    CartComponent,
    AccessoriesComponent,
    OrdersComponent,
    CreatecategoryComponent,
    CreateproductComponent,
    RegisterComponent,
    PolicyComponent,
    HelppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgChartsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
