const users = require('../model/users.js');
class UserRepository {
  async createUser(data) {
    try {
      const username = data.userNames;
      const roomid = data.roomID;
      const UserData = await users.create({
        userNames: username,
        roomId: roomid,
        active: true
      });
      return UserData;
    } catch (error) {
      return error;
    }
  }
  async findUser(data) {
    try {
      const username = data.userNames;
      const roomid = data.roomID;
      const userData = await users.find({
        userNames: username,
        roomId: roomid
      });
      return userData;
    } catch (error) {
      return error;
    }
  }
  async findPersonsByRoomAndActive(roomNumber) {
    try {
      const roomid = roomNumber.roomId;
      const persons = await users.find({
        userNames: {
          $ne: null
        },
        roomId: roomid,
        active: true
      });
      return persons;
    } catch (error) {
      return error;
    }
  }
  async removeUser(data) {
    try {
      const username = data.ownName;
      const roomid = data.roomId;
      const res = await users.deleteMany({
        userNames: username,
        roomId: roomid
      });
      return res;
    } catch (error) {
      return error;
    }
  }
}
;
module.exports = UserRepository;