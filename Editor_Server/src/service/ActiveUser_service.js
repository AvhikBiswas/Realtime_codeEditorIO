const UserRepository = require('../repository/userRepository.js');

class Find_ActiveUser {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async findAllUser(data) {
        console.log('from service ', data);
        try {
            const res = await this.userRepository.findPersonsByRoomAndActive(data);
            return res;
        } catch (error) {
            console.log("error from active user", error);
        }
    }
}
module.exports = Find_ActiveUser;