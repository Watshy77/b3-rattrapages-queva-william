export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    rating: number;
    available: boolean;
    imageUrl: string;
    expiryDate: Date;
    addedDate: Date;
}