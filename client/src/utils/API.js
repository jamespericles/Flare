import axios from "axios";

export default {
  // Gets all groups by user
  getGroupsByUser: function(uid) {
    return axios.get(`/api/groups/getallbyuser/${uid}`);
  },
  // Gets all groups by contact
  getGroupsByContact: function(uid,cid) {
    return axios.get(`/api/groups/getallbycontact/${uid}/${cid}`);
  },
  // Gets all groups by plan
  getGroupsByPlan: function(uid,pid) {
    return axios.get(`/api/groups/getallbyplan/${uid}/${pid}`);
  },
  // Gets one group by groupname
  getGroupByName: function(uid,gname) {
    return axios.get(`/api/groups/getone/${uid}/${gname}`);
  },
  // Add group
  addGroup: function(uid) {
    return axios.post(`/api/groups/add/${uid}`);
  },
  // Update group
  updateGroup: function(uid, gid) {
    return axios.put(`/api/groups/update/${uid}/${gid}`);
  },
  // Delete group
  deleteGroup: function(uid, gid) {
    return axios.delete(`/api/groups/delete/${uid}/${gid}`);
  },
  // Gets all CONTACTS by user
  getContactsByUser: function(uid) {
    return axios.get(`/api/contacts/getall/${uid}`);
  },
  // Gets one CONTACT by nickname
  getContactByNickname: function(uid, nname) {
    return axios.get(`/api/contacts/getone/${uid}/${nname}`);
  },
  // Add a CONTACT
  addContact: function(uid) {
    return axios.post(`/api/contacts/add/${uid}`);
  },
  // Update a CONTACT
  updateContact: function(uid, cid) {
    return axios.put(`/api/contacts/update/${uid}/${cid}`);
  },
  // Delete a CONTACT
  deleteContact: function(uid, cid) {
    return axios.delete(`/api/contacts/delete/${uid}/${cid}`);
  },
  // Gets all PLANS by user
  getPlansByUser: function(uid) {
    return axios.get(`/api/plans/getallbyuser/${uid}`);
  },
  // Gets all groups by user
  getPlansByContact: function(uid, cid) {
    return axios.get(`/api/plans/getallbycontact/${uid}/${cid}`);
  },
  // Gets all plans by group
  getPlansByGroup: function(uid, gid) {
    return axios.get(`/api/plans/getallbygroup/${uid}/${gid}`);
  },
  // Gets a Plan by its Planname
  getPlanByPlanname: function(uid, pname) {
    return axios.get(`/api/plans/getone/${uid}/${pname}`);
  },
  // Add Plan
  addPlan: function(uid) {
    return axios.post(`/api/plans/add/${uid}`);
  },
  // Update Plan
  updatePlan: function(uid, pid) {
    return axios.put(`/api/plans/update/${uid}/${pid}`);
  },
  // Delete Plan
  deletePlan: function(uid, pid) {
    return axios.delete(`/api/plans/delete/${uid}/${pid}`);
  },
  // Gets all TEMPLATES by user id
  getTemplatesByUser: function(uid) {
    return axios.get(`/api/templates/getallbyuser/${uid}`);
  },
  // Gets all TEMPLATES by contact
  getTemplatesByContact: function(uid, cid) {
    return axios.get(`/api/templates/getallbycontact/${uid}/${cid}`);
  },
  // Gets all TEMPLATES by group
  getTemplatesByGroup: function(uid, gid) {
    return axios.get(`/api/templates/getallbygroup/${uid}/${gid}`);
  },
  // Gets all TEMPLATES by Plan
  getTemplatesByPlan: function(uid, pid) {
    return axios.get(`/api/templates/getallbyplan/${uid}/${pid}`);
  },
  // Gets a Template by Template Nickname
  getTemplateByNickname: function(uid, tname) {
    return axios.get(`/api/templates/getone/${uid}/${tname}`);
  },
  // Add new Template
  addTemplate: function(uid) {
    return axios.post(`/api/templates/add/${uid}`);
  },
  // Update Template
  updateTemplate: function(uid, tid) {
    return axios.put(`/api/templates/update/${uid}/${tid}`);
  },
  // Delete Template
  deleteTemplate: function(uid, tid) {
    return axios.delete(`/api/templates/delete/${uid}/${tid}`);
  }
};