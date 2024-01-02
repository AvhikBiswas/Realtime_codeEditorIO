import React from 'react';
import Avatar from 'react-avatar';

export default function UserAvatar({ user }) {
  return (
    <div className='users h-5 text-center m-2'>
      <div className="mx-auto">
        <Avatar name={user?.name} size="50" round="15%" textSizeRatio={1.75} />
      </div>
      <h1 className='text-white text-center text-sm mt-2'>{user?.name}</h1>
    </div>
  );
}
