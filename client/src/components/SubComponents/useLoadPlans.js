// Functional component to handle the log-out function
// import React from "react";
import axios from "axios";
import { SET_PLANS } from "../../store/actions";
import { useStoreContext } from "../../store/store";
import "../Sidebar/style.css";

export default useLoadPlans = (id) => {
  const [/*state*/, dispatch] = useStoreContext();

  return (
      axios
        .get(`/api/plans/getallbyuser/${id}`)
        .then(response => {
          if (response.status === 200) {
            console.log("useLoadPlans() has run:", response.data.plans);
            dispatch({ type: SET_PLANS, plans: response.data.plans });
          }
        })
        .catch(error => {
          console.log({ message: error.message });
          console.log(error);
        });
  )
};
