'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUser } from './getUser'

export interface Session {
    email: string
    id: number
    valid: boolean
}

export const verifySession = async () => {
    const cookie = (await cookies()).get('token')?.value
    const data: Session | null = await getUser({ token: cookie! })

    if (data == null) {
        return { isAuth: false }
    }
    const { email, id, valid } = data

    console.log(email, id, valid);


    return { isAuth: true, id, email }
}