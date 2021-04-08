import {Order} from './order.model';

export class Transaction {
  id: string;
  userId: string;
  order: Order;
  date: Date;
}
