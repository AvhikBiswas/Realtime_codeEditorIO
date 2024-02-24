import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";

export default function UserAvatar({ user, bold }) {
  return (
    <div className={`h-20 w-20 mb-2 text-center overflow-hidden text-base font-sans  ${bold ? 'font-bold' : 'font-light'}`}>
      <div className="relative">
        <Avatar
          name={user?.userNames}
          size="50"
          round="15%"
          textSizeRatio={1.75}
        />
      </div>
      <h1 className="text-white text-center text-sm mt-2">{user?.userNames}</h1>
    </div>
  );
}

