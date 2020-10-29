// Component that maps through the plans in the db associated with the user and renders them
import React, { useEffect, useState } from "react";
import { useStoreContext } from "../../store/store";
import { SET_PLANS } from "../../store/actions";
import PlanItem from "../PlanItem";
import { Link } from "react-router-dom";
// import axios from "axios";

const ListPlans = () => {
  const [state, dispatch] = useStoreContext();
  const [currPlans, setCurrPlans] = useState(state.plans);

  useEffect(() => {
    if (currPlans !== state.plans) {
      dispatch({ type: SET_PLANS, plans: currPlans });
      setCurrPlans(currPlans);
    }
  }, [state.user.id, dispatch, currPlans]);

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

  return (
    <div>
      <div className="planitem">
        <ul>
          {state.plans !== null && state.plans.length > 0 ? (
            state.plans.map((plan, i) => {
              return <PlanItem key={`plan-${plan.id}`} plan={plan} />;
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
