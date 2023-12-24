import React from 'react'
import './Feed.scss'
import Post from '../post/Post'

function Feed() {
    return (
        <div className='Feed'>
            <div className="container">
                <div className="left-part">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="right-part"></div>
            </div>
        </div>
    )
}

export default Feed