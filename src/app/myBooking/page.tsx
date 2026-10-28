import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyBookingpage =async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user
    console.log(user)
    return (
        <div>
            page
        </div>
    );
};

export default MyBookingpage;