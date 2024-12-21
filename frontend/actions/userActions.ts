'use server'

import { cookies } from "next/headers";


export const signUp = async (formData: any) => {

    const fetching = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log(formData);
    const response = await fetching.json()
    return response
}



export const signIn = async (formData: any) => {

    const fetching = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const response = await fetching.json()

    if (response.success) {
        (await cookies()).set('token', response.token, { path: '/' }).set("id", response.data.id, { path: '/' }).set("email", response.data.email, { path: '/' })
    }

    return response
}