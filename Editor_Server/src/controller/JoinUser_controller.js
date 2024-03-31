const Join_User = require('../service/Join-service.js');
const join_user = new Join_User();
const create_user = async (req, res) => {
  try {
    const response = await join_user.Join(req.body);
    return res.status(201).json({
      succsess: true,
      message: "User Created",
      data: response,
      err: {}
    });
  } catch (error) {
    return res.status(501).json({
      succsess: false,
      message: "Something Went Wrong",
      data: {},
      err: error
    });
  }
};
module.exports = create_user;