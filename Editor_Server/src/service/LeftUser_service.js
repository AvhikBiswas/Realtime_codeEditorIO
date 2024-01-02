const UserRepository = require('../repository/userRepository');

class RemoveUser {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async LeftUser(data) {
        try {
            console.log(data);
            const res = await this.userRepository.findUser(data);
            if (res.length != 0) {
                const result = await this.userRepository.removeUser(data);
                console.log('USER REMOVED ', result);
            }
            return res;
        } catch (error) {
            console.log('error in LeftUser', error);
            throw error;
        }
    }
}
module.exports = RemoveUser;