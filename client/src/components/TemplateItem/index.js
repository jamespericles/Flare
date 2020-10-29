// Component that maps through the templates in the db associated with the user and renders them
import React from "react";
import { useStoreContext } from "../../store/store";
import { IconContext } from "react-icons";
import { MdRemoveCircle } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { SET_TEMPLATES } from "../../store/actions";

export default function TemplateItem(props) {
  const [state, dispatch] = useStoreContext();

  const deleteItem = (uid, itemid) => {
    axios
      .delete(`/api/templates/delete/${uid}/${itemid}`)
      .then(response => {
        if (response.status === 200) {
          console.log("Successfully deleted.");
          loadTemplates();
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  };

  function loadTemplates() {
    axios
      .get(`/api/templates/getallbyuser/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadTemplates() from ListTemplates component has run:", response.data.templates);
          dispatch({ type: SET_TEMPLATES, templates: response.data.templates });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }

  return (
    <div>
      <Card templateid={props.template.id} className="mb-1" key={`template-${props.template.id}`}>
        <div className="row">
          <div className="col-10">
            &nbsp;
            <div className="small ml-2" style={{ lineHeight: "1" }}>
              <strong>{props.template.nickname}</strong>
            </div>
            <div className="small text-muted ml-4 mt-1 mb-2" style={{ lineHeight: "1", fontSize: "50%" }}>
              {props.template.val}
            </div>
          </div>
          <div className="col-1 pr-1">
            <Button
              variant="none"
              size="sm"
              style={{ textAlign: "right", marginBottom: "0", paddingBottom: "0" }}
              onClick={() => deleteItem(state.user.id, props.template.id)}
            >
              <IconContext.Provider
                value={{ size: "1em", style: { verticalAlign: "text-top", color: "black", textAlign: "right" } }}
              >
                <MdRemoveCircle />
              </IconContext.Provider>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
