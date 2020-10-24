import React from "react";
import { useStoreContext } from "../../store/store";

const GetUserEmail = () => {
    const [state] = useStoreContext();

    return <>{state.user.email}</>;
};


export default GetUserEmail;
