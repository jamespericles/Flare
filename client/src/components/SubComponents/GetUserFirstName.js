import React, { useState } from 'react';
import { useStoreContext } from '../../store/store';

const GetUserFirstName = () => {
    const [state, /*dispatch*/] = useStoreContext();
    const [currentUser, /*setCurrentUser*/] = useState({
        firstname: state.user.first_name,
        });

    return (    
        <>
            {currentUser.firstname}
        </>
    );
}

export default GetUserFirstName;