export interface Order {
    _id: string;
    items: string[];
    total: number;
    paymentStatus: string;
    paymentIntentId: string;
};

