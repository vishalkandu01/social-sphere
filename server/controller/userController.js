const Post = require("../model/Post");
const User = require("../module/User");
const { success, error } = require("../utils/responseWrapper");;

const followOrUnfollowUserController = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;
        const curUserId = req._id;

        const userToFollow = await User.findById(userIdToFollow);
        const curUser = await User.findById(curUserId);

        if (curUserId === userIdToFollow) {
            return res.send(error(409, 'Users cannot follow themselve'))
        }

        if (!userToFollow) {
            return res.send(error(404, 'User to follow not found'));
        }

        if (curUser.followings.includes(userIdToFollow)) {
            const followingIndex = curUser.followings.indexOf(userIdToFollow);
            curUser.followings.splice(followingIndex, 1);

            const followerIndex = userToFollow.followers.indexOf(curUser);
            userToFollow.followers.splice(followerIndex, 1);

            await userToFollow.save();
            await curUser.save();

            return res.send(success(200, 'User unfollowed'));
        } else {
            userToFollow.followers.push(curUserId);
            curUser.followings.push(userIdToFollow);

            await userToFollow.save();
            await curUser.save();

            return res.send(success(200, "User Followed"));
        }
    } catch (e) {
        console.log(e);
        return res.send(error(500, e.message));
    }
}

const getPostOfFollowing = async (req, res) => {
    try {
        const curUserId = req._id;

        const curUser = await User.findById(curUserId);

        const posts = await Post.find({
            'owner': {
                '$in': curUser.followings
            }
        })

        return res.send(success(200, posts));
    } catch (e) {
        return res.send(error(500, e.message));
    }

}


module.exports = {
    followOrUnfollowUserController,
    getPostOfFollowing,
}