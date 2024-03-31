import axios from "axios";

// Import environment variables
const Api_Url_v1 = process.env.REACT_APP_API_URL;

export const SignInNewUser = async (ownName, roomid) => {
  await axios
    .post(`${Api_Url_v1}/create`, {
      userNames: ownName,
      roomID: roomid,
    })
    .then((response) => response)
    .catch((error) => console.error("problem to send user data:", error));
};

export const UserLeave = async (data) => {
  await axios
    .delete(`${Api_Url_v1}/leave`, {
      data,
    })
    .then((response) => response)
    .catch((error) => console.error("problem to send user data:", error));
};

export const GetAllUser = async (roomid) => {
  try {
    const response = await axios.get(`${Api_Url_v1}/AllUser`, {
      params: {
        roomId: roomid,
        test: "hi",
      },
    });

    return response.data; // Return the data received from the server
  } catch (error) {
    console.error("problem to send user data:", error);
    throw new Error("Something Went Wrong");
  }
};
