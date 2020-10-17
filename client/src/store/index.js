import { createStore } from "redux";
import store from "./store";

export default createStore(store);
export { saveGroup, saveTemplate, savePlan, saveContact, deleteGroup, deleteTemplate, deletePlan, deleteContact } from "./actionCreators";