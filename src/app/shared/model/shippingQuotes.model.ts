import {LoadType} from '../../modules/shop/product/shipping-estimator/shipping-estimator.component';

export class ShippingQuotesModel {
  width: number;
  height: number;
  length: number;
  destination: string;
  origin: string;
  weight: number;
  volume: number;
  format: string;
  loadType: LoadType;
}
