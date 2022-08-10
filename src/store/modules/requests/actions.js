export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const url = `https://vue-find-a-coach-cea8e-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newRequest),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to sent request");
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const url = `https://vue-find-a-coach-cea8e-default-rtdb.firebaseio.com/requests/${coachId}.json`;
    const response = await fetch(url);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch request"
      );
      throw error;
    }
    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
