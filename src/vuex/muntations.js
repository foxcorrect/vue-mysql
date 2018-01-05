import Vue from 'vue'
export const inc = state => {
    state.count = state.count + 5
}
export const dec = state => {
    state.count = state.count - 3
}