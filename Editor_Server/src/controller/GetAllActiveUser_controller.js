const GetAllActiveUser_Service = require('../service/ActiveUser_service.js');
const Find_ActiveAllUser = new GetAllActiveUser_Service();

const GetAllActiveUser = async (req, res) => {
    console.log('req.query', req.query);

    try {
        const response = await Find_ActiveAllUser.findAllUser(req.query);

        return res.status(201).json({
            success: true,
            message: "Successfully found all users",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: "Something Went Wrong",
            data: {},
            err: error
        });
    }
};

module.exports = GetAllActiveUser;
