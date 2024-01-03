const RemoveUser = require('../service/LeftUser_service');
const removeUser = new RemoveUser();

const Leave=async(req,res)=>{
try {
    const response = await removeUser.LeftUser(req.body);
    return res.status(201).json({
        succsess:true,
        message:"User Leave The Room",
        data:response,
        err:{}
    })
} catch (error) {
    return res.status(501).json({
        succsess:false,
        message:"Somthing Went Wrong",
        data:{},
        err:error
    })
}
} 
module.exports=Leave;