// Component that maps through the templates in the db associated with the user and renders them
// provides filtering or viewing options for Groups by contact and groups by plan

// GROUP APIS:
// GET ALL BY USER: /api/groups/getallbyuser/${state.user.id}
// GET ALL BY CONTACT: /api/groups/getallbycontact/${state.user.id}/${state.contact.id}
// GET ALL GROUPS BY PLAN: /api/groups/getallbyplan/${state.user.id}/${state.plan.id}
// GET 1 GROUP BY GROUP NAME: /api/groups/getone/${state.user.id}/${state.group.groupname}
// ADD GROUP: /api/groups/add/${state.user.id}
// UPDATE GROUP: /api/groups/update/${state.user.id}/${state.group.id}
// DELETE GROUP: /api/groups/delete/${state.user.id}/${state.group.id}

// CONTACT APIS:
// GET ALL BY USER: /api/contacts/getall/${state.user.id}
// GET 1 CONTACT BY CONTACT NICKNAME: /api/contacts/getone/${state.user.id}/${state.contact.nickname}
// ADD CONTACT: /api/contacts/add/${state.user.id}
// UPDATE CONTACT: /api/contacts/update/${state.user.id}/${state.contact.id}
// DELETE CONTACT: /api/contacts/delete/${state.user.id}/${state.contact.id}

// PLAN APIS:
// GET ALL PLANS BY USER: /api/plans/getallbyuser/${state.user.id}
// GET ALL PLANS BY CONTACT: /api/plans/getallbycontact/${state.user.id}/${state.contact.id}
// GET ALL PLANS BY GROUP: /api/plans/getallbygroup/${state.user.id}/${state.group.id}
// GET A PLAN BASED ON USERID AND PLAN NAME: /api/plans/getone/${state.user.id}/${state.plan.planname}
// ADD A NEW PLAN: /api/plans/add/${state.user.id}
// UPDATE AN EXISTING PLAN: /api/plans/update/${state.user.id}/${state.plan.id}
// DELETE A PLAN: /api/plans/delete/${state.user.id}/${state.plan.id}

// TEMPLATE APIS:
// GET ALL TEMPLATES BY USER: /api/templates/getallbyuser/${state.user.id}
// GET ALL TEMPLATES BY USER AND CONTACT: /api/templates/getallbycontact/${state.user.id}/${state.contact.id}
// GET ALL TEMPLATES BY USER AND GROUP: /api/templates/getallbygroup/${state.user.id}/${state.group.id}
// GET ALL TEMPLATES BY USER & PLAN: /api/templates/getallbyplan/${state.user.id}/${state.plan.id}
// GET TEMPLATE BY TEMPLATE NICKNAME & USER ID: /api/templates/getone/${state.user.id}/${state.template.nickname}
// CREATE NEW TEMPLATE: /api/templates/add/${state.user.id}
// UPDATE TEMPLATE: /api/templates/update/${state.user.id}/${state.template.id}
// DELETE TEMPLATE: /api/templates/delete/${state.user.id}/${state.template.id}

