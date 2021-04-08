import {OrderItem} from './orderItem.model';
import {Address} from './address.model';

export class Order {
  id: string;
  paymentMethod: string;
  userId: string;
  orderItems: OrderItem[];
  address: Address;
}
