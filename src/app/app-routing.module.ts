import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './review/review.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomProductFormComponent } from './custom-product-form/custom-product-form.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EditcategoriesComponent } from './editcategories/editcategories.component';
import { EditproductsComponent } from './editproducts/editproducts.component';
import { EditordersComponent } from './editorders/editorders.component';
import { EditpaymentsComponent } from './editpayments/editpayments.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MenComponent } from './men/men.component';
import { WomanComponent } from './woman/woman.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { NgChartsModule } from 'ng2-charts'; // Import NgChartsModule
import { CreatecategoryComponent } from './createcategory/createcategory.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes =
[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  {path: 'contact', component:ContactComponent},
  {path: 'home' , component:HomeComponent},
  {path: 'review' , component:ReviewComponent},
  {path: 'profile' , component:ProfileComponent},
  // {path: 'dashboard', component:DashboardComponent},
  {path: 'productform' , component:CustomProductFormComponent},
  {path: 'editusers' , component:EdituserComponent},
  {path: 'editcategories', component:EditcategoriesComponent},
  // {path: 'editproducts' , component:EditproductsComponent},
  {path: 'editorders' , component:EditordersComponent},
  {path: 'editpayments' , component:EditpaymentsComponent},
  {path: 'wishlist' , component:WishlistComponent},
  {path: 'men' , component:MenComponent},
  {path: 'woman' , component:WomanComponent},
  {path: 'shop' , component:ShopComponent},
  {path: 'checkout' , component:CheckoutComponent},
  {path: 'product' , component:ProductComponent},
  {path: 'cart' , component:CartComponent},
  { path: 'editcategories/:id', component: EditcategoriesComponent },
  { path: 'createcategory', component: CreatecategoryComponent },
  { path: 'editproducts/:id', component: EditproductsComponent },
  { path: 'editorders/:id', component: EditordersComponent },
  { path: 'editpayments/:id', component: EditpaymentsComponent },
  { path: 'createproduct', component: CreateproductComponent },
  {path: 'accessories' , component:AccessoriesComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }, // Redirect unknown routes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
