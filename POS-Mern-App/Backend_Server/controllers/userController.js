const userModel=require('../models/userModel')


const loginController=async(req,resp)=>{
try {
    const {userId,password}=req.body;
    const user=await userModel.findOne({userId,password,verified:true});
    if(user){
        resp.status(200).send(user)
    }else{
        resp.json({
            message:"login Fail",
            user,
        })
    }
    
} catch (error) {
    console.log(error)
}
};

const registerController= async(req,resp)=>{
   try {
    // const post=await itemModel.save()
    const newUser=new userModel({...req.body, verified:true})
    await newUser.save();
    resp.status(201).send('New user Added successfully')
   } catch (error) {
    resp.status(400).send('Error',error);
      console.log(error);
   }
}



module.exports={loginController,registerController}