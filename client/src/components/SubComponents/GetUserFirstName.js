import React from 'react';
import { useStoreContext } from '../../store/store';

const GetUserFirstName = () => {
    const [state, /*dispatch*/] = useStoreContext();
    // const [currentUser, /*setCurrentUser*/] = useState({
    //     firstname: state.user.firstname,
    //     });

    return (    
        <>
            {state.user.first_name}
        </>
    );
}

export default GetUserFirstName;