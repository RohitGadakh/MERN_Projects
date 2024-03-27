const express=require('express');
const { addBillController,getBillController} = require('../controllers/billsController');
const router=express.Router();

//routes

router.get('/get-bills',getBillController);
router.post('/add-bills',addBillController);

module.exports=router
  















