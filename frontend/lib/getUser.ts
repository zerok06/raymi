

import { Session } from "./verifyAuth";

interface GetUserProps {
    token: string;
}

export const getUser = async ({ token }: GetUserProps): Promise<Session | null> => {

    try {
        const response = await fetch('http://localhost:3001/api/auth/validate-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        console.log(response);

        if (!response.ok) {
            console.log('Failed to fetch user')
            return null
        }



        const { email, id, valid }: Session = await response.json();

        return { email, id, valid }
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
}