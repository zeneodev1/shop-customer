import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {RatesResponse, ShippingQuote} from '../../../../shared/model/shippingQuotes.model';
import {ShippingService} from '../../../../core/service/shipping.service';

export enum LoadType {
  boxes = 'boxes',
  pallets = 'pallets',
  container20 = 'container20',
  container40 = 'container40',
  container40HC = 'container40HC',
  container45HC = 'container45HC'
}


@Component({
  selector: 'app-shipping-estimator',
  templateUrl: './shipping-estimator.component.html',
  styleUrls: ['./shipping-estimator.component.css']
})
export class ShippingEstimatorComponent implements OnInit {
  shippingForm: FormGroup;
  shippingCategory = 'PALLETS-BOXES';
  loadType: LoadType = LoadType.boxes;
  loadTypeEnum = LoadType;
  shippingQuote: ShippingQuote = new ShippingQuote();
  @Input()
  productInfo: any;
  dirty = false;
  loadingResults = false;
  showResultsModal = false;
  ratesResponse: RatesResponse;
  constructor(private shippingService: ShippingService) {
  }


  ngOnInit(): void {
    this.shippingForm = new FormGroup({
      units: new FormControl(1, [Validators.required]),
      length: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }

  changeCategory(category: string): void {
    this.dirty = false;
    if (category === 'PALLETS-BOXES' && this.shippingCategory !== 'PALLETS-BOXES') {
      this.shippingCategory = category;
      this.loadType = this.loadTypeEnum.boxes;
    } else if (category === 'CONTAINERS' && this.shippingCategory !== 'CONTAINERS'){
      this.shippingCategory = category;
      this.loadType = this.loadTypeEnum.container20;
    }

  }


  setLoadType(loadType: LoadType): void {
    this.dirty = false;
    this.loadType = loadType;
  }

  get units(): AbstractControl {
    return this.shippingForm.get('units');
  }

  get address(): AbstractControl {
    return this.shippingForm.get('address');
  }

  get country(): AbstractControl {
    return this.shippingForm.get('country');
  }

  get length(): AbstractControl {
    return this.shippingForm.get('length');
  }

  get height(): AbstractControl {
    return this.shippingForm.get('height');
  }

  get width(): AbstractControl {
    return this.shippingForm.get('width');
  }

  get weight(): AbstractControl {
    return this.shippingForm.get('weight');
  }

  submit(): void {
    this.dirty = true;
    if (this.units.valid && this.country.valid && this.address.valid) {
      if (this.shippingCategory === 'CONTAINERS') {
        // do something
        this.getQuotes();
      } else if (this.shippingCategory === 'PALLETS-BOXES') {
        if (this.loadType === this.loadTypeEnum.boxes) {
          // do the same thing
          this.getQuotes();
        } else if (this.loadType === this.loadTypeEnum.pallets) {
          if (this.length.valid && this.height.valid && this.width.valid) {
            // do the same thing again
            this.getQuotes();
          }
        }
      }
    }
  }

  getQuotes(): void {
    this.showResultsModal = true;
    this.loadingResults = true;
    this.shippingQuote.destination = this.country.value + ', ' + this.address.value;
    this.shippingQuote.origin = 'NY';
    this.shippingQuote.quantity = this.units.value;
    this.shippingQuote.loadtype = this.loadType.toString();
    this.shippingQuote.format = 'json';
    if (this.shippingCategory === 'PALLETS-BOXES') {
      if (this.loadType === this.loadTypeEnum.boxes) {
        this.shippingQuote.width = this.productInfo.width;
        this.shippingQuote.height = this.productInfo.height;
        this.shippingQuote.length = this.productInfo.length;
        this.shippingQuote.weight = this.productInfo.weight;
      }
      else if (this.loadType === this.loadTypeEnum.pallets) {
        this.shippingQuote.width = this.width.value;
        this.shippingQuote.height = this.height.value;
        this.shippingQuote.length = this.length.value;
        this.shippingQuote.weight = this.weight.value;
      }
    }
    this.shippingService.getQuotes(this.shippingQuote).subscribe(value => {
      this.loadingResults = false;
      if (value !== null && value.response !== null) {
        this.ratesResponse = value.response.estimatedFreightRates;
        if (this.ratesResponse.numQuotes === 1) {
          this.ratesResponse.mode = [value.response.estimatedFreightRates.mode];
        }
      } else {
        this.ratesResponse = new RatesResponse();
        this.ratesResponse.numQuotes = 0;
      }
    });
  }

  closeResultsModal(): void {
    this.showResultsModal = false;
  }
}
