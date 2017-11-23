import { Item } from './item';
import { User } from './user';

export class Purchase {
    id: number;
    name: string;
    date: any;
    items: Array<Item>;
    total_price: number;
    user: User;
}