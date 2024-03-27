const itemModel=require('../models/itemModel')


const getItemController=async(req,resp)=>{
try {
    const items=await itemModel.find()
    resp.status(200).send(items)
} catch (error) {
    console.log(error)
}
};

const addItemController= async(req,resp)=>{
   try {
    // const post=await itemModel.save()
    const newItem=new itemModel(req.body)
    await newItem.save();
    resp.status(201).send('Item created successfully')
   } catch (error) {
    resp.status(400).send('Error',error);
      console.log(error);
   }
}

const editItemController=async(req,resp)=>{
    try {
        await itemModel.findOneAndUpdate({_id:req.body.itemId},req.body);
       resp.status(201).send("Item updated..")
    } catch (error) {
        resp.status(400).send(error)
        console.log(error);
    }

   }

   const deleteItemController=async(req,resp)=>{
    try {
        const {itemId}=req.body;
        await itemModel.findOneAndDelete({_id:itemId})
        resp.status(200).json("item deleted successfully");
    } catch (error) {
        resp.status(400).send(error);
        console.log(error)
    }
   }

module.exports={getItemController,addItemController,editItemController,deleteItemController}