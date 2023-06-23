import { Schema, model } from 'mongoose';
import { locations } from './cow.constant';
import { CowModel, ICow } from './cow.interface';

export const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: locations,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Dairy', 'Beef', 'DualPurpose'],
      required: true,
    },
    label: {
      type: String,
      enum: ['forSale', 'soldOut'],
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>('Cow', CowSchema);
