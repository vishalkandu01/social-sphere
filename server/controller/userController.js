const Post = require("../model/Post");
const User = require("../model/User");
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

const getMyPosts = async (req, res) => {
    try {
        const curUserId = req._id;
        const allUserPosts = await Post.find({
            owner: curUserId
        }).populate('likes'); 

        return res.send(success(200, {allUserPosts}));
    } catch (e) {
        console.log(e);
        return res.send(error(500, e.message));
    }
}

const getUserPosts = async (req, res) => {
    try {
        const userId = req.body.userId;
        if(!userId) {
            return res.send(400, error(400, "userId is required"));
        }

        const allUserPosts = await Post.find({
            owner: userId
        }).populate('likes');

        return res.send(success(200, {allUserPosts}));
    } catch (e) {
        console.log(e);
        return res.send(error(500, e.message));
    }
}

const deleteMyProfile = async (req, res) => {
    try {
        const curUserId = req._id;
        const curUser = await User.findById(curUserId);

        //delete all posts
        await Post.deleteMany({
            owner: curUserId
        })

        // remove myself from follower's followings
        curUser.followers.forEach(async (followerId) => {
            const follower = await User.findById(followerId);
            const index = await follower.followings.indexOf(curUserId);
            follower.followings.splice(index, 1);
            await follower.save();
        })

        // remove myself from my following's followers
        curUser.followings.forEach(async (followingId) => {
            const following = await User.findById(followingId);
            const index = await following.followers.indexOf(curUserId);
            following.followers.splice(indexOf, 1);
            await following.save();
        })

        // remove myself from all likes
        const allPosts = await Post.find();
        allPosts.forEach(async (post) => {
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index, 1);
            await post.save();
        })
        
        // delete user
        await curUser.remove(); 

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
        });

        return res.send(success(200, 'user deleted'));
    } catch (e) {
        return res.send(500, e.message);
    }
}

module.exports = {
    followOrUnfollowUserController,
    getPostOfFollowing,
    getMyPosts,
    getUserPosts,
    deleteMyProfile,
}