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
});

export default mongoose.model('GroceryItem', GroceryItemSchema);
