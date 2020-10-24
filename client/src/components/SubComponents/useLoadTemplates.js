// Functional component to handle the log-out function
// import React from "react";
import axios from "axios";
import { SET_TEMPLATES } from "../../store/actions";
import { useStoreContext } from "../../store/store";
import "../Sidebar/style.css";

export default useLoadTemplates = (id) => {
  const [/*state*/, dispatch] = useStoreContext();

  return (
      axios
        .get(`/api/templates/getallbyuser/${id}`)
        .then(response => {
          if (response.status === 200) {
            console.log("useLoadTemplates() has run:", response.data.templates);
            dispatch({ type: SET_TEMPLATES, templates: response.data.templates });
          }
        })
        .catch(error => {
          console.log({ message: error.message });
          console.log(error);
        });
  )
};
