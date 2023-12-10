const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { success, error } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            // return res.status(400).send('All fields are required');
            return res.send(error(400, "All fields are required"));
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            // return res.status(409).send('user is already registered');
            return res.send(error(409, "user is already registered"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
        })

        // return res.status(201).json({
        //     user,
        // });
        return res.send(
            success(201, {
                user,
            })
        )

    } catch (error) {
        console.log(error);
    }
}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            // return res.status(409).send("All fields are required");
            return res.send(error(409, "All fields are required"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            // return res.status(404).send("user is not registered");
            return res.send(error(404, "user is not registered"));
        }

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            // return res.status(403).send('Incorrect Password')
            return res.send(error(403, "Incorrect Password"));
        }

        const accessToken = generateAccessToken({
            id: user._id,
        });

        const refreshToken = generateRefreshToken({
            id: user._id,
        })

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        })

        // return res.json({ accessToken });
        return res.send(success(200, { accessToken }));

    } catch (error) {
        console.log(error);
    }
};

// this api will chech the refreshToken validity and generate a new access token
const refreshAccessTokenController = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) {
        // return res.status(401).send("Refresh token in cookie is required")
        return res.send(error(401, "Refresh token in cookie is required"));
    }

    const refreshToken = cookies.jwt;

    console.log('refressh', refreshToken)

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_PRIVATE_KEY
        );

        const _id = decoded._id;
        const accessToken = generateAccessToken({ _id });

        // return res.status(201).json({ accessToken });
        return res.send(success(201, { accessToken }));

    } catch (e) {
        console.log(e);
        // return res.status(401).send("Invalid refresh token");
        return res.send(error(401, "Invalid refresh token"));
    }
}

//internal funcions
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '20s',
        });
        console.log(token);
        return token;
    } catch (error) {
        console.log(error);
    }
}

const generateRefreshToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
            expiresIn: "1y",
        })
        console.log(token);
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signupController,
    loginController,
    refreshAccessTokenController,
}