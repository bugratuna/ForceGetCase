import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { CountriesModel, LookUpModel } from '../../../models/lookUp.model';

@Injectable({
  providedIn: 'root',
})
export class LookUpService {
  protected readonly apiService = inject(ApiService);

  getCountries() {
    return this.apiService.get<CountriesModel[]>('countries');
  }

  getUnit1() {
    return this.apiService.get<LookUpModel[]>('unit1');
  }

  getUnit2() {
    return this.apiService.get<LookUpModel[]>('unit2');
  }

  getCurrency() {
    return this.apiService.get<LookUpModel[]>('currency');
  }
}
