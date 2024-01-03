const user = require('../model/user');

class UserRepository {
    async createUser(data) {
        try {
            const username = data.content.userNames;
            const roomid = data.content.roomId;
            const UserData = await user.create({
                userNames: username,
                roomId: roomid,
                active: true
            });
            console.log('user created from repo', UserData);
            return UserData;
        } catch (error) {
            console.log('error from create user Repo', error);
            throw error;
        }
    }


    async findUser(data) {
        try {
            const username = data.content.userNames;
            const roomid = data.content.roomId;
            console.log('Query:', { userNames: username, roomId: roomid });
            const userData = await user.find({
                userNames: username,
                roomId: roomid
            });
            return userData;
        } catch (error) {
            console.log('Error from find user Repo', error);
            throw error;
        }
    }

    async findPersonsByRoomAndActive(roomNumber) {
        try {
            const roomid = roomNumber.content.roomId;
            const persons = await user.find({
                roomId: roomid,
                active: true,
                userNames: { $ne: null }
            });

            console.log("persons", persons);
            return persons;
        } catch (error) {
            console.error('Error finding persons:', error);
            throw error;
        }
    }
    async removeUser(data) {

        try {
            const username = data.content.userNames;
            const roomid = data.content.roomId;
            const res = await user.deleteMany({
                userNames: username,
                roomId: roomid
            });
            console.log('user deleted', res);
            return res;
        } catch (error) {
            console.error('Error in remove user:', error);
            throw error;

        }
    }

};

module.exports = UserRepository;