import React from 'react'
import { Outlet } from 'react-router-dom'
import UserChatComponents from './UserChatComponents'

const UserChatRoutes = () => {
  return (
    <>
    <UserChatComponents />
    <Outlet/>
    </>
  )
}

export default UserChatRoutes