const UserRepository = require('../repository/userRepository.js');

class RemoveUser {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async LeftUser(data) {
        try {
            const res = await this.userRepository.findUser(data);
                const result = await this.userRepository.removeUser(data);
                console.log('USER REMOVED ', result);
            
            return res;
        } catch (error) {
            console.log('error in LeftUser', error);
            throw error;
        }
    }
}
module.exports = RemoveUser;