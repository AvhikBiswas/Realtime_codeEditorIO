import React from 'react';
import Avatar from 'react-avatar';

export default function UserAvatar({user}) {
  console.log(user);
  return (
    <div className='users flex flex-col items-center'>
      <Avatar name={user?.name} size="50" round="15%" textSizeRatio={1.75} />
      <br></br>
      <h1 className='text-center text-sm m-2'>{user?.name}</h1>
    </div>
  )
}
