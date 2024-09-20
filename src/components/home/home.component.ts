import { Component } from '@angular/core';
import { FeaturedProductComponent } from './front/featured-product/featured-product.component';
import { DealsWeekComponent } from './front/deals-week/deals-week.component';
import { TopSellingProductsComponent } from './front/top-selling-products/top-selling-products.component';
import { TrendingProductsComponent } from './front/trending-products/trending-products.component';
import { DiscountSectionComponent } from './front/discount-section/discount-section.component';
import { PromotionalBannerComponent } from './front/banners/promotional-banner/promotional-banner.component';
import { ItemsBannerComponent } from './front/banners/items-banner/items-banner.component';
import { BigdealBannerComponent } from './front/banners/bigdeal-banner/bigdeal-banner.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturedProductComponent,DealsWeekComponent,TopSellingProductsComponent,TrendingProductsComponent,DiscountSectionComponent,PromotionalBannerComponent,ItemsBannerComponent,BigdealBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
