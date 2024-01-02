const UserRepository = require('../repository/userRepository');

class Join_User {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async Join(data) {
        
        try {
            console.log(data);
            const res = await this.userRepository.findUser(data);
            if(res.length==0){
                const UserCreated =await this.userRepository.createUser(data);
                return UserCreated;
            }
            return res;
        } catch (error) {
            console.log('error in join service', error);
        }
       
    }
    
}
module.exports=Join_User;