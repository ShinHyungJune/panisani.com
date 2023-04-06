export const state = () => ({
    domain : process.env.NODE_ENV === "production" ? "https://api.whatpick.com" : "http://localhost",
    pop: null
})

export const mutations = {
  /*setToken (state) {
    state.token = state;
  },*/

    setPop (state, data){
        state.pop = data;
    }

}

