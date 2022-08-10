export default {
  contactCoach(context, payload) {
    const newRequest = {
      id: "r1",
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    context.commit("addRequest", newRequest);
  },
};
