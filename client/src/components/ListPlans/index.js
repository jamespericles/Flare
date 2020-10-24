// Component that maps through the plans in the db associated with the user and renders them
import React, { useEffect } from "react";
import { useStoreContext } from "../../store/store";
import { SET_PLANS } from "../../store/actions";
import PlanItem from "../PlanItem";
import { Link } from "react-router-dom";
import axios from "axios";

const ListPlans = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    axios
      .get(`/api/plans/getallbyuser/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadPlans() from ListPlans component has run:", response.data.plans);
          dispatch({ type: SET_PLANS, plans: response.data.plans });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }, [dispatch, state.user.id]);

  // function loadPlans() {
  //   axios
  //     .get(`/api/plans/getallbyuser/${state.user.id}`)
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log("loadPlans() from ListPlans component has run:", response.data.plans);
  //         dispatch({ type: SET_PLANS, plans: response.data.plans });
  //       }
  //     })
  //     .catch(error => {
  //       console.log({ message: error.message });
  //       console.log(error);
  //     });
  // }

  // const deleteItem = (uid, itemid) => {
  //   axios
  //     .delete(`/api/plans/delete/${uid}/${itemid}`)
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log("Successfully deleted.");
  //         loadPlans();
  //       }
  //     })
  //     .catch(error => {
  //       console.log({ message: error.message });
  //       console.log(error);
  //     });
  // };

  return (
    <div>
      <div className="planitem">
        <ul>
          {state.plans !== null && state.plans.length > 0 ? (
            state.plans.map((plan, i) => {
              return <PlanItem plan={plan} />;
            })
          ) : (
            <p className="small">
              Let's prep your flares. <Link to="/plans">Create a plan now!</Link>
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListPlans;
