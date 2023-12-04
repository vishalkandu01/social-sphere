

const signupController = async(req, res) => {
    try {
        const {email, password} = req.body;
    } catch (error) {
        console.log(error);
    }
}


const loginController = async(req, res) => {
    try {
        res.send('from login');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signupController,
    loginController
}