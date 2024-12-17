import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { OfferModel } from '../../../models/offer.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  protected readonly apiService = inject(ApiService);

  _loading = signal(true);
  _offerList = signal<OfferModel[]>([]);

  get loading() {
    return this._loading;
  }

  get offerList() {
    return this._offerList;
  }

  getAllOffers() {
    this._loading.set(true);
    return this.apiService.get<OfferModel[]>('offers').pipe(
      tap((response) => {
        this._loading.set(false);
        if (response.length > 0) {
          this._offerList.set(response);
        }
        return response;
      }),
    );
  }

  addOffer(offer: OfferModel) {
    this._loading.set(true);
    return this.apiService.post<OfferModel>('offers', offer).pipe(
      tap((response) => {
        this._loading.set(false);
        if (response.length > 0) {
          this._offerList.set(response);
        }
        return response;
      }),
    );
  }
}
