import { GROUPS, TEMPLATES, PLANS, CONTACTS } from "./dataTypes";
// import { STORE, UPDATE, DELETE } from "./actions";

let idCounter = 100;

// SAVE/UPDATE ACTION CREATORS PER DATA TYPE
export const saveGroup = (group) => {
    return createSaveEvent(GROUPS, group);
}
export const saveTemplate = (template) => {
    return createSaveEvent(TEMPLATES, template);
}
export const savePlan = (plan) => {
    return createSaveEvent(PLANS, plan);
}
export const saveContact = (contact) => {
    return createSaveEvent(CONTACTS, contact);
}

// Universal createSaveEvent function to either STORE a new one of the dataType
// if there's no existing id, or UPDATE the existing entry 
const createSaveEvent = (dataType, payload) => {
    if(!payload.id) {
        return {
            // type: STORE,
            dataType: dataType,
            payload: { ...payload, id: idCounter++ }
        }
    } else {
        return {
            // type: UPDATE,
            dataType: dataType,
            payload: payload
        }
    }
}

// DELETE ACTION CREATORS PER DATA TYPE
export const deleteGroup = (group) => ({
    // type: DELETE,
    dataType: GROUPS,
    payload: group.id
})
export const deleteTemplate = (template) => ({
    // type: DELETE,
    dataType: TEMPLATES,
    payload: template.id
})
export const deletePlan = (plan) => ({
    // type: DELETE,
    dataType: PLANS,
    payload: plan.id
})
export const deleteContact = (contact) => ({
    // type: DELETE,
    dataType: CONTACTS,
    payload: contact.id
})