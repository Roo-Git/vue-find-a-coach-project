export default {
  login() {},
  async signup(context, payload) {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    const API_KEY = "AIzaSyBkSDnHqNnHHrb0W1gBYp8fZ0wt1BDlsFA";
    const response = await fetch(`${url}${API_KEY}`, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to authenticate."
      );
      throw error;
    }

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

// AIzaSyBkSDnHqNnHHrb0W1gBYp8fZ0wt1BDlsFA
