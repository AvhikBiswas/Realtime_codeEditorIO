const UserRepository = require('../repository/userRepository.js');
class Join_User {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async Join(data) {
    try {
      const res = await this.userRepository.findUser(data);
      if (res.length === 0) {
        const UserCreated = await this.userRepository.createUser(data);
        return UserCreated;
      }
      return res;
    } catch (error) {}
  }
}
module.exports = Join_User;