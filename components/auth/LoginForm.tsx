import React from 'react'
import CardWrapper from './CardWrapper'

const LoginForm = () => {
  return (
    <CardWrapper
        headerLabel='Welcome back'
        backButtonLabel="Don't have an account"
        backButtonHref='/auth/register'
        showSocial
    >
        <div>
            hello  
        </div>
    </CardWrapper>
  )
}

export default LoginForm
