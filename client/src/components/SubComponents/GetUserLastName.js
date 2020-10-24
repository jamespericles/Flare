import React from "react";
import { useStoreContext } from "../../store/store";

const GetUserLastName = () => {
    const [state] = useStoreContext();

    return <>{state.user.last_name}</>;
};


export default GetUserLastName;
