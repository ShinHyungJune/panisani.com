export const state = () => ({
    domain : process.env.NODE_ENV === "production" ? "https://api.whatpick.com" : "http://localhost",
    pop: null,
    latestCommunities: [],
})

export const mutations = {
  /*setToken (state) {
    state.token = state;
  },*/
    init(state){
        let latestCommunities = JSON.parse(localStorage.getItem("latestCommunities"));

        state.latestCommunities = latestCommunities ? latestCommunities : [];
    },

    setPop (state, data){
        state.pop = data;
    },

    addLatestCommunity(state, data){
        let communities = state.latestCommunities.filter(latestCommunity => latestCommunity.id != data.id);

        state.latestCommunities = [data, ...communities];

        localStorage.setItem("latestCommunities", JSON.stringify(state.latestCommunities));
    },

    removeLatestCommunity(state, data) {
        let communities = state.latestCommunities.filter(latestCommunity => latestCommunity.id != data.id);

        state.latestCommunities = communities;

        localStorage.setItem("latestCommunities", JSON.stringify(state.latestCommunities));
    }

}

