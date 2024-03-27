const express=require('express');
const { getItemController,addItemController, editItemController,deleteItemController} = require('../controllers/itemController');
const router=express.Router();

//routes

router.get('/get-items',getItemController);
router.post('/add-items',addItemController);
router.put('/edit-items',editItemController)
router.post('/delete-item',deleteItemController)

module.exports=router
  















