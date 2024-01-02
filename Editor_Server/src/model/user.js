const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    userNames:{
        type:String,
        require:true,
    },
    roomId:{
        type:String,
        require:true,
    },
    active:{
        type:Boolean,
        require:true,
    },
});

const user=mongoose.model('user',userSchema);
module.exports=user;
