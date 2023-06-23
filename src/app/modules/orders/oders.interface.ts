import { Model, ObjectId } from 'mongoose';

export type IOrders = {
  cow: ObjectId;
  buyer: ObjectId;
};

export type OrdersModel = Model<IOrders>;
