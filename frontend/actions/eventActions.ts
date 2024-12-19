'use server'


export const createEvent = async (eventData: any) => {
    const fetching = await fetch('http://localhost:3001/api/event', {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(eventData);
    const response = await fetching.json();
    return response;
};