import { Address } from './Address.model';

export interface User {
    name: string;
    email: string;
    password: string;
    avatar: string;
    date: Date;
    address: Address;
}
