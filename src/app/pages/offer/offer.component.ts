import { Component, inject, OnInit, signal } from '@angular/core';
import { OfferService } from '../../core/services/offer/offer.service';
import { OfferModel } from '../../models/offer.model';
import { forkJoin, map } from 'rxjs';
import { LookUpService } from '../../core/services/lookUp/look-up.service';
import { CountriesModel, LookUpModel } from '../../models/lookUp.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { TranslatePipe } from '../../core/pipelines/translate.pipe';

@Component({
  selector: 'for-offer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
})
export class OfferComponent implements OnInit {
  protected readonly offerService = inject(OfferService);
  protected readonly lookUpService = inject(LookUpService);
  protected readonly fb = inject(FormBuilder);

  loading = signal(false);

  cities = signal<string[]>([]);
  countries = signal<CountriesModel[]>([]);
  unit1 = signal<LookUpModel[]>([]);
  unit2 = signal<LookUpModel[]>([]);
  currency = signal<LookUpModel[]>([]);

  formGroup: FormGroup = this.fb.group({
    mode: [''],
    movementType: [''],
    incoterm: [''],
    country: [''],
    city: [''],
    palletCount: [''],
    unit1: [''],
    unit2: [''],
    currency: [''],
  });

  ngOnInit() {
    this.formGroup.get('country')?.valueChanges.subscribe({
      next: (result) => {
        this.cities.set(
          this.countries().find((c) => c.name === result)?.cities || [],
        );
        this.formGroup.patchValue({ city: this.cities()[0] });
      },
    });
    forkJoin([
      this.lookUpService.getCountries(),
      this.offerService.getAllOffers(),
      this.lookUpService.getUnit1(),
      this.lookUpService.getUnit2(),
      this.lookUpService.getCurrency(),
    ])
      .pipe(
        map((results) => {
          return {
            countries: results[0] as CountriesModel[],
            offers: results[1] as OfferModel[],
            unit1: results[2] as LookUpModel[],
            unit2: results[3] as LookUpModel[],
            currency: results[4] as LookUpModel[],
          };
        }),
      )
      .subscribe({
        next: ({ countries, offers, unit1, unit2, currency }) => {
          this.countries.set(countries);
          this.unit1.set(unit1);
          this.unit2.set(unit2);
          this.currency.set(currency);
          console.log(offers);
        },
      });
  }

  submitOffer() {
    this.loading.set(true);
    const offer = this.formGroup.value;
    const req: OfferModel = {
      mode: offer.mode,
      movementType: offer.movementType,
      incoterm: offer.incoterm,
      country: offer.country,
      city: offer.city,
      packageType: offer.packageType,
      unit1: offer.unit1,
      unit2: offer.unit2,
      currency: offer.currency,
      palletCount: offer.palletCount,
      dimensions: offer.dimensions,
    };
    this.offerService.addOffer(req).subscribe({
      next: () => {
        this.loading.set(false);
        alert('New offer created');
      },
      error: (err) => {
        this.loading.set(false);
        console.log(err);
      },
    });
  }
}
