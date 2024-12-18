import { FormSignIn } from '@/components/forms/FormSignIn'
import { FormSignUp } from '@/components/forms/FormSignUp'
import React from 'react'

const Page = () => {
  return (
    <div className=" flex justify-center">
      <div className="max-w-lg">
        <h1 className="text-3xl mb-2 font-semibold text-ui-200 text-center">
          Sign In
        </h1>
        <p className="text-base text-white/70 mb-8 text-center">
          Sabemos lo complicado que puede ser organizar un evento. No tiene por
          qué ser así.
        </p>
        <FormSignIn />
      </div>
    </div>
  )
}

export default Page
