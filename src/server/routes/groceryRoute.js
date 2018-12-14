import express from 'express';
import groceryController from '../controllers/groceryController';


const router = express.Router();

router.route('/items')
  .post(groceryController.createItem)
  .get(groceryController.getAllItems);

router.route('/item/:_id')
  .put(groceryController.updateItem)
  .delete(groceryController.deleteItem);

export default router;
