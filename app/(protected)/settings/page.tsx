"use client"

import React from 'react'
import { auth } from '@/auth';
import { useSession, signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';


const SettingsPage = () => {

    const session = useSession();
    const user = useCurrentUser();

    const onClick = () => {
      signOut()
    }

  return (
    <div className='bg-white p-10 rounded-xl'>
        <button onClick={onClick}>
            Sign out
        </button>
    </div>
  )
}

export default SettingsPage
