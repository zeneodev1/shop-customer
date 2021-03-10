import {Product} from './product.model';

export class Wish {
  id: string;
  quantity: number;
  userId: string;
  product: Product;
}
