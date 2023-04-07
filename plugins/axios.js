export default function ({ $axios, redirect, store }) {
    $axios.onError(error => {

        // store.commit("setFlash", error.message);

        if(error.response.status == 401)
            return null;

        if(error.response.status == 422)
            return store.commit("setPop", {
                title: "삐빅!",
                description: "입력값을 확인해주세요."
            });

        if(error.response.data && error.response.data.message)
            return store.commit("setPop", {
                title: "삐빅!",
                description: error.response.data.message
            });
    })
}
