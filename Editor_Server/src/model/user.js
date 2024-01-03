const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    userNames: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
