import { Component } from '@angular/core';
import { FeaturedProductComponent } from './front/featured-product/featured-product.component';
import { DealsWeekComponent } from './front/deals-week/deals-week.component';
import { TopSellingProductsComponent } from './front/top-selling-products/top-selling-products.component';
import { TrendingProductsComponent } from './front/trending-products/trending-products.component';
import { DiscountSectionComponent } from './front/discount-section/discount-section.component';
import { PromotionalBannerComponent } from './front/banners/promotional-banner/promotional-banner.component';
import { ItemsBannerComponent } from './front/banners/items-banner/items-banner.component';
import { BigdealBannerComponent } from './front/banners/bigdeal-banner/bigdeal-banner.component';
import { RecommendedProductComponent } from './front/recommended-product/recommended-product.component';
import { PopularProductsComponent } from './front/popular-products/popular-products.component';
import { TopVendorsComponent } from './front/top-vendors/top-vendors.component';
import { DaysaleBannerComponent } from './front/banners/daysale-banner/daysale-banner.component';
import { RecentlyViewedProductsComponent } from './front/recently-viewed-products/recently-viewed-products.component';
import { TopBrandsComponent } from './front/top-brands/top-brands.component';
import { ShippingInfoComponent } from './front/shipping-info/shipping-info.component';
import { NewsletterSubscribeComponent } from './front/newsletter-subscribe/newsletter-subscribe.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturedProductComponent,DealsWeekComponent,TopSellingProductsComponent,TrendingProductsComponent,DiscountSectionComponent,PromotionalBannerComponent,ItemsBannerComponent,BigdealBannerComponent,RecommendedProductComponent,PopularProductsComponent,TopVendorsComponent,DaysaleBannerComponent,RecentlyViewedProductsComponent,TopBrandsComponent,ShippingInfoComponent,NewsletterSubscribeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
