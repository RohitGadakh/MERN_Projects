const billsModel=require('../models/billsModel')


const getBillController=async(req,resp)=>{
try {
    const bills=await billsModel.find()
    resp.status(200).send(bills)
} catch (error) {
    console.log(error)
}
};

const addBillController= async(req,resp)=>{
   try {
    // const post=await itemModel.save()
    const newBill=new billsModel(req.body)
    await newBill.save();
    resp.status(201).send('Bill created successfully')
   } catch (error) {
    resp.status(400).send('Error',error);
      console.log(error);
   }
}




module.exports={addBillController,getBillController};