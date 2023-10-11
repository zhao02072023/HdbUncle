'use client';

import {useState} from 'react';
import {AiFillGithub} from 'react-icons/ai'

interface AvatarProps {
  user: string | null | undefined;
}

const Avatar : React.FC<AvatarProps> = ({user}) => {
  
    return (
    <div>
        {user ? <img className="
        rounded-full"
        height="30"
        width="30"
        alt="Avatar"
        src={user}/> : <AiFillGithub size={24}/>
        }
    </div>

  )
}

export default Avatar;