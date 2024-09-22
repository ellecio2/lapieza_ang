import { Component, OnDestroy, OnInit ,} from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { Subscription } from 'rxjs';
import { ProductsBestSellerService } from '../../../../services/best-seller.service';

@Component({
  selector: 'app-top-selling-products',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './top-selling-products.component.html',
  styleUrl: './top-selling-products.component.css'
})
export class TopSellingProductsComponent implements OnInit, OnDestroy {
  bestSeller: any[] = []; // Initialize bestSeller to an empty array
  bestSellerSubscription: Subscription | null = null;

  constructor(private productsBestSellerService: ProductsBestSellerService) {}

  ngOnInit(): void {
    this.productsBestSellerService.getBestSeller().subscribe(); // Ensure the API call is made

    this.bestSellerSubscription = this.productsBestSellerService.getBestSellerSignal().subscribe(
      this.handleBestSellerData.bind(this),
      this.handleErrorResponse.bind(this)
    );
  }

  ngOnDestroy(): void {
    // Ensure to unsubscribe to prevent memory leaks
    if (this.bestSellerSubscription) {
      this.bestSellerSubscription.unsubscribe();
    }
  }

  private handleBestSellerData(data: any[]): void {
    console.log('Received data in component:', JSON.stringify(data, null, 2)); // Added detailed logging
    this.bestSeller = data;
    this.logBestSeller();
  }

  private handleErrorResponse(error: any): void {
    console.error('Error occurred while subscribing to best seller signal:', error);
  }

  private logBestSeller(): void {
    if (this.bestSeller && this.bestSeller.length > 0) {
      console.log('Best seller value is', this.bestSeller);
    } else {
      console.log('No best seller data available.');
    }
  }
}
