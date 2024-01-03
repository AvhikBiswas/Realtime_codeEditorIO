const GetAllActiveUser_Service = require('../service/ActiveUser_service');
const Find_ActiveAllUser = new GetAllActiveUser_Service();

const GetAllActiveUser = async (req, res) => {
    try {
        const { roomId } = req.body;
        console.log('room id', roomId);
        if (roomId) {
            const response = await Find_ActiveAllUser.findAllUser(req.body);
            return res.status(201).json({
                success: true,
                message: "Successfully found all users",
                data: response,
                err: {}
            });
        }
        return res.status(404).json({
            success: false,
            message: "Enter Room Id",
            data: {},
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
