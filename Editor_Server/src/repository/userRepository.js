const users = require('../model/users.js');

class UserRepository {
    async createUser(data) {
        try {
            const username = data.userNames;
            const roomid = data.roomID;
            console.log('username,roomid', username, roomid);
            const UserData = await users.create({
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
            console.log("from repository Data", data);
            const username = data.userNames;
            const roomid = data.roomID;
            const userData = await users.find({
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
        console.log('roooooooom no',roomNumber);
        try {
            const roomid = roomNumber.roomId;
            console.log('room from 00000000000 ', roomid)
            const persons = await users.find({
                userNames: { $ne: null },
                roomId: roomid,
                active: true

            });
            console.log('array is  -->',persons)
            return persons;
        } catch (error) {
            console.error('Error finding persons:', error);
            throw error;
        }
    }
    
    async removeUser(data) {

        console.log('remove user repo data', data);
        try {

            const username = data.ownName;
            const roomid = data.roomId;
            console.log('user name and roo id in repository ', username, roomid);
            const res = await users.deleteMany({
                userNames: username,
                roomId: roomid,
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