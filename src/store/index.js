import {createStore} from 'vuex'
import {usersCollection} from "@/firebase";

export default createStore({
    state: {
        user: null,
        fireUser: null,
        google: false
    },
    getters: {
        user(state) {
            return state.user
        },
        fireUser(state) {
            return state.fireUser
        },
        google(state) {
            return state.google
        }
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data
        },
        SET_FIRE_USER(state, data) {
            state.fireUser = data
        },
        SET_GOOGLE(state, data) {
            state.google = data
        }
    },
    actions: {
        fetchUser({commit}, user) {
            if (!user) {
                commit('SET_FIRE_USER', null)
                commit('SET_USER', null)
                return
            }
            commit('SET_USER', user)
        },
        async getUser({commit}, user) {
            if (user) {
                const snap = await usersCollection.doc(user.uid).get()
                commit('SET_FIRE_USER', snap.data())
            } else {
                commit('SET_FIRE_USER', user)
            }
        }
    },
    modules: {}
})
