import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import backgroundImg from '../../assets/backgroundImg.jpg'
import { AiOutlineLike } from "react-icons/ai";

function Post({post}) {
  return (
    <div className='Post'>
        <div className="heading">
            <Avatar />
            <h4>Vishal Kandu</h4>
        </div>
        <div className="content">
            <img src={backgroundImg} alt="" />
        </div>
        <div className="footer">
            <div className="like">
                <AiOutlineLike className='icon' />
                <h4>4 likes</h4>
            </div>
            <p className='caption'>This is nature Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate et dolorum exercitationem excepturi necessitatibus incidunt, sunt, voluptas recusandae culpa ex, libero ipsam! Hic nobis libero neque doloribus est molestias sint!</p>
            <h6 className='time-ago'>4 hrs ago</h6>
        </div>
    </div>
  )
}

export default Post