export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const url = `https://vue-find-a-coach-cea8e-default-rtdb.firebaseio.com/coaches/${userId}.json`;
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(coachData),
    });

    // const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || "Failed to fetch!");
      throw error;
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context) {
    const url = `https://vue-find-a-coach-cea8e-default-rtdb.firebaseio.com/coaches.json`;
    const response = await fetch(url);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit("setCoaches", coaches);
  },
};

// https://vue-find-a-coach-cea8e-default-rtdb.firebaseio.com/
