import { Order } from "./Order";

export interface OrderState {
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;
}