// Functional component to handle the log-out function
// import React from "react";
import axios from "axios";
import { SET_GROUPS } from "../../store/actions";
import { useStoreContext } from "../../store/store";
import "../Sidebar/style.css";

export default useLoadGroups = (id) => {
  const [/*state*/, dispatch] = useStoreContext();

  return (
      axios
        .get(`/api/groups/getallbyuser/${id}`)
        .then(response => {
          if (response.status === 200) {
            console.log("useloadGroups() has run:", response.data.groups);
            dispatch({ type: SET_GROUPS, groups: response.data.groups });
          }
        })
        .catch(error => {
          console.log({ message: error.message });
          console.log(error);
        });
  )
};
