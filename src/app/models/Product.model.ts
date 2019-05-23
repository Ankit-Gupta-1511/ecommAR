export interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
    date: Date;
    description?: string;
    arModel?;
    cartId?: string;
}
