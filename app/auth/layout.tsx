import React from 'react'

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <div className='h-screen flex items-center justify-center bg-gradient-to-r from-blue-700  via-blue-500 via-50% to-blue-600 '>
      {children}
    </div>
  )
}

export default AuthLayout
