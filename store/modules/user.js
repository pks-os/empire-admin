const state = () => ({
    login: false,
    userInfo: {
        id: 0,
        name: {
            full_name: null,
            first: null,
            last: null
        },
        email: null,
        permissions: [],
        token: null
    }
});

const mutations = {
    login(state,userData){
        state.login = true;
        state.userInfo = userData;
    },
    logout(){
        state.userInfo = {
            id: 0,
            name: {
                full_name: null,
                first: null,
                last: null
            },
            email: null,
            permissions: [],
            token: null
        };
        state.login = false;
    }
};

const getters = {
    getLogin(state,getters,rootState){
        return state.login
    },
    getUser(state){
        return state.userInfo
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}