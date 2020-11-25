import {createStore} from 'vuex'
import {usersCollection} from "@/firebase";

export default createStore({
    state: {
        user: null,
        fireUser: null
    },
    getters: {
        user(state) {
            return state.user
        },
        fireUser(state) {
            return state.fireUser
        }
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data
        },
        SET_FIRE_USER(state, data) {
            state.fireUser = data
        }
    },
    actions: {
        fetchUser({commit}, user) {
            if (!user) {
                commit('SET_FIRE_USER', null)
            }
            commit('SET_USER', user)
        },
        async getUser({commit}, user) {
            console.log(user.uid)
            const snap = await usersCollection.doc(user.uid).get()
            console.log('getUser', snap.data())
            commit('SET_FIRE_USER', snap.data())
        }
    },
    modules: {}
})
