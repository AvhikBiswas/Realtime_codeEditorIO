import axios from 'axios';
import Api_Url_v1 from './Api_Url';

export const SignInNewUser = async (ownName, roomid) => {
<<<<<<< HEAD

console.log('bro thre room is ',roomid);

=======
>>>>>>> 77669763a06aaed1aa339f4b79f4307d0d3c5198
  await axios.post(`${Api_Url_v1}/create`, {
    userNames: ownName,
    roomID: roomid
  })
    .then(response => console.log('response is ', response?.data?.data))
    .catch(error => console.error('problem to send user data:', error));
};

export const UserLeave = async (data) => {
  await axios.delete(`${Api_Url_v1}/leave`, {
    data
  })
    .then(response => console.log('response from axios ', response))
    .catch(error => console.error('problem to send user data:', error));
};


export const GetAllUser = async (roomid) => {
  console.log('roomid ---->', roomid);

  try {
    const response = await axios.get(`${Api_Url_v1}/AllUser`, {
      params: {
        roomId: roomid,
        test: 'hi'
      }
    });

    console.log('response from axios:', response.data);
    return response.data; // Return the data received from the server
  } catch (error) {
    console.error('problem to send user data:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};



