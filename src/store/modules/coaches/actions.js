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
      // error ...
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
};

// https://vue-find-a-coach-cea8e-default-rtdb.firebaseio.com/
