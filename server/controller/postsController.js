const Post = require("../model/Post");
const User = require("../model/User");
const { success, error } = require("../utils/responseWrapper")

const getAllPostsController = async (req, res) => {
    console.log(req._id);
    // return res.send('These are all the posts');
    return res.send(success(200, success));
}

const createPostController = async (req, res) => {
    try {
        const { caption } = req.body;

        if(!caption) {
            return res.send(error(400, 'Caption is required'))
        }

        const owner = req._id

        const user = await User.findById(req._id);

        const post = await Post.create({
            owner,
            caption
        })

        user.posts.push(post._id);
        await user.save();

        console.log('user', user);
        console.log('post', post);

        return res.send(success(201, post));

    } catch (e) {
        console.log('This is my error', e)
        return res.send(error(500, e.message));
    }
}

const likeAndUnlikePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const curUserId = req._id

        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error(404, 'Post not found'));
        }

        if (post.likes.includes(curUserId)) {
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index, 1);

            await post.save();
            return res.send(success(200, 'Post Unliked'))
        } else {
            post.likes.push(curUserId);
            await post.save();
            return res.send(success(200, "Post Liked"));
        }
    } catch (e) {
        return res.send(error(500, e.message));
    }
}

const updatePostController = async (req, res) => {
    try {
        const { postId, caption } = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error(404, 'Post not found'));
        }

        if (post.owner.toString() !== curUserId) {
            return res.send(error(403, 'Only owners can update their posts'));
        }

        if (caption) {
            post.caption = caption;
        }

        await post.save();
        return res.send(success(200, { post }));

    } catch (e) {
        return res.send(error(500, e.message));
    }
}

const deletePost = async (req, res) => {
    try {
        const {postId} = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId);
        const curUser = await User.findById(curUserId);
        if(!post) {
            return res.send(error(404, "post not found"));
        }
        if(post.owner.toString() !== curUserId) {
            return res.send(error(403, "only owners can delete their posts"));
        }

        const index = curUser.posts.indexOf(postId);
        curUser.posts.splice(index, 1);
        await curUser.save();
        await post.remove();

        return res.send(success(200, "post deleted successfully"));

    } catch (e) {
        return res.send(error(500, e.message));
    }
}

module.exports = {
    getAllPostsController,
    createPostController,
    likeAndUnlikePost,
    updatePostController,
    deletePost
}