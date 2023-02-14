import React from 'react';

const UserCard = ({ user,setSelectedUser, }) => {


    const {
        avatar,
        profile
    } = user
   
    return (
        <div onClick={() => setSelectedUser(user)} className='bg-[#ECECEC] hover:cursor-pointer hover:bg-[#D5D5D5] flex gap-2 rounded items-center px-2 shadow-md my-4 py-2 font-semibold '>
            <img className='w-12 rounded-full' src={'https://cdn.vectorstock.com/i/preview-1x/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg'} alt="" />
            <p>{profile.firstName} { profile.lastName}</p>
        </div>
    );
};

export default UserCard;