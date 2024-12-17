import { Component, inject, OnInit } from '@angular/core';
import { OfferService } from '../../core/services/offer/offer.service';
import { NzTableComponent, NzThMeasureDirective } from 'ng-zorro-antd/table';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { TranslatePipe } from '../../core/pipelines/translate.pipe';

@Component({
  selector: 'for-offer-list',
  standalone: true,
  imports: [
    NzThMeasureDirective,
    NzTableComponent,
    NzSpinComponent,
    TranslatePipe,
  ],
  templateUrl: './offer-list.component.html',
  styleUrl: './offer-list.component.css',
})
export class OfferListComponent implements OnInit {
  protected readonly offerService = inject(OfferService);

  loading = this.offerService.loading;
  offerList = this.offerService.offerList;

  ngOnInit() {
    this.offerService.getAllOffers().subscribe();
  }
}
