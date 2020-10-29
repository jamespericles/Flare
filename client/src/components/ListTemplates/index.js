// Component that maps through the templates in the db associated with the user and renders them
import React, { useEffect, useState } from "react";
import { useStoreContext } from "../../store/store";
import { SET_TEMPLATES } from "../../store/actions";
import { Link } from "react-router-dom";
// import axios from "axios";
import TemplateItem from "../TemplateItem";

const ListTemplates = () => {
  const [state, dispatch] = useStoreContext();
  const [currTemplates, setCurrTemplates] = useState(state.templates);

  useEffect(() => {
    if (currTemplates !== state.templates) {
      dispatch({ type: SET_TEMPLATES, templates: currTemplates });
      setCurrTemplates(currTemplates);
    }
  }, [state.user.id, dispatch, currTemplates]);

  // function loadTemplates() {
  //   axios
  //     .get(`/api/templates/getallbyuser/${state.user.id}`)
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log("loadTemplates() from ListTemplates component has run:", response.data.templates);
  //         dispatch({ type: SET_TEMPLATES, templates: response.data.templates });
  //       }
  //     })
  //     .catch(error => {
  //       console.log({ message: error.message });
  //       console.log(error);
  //     });
  // }

  return (
    <div>
      <div className="templateitem">
        <ul>
          {state.templates !== null && state.templates.length > 0 ? (
            state.templates.map((template, i) => {
              return <TemplateItem key={`template-${template.id}`} template={template} />;
            })
          ) : (
            <p className="small">
              <Link to="/templates">Create a template</Link> and send a message when you need to the most.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListTemplates;
