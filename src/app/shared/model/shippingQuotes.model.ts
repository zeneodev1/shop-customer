
export class ShippingQuote {
  width: number;
  height: number;
  length: number;
  quantity: number;
  destination: string;
  origin: string;
  weight: number;
  format: string;
  loadtype: string;
}

export class RatesResponse {
  mode: RateMode[];
  numQuotes: number;
}

export class RateMode {
  price: {
    min: {moneyAmount: {
        amount: number,
        currency: string
      }},
    max: {moneyAmount: {
        amount: number,
        currency: string
      }}
  };
  transitTimes: {
    min: number,
    unit: string,
    max: number
  };
  mode: string;
  comment: string;
}
