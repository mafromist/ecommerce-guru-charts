import fetchData from "@/utils/fetchData";

export default {
  namespaced: true,
  state: {
    marketplaceName: "",
    storeId: ""
  },
  getters:{},
  mutations: {
    setUserInfo(state, userInfo) {
      state.marketplaceName = userInfo.marketplaceName;
      state.storeId = userInfo.storeId;
    }
  },
  actions: {
    async fetchUserInfo({commit, rootState}) {
      try {

        const userEmail = rootState.auth.email;
        const accessToken = rootState.auth.accessToken;

        console.log("User Email:", userEmail);
        console.log("Access Token:", accessToken);
        const response = await fetchData.get("/user/user-information", {
          email: {
            email: userEmail
          },
          headers: {
            Authorization: `Bearer ${rootState.auth.accessToken}`
          }
        });
        console.log("User Information Response:", response.data);

        commit("setUserInfo", response.data);
      } catch(error) {
        console.error(error);
      }
    }
  }
}