import { Component, OnDestroy, OnInit ,} from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { Subscription } from 'rxjs';
import { ProductsBestSellerService } from '../../../../services/best-seller.service';

@Component({
  selector: 'app-top-vendors',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './top-vendors.component.html',
  styleUrl: './top-vendors.component.css'
})
export class TopVendorsComponent implements OnInit, OnDestroy {
  bestSeller: any;
  bestSellerSubscription: Subscription | null = null; // Initialize with null

  constructor(private productsBestSellerService: ProductsBestSellerService) { }

  ngOnInit(): void {
    this.bestSellerSubscription = this.productsBestSellerService.getBestSellerSignal().subscribe((data: any) => {
      this.bestSeller = data;
      console.log(this.bestSeller);
    });
  }

  ngOnDestroy(): void {
    this.bestSellerSubscription?.unsubscribe();
  }
}
