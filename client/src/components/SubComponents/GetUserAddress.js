import React from "react";
import { useStoreContext } from "../../store/store";

const GetUserAddress = () => {
    const [state] = useStoreContext();

    return <>{state.user.address1}</>;
};


export default GetUserAddress;
