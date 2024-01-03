import axios from 'axios';
import Api_Url_v1 from './Api_Url';

export const SignInNewUser = (ownName, roomid) => {
  axios.post(`${Api_Url_v1}/create`, {
    userNames: ownName,
    roomID: roomid
  })
    .then(response => console.log('response is ', response?.data?.data))
    .catch(error => console.error('problem to send user data:', error));
};

export const UserLeave = (ownName, roomid) => {
  axios.delete(`${Api_Url_v1}/leave`, {

    userNames: ownName,
    roomId: roomid

  })
    .then(response => console.log('response', response))
    .catch(error => console.error('problem to send user data:', error));
};
