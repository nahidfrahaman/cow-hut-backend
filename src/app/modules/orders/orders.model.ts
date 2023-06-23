import { Schema, model } from 'mongoose';
import { IOrders, OrdersModel } from './oders.interface';

export const OrdersSchema = new Schema<IOrders, OrdersModel>({
  cow: {
    type: Schema.Types.ObjectId,
    ref: 'Cow',
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Order = model<IOrders, OrdersModel>('Order', OrdersSchema);
