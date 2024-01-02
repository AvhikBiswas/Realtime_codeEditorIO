import axios from 'axios';

const sendName = (ownName, roomID) => {
  axios.post('http://localhost:3030/api/getUserData', {
    userName: ownName,
    roomID: roomID
  })
    .then(response => console.log('response', response))
    .catch(error => console.error('problem to send user data:', error));
};

export default sendName;
