import { Component } from '@angular/core';
import { FeaturedProductComponent } from './front/featured-product/featured-product.component';
import { DealsWeekComponent } from './front/deals-week/deals-week.component';
import { TopSellingProductsComponent } from './front/top-selling-products/top-selling-products.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturedProductComponent,DealsWeekComponent,TopSellingProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
