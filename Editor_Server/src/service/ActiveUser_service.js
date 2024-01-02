const UserRepository = require('../repository/userRepository');

class Find_ActiveUser{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async findAllUser(data){
        try {
            const res = await this.userRepository.findPersonsByRoomAndActive(data);
            console.log("from Active user ",res);
            return res;
        } catch (error) {
            console.log("error from active user",error);
        }
    }
}
module.exports=Find_ActiveUser;