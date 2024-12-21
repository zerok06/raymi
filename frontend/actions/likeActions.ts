'use server'

import { revalidatePath } from "next/cache";


export const createLike = async (eventData: any) => {
    const fetching = await fetch('http://localhost:3001/api/likes', {
        method: 'POST',
        body: JSON.stringify({ ...eventData, userId: Number(eventData.userId), eventId: Number(eventData.eventId) }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(eventData);
    revalidatePath('/home/event/[id]');
    const response = await fetching.json();
    return response;
};


export const deleteLike = async (eventData: any) => {
    const fetching = await fetch(`http://localhost:3001/api/likes/`, {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    revalidatePath('/home/event/[id]');
    console.log(eventData);
    const response = await fetching.json();
    return response;
};