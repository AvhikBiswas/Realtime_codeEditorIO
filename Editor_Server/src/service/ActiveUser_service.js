const UserRepository = require('../repository/userRepository.js');
class Find_ActiveUser {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async findAllUser(data) {
    try {
      const res = await this.userRepository.findPersonsByRoomAndActive(data);
      return res;
    } catch (error) {}
  }
}
module.exports = Find_ActiveUser;