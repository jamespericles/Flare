// Component that maps through the templates in the db associated with the user and renders them
// import React, { useEffect, useState } from "react";
import React from "react";
import { useStoreContext } from "../../store/store";
import { IconContext } from "react-icons";
import { MdRemoveCircle } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { SET_GROUPS } from "../../store/actions";

export default function GroupItem(props) {
  const [state, dispatch] = useStoreContext();

  const deleteItem = (uid, itemid) => {
    axios
      .delete(`/api/groups/delete/${uid}/${itemid}`)
      .then(response => {
        if (response.status === 200) {
          console.log("Successfully deleted.");
          loadGroups();
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  };

  function loadGroups() {
    axios
      .get(`/api/groups/getallbyuser/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadgroups() from ListGroups component has run:", response.data.groups);
          dispatch({ type: SET_GROUPS, groups: response.data.groups });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }

  return (
    <div>
      <Card groupid={props.group.id} className="mb-1" key={`group-${props.group.id}`}>
        <div className="row">
          <div className="col-10">
            &nbsp;
            <small>
              <strong>{props.group.groupname}</strong>
            </small>
          </div>
          <div className="col-1 pr-1">
            <Button
              variant="none"
              size="sm"
              style={{ textAlign: "right", marginBottom: "0", paddingBottom: "0" }}
              onClick={() => deleteItem(state.user.id, props.group.id)}
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
