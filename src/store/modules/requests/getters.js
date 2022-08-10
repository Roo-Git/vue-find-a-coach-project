export default {
  requests(state, getters, rootState, rootGetters) {
    console.log(getters, rootState);
    const coachId = rootGetters.userId;
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequests(state, getters) {
    console.log(state);
    return getters.requests && getters.requests.length > 0;
  },
};
