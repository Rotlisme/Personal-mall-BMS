import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        //填充用于管理状态的共享变量
        isCollapse: true,
        width: 200
    },
    mutations: {
        increment(state) {
            state.isCollapse = !state.isCollapse;
            state.width = state.isCollapse ? 200 : 0
        }
    },
    actions: {
        increment(context) {
            console.log(context);
            context.commit("increment");
        }
    },
    getters: {
        isCollapse(state) {
            console.log(state.isCollapse);
            return state.isCollapse;
        },
        width() {
            return state.width;
        }
    }
})