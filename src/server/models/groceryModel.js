import mongoose from 'mongoose';

const { Schema } = mongoose;

const GroceryItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 100
  },
  purchaseStatus: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true });

export default mongoose.model('GroceryItem', GroceryItemSchema);
