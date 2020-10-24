import React from "react";
import { useStoreContext } from "../../store/store";

const GetUserPhone = () => {
    const [state] = useStoreContext();

    return <>{state.user.mobile}</>;
};


export default GetUserPhone;
