// Component that maps through the contacts in the db associated with the user and renders them
import React, { useEffect } from "react";
import { useStoreContext } from "../../store/store";
import { SET_GROUPS } from "../../store/actions";
import { Link } from "react-router-dom";
import axios from "axios";
import GroupItem from "../GroupItem";

const ListGroups = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    loadGroups();
  }, [state.groups, dispatch, state.user.id]);

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
      <div className="groupitem">
        <ul>
          {state.groups !== null && state.groups.length > 0 ? (
            state.groups.map(group => {
              return <GroupItem group={group} />;
            })
          ) : (
            <p className="small">
              You don't have any groups yet. <Link to="/groups">Get Started!</Link>
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListGroups;
