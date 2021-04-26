export const state = () => ({
  ipAddress: '',
})

export const mutations = {
  setIpAddress(state, newIpAddress) {
    state.ipAddress = newIpAddress
  },
}

export const getters = {
  getIpAddress(state) {
    return state.ipAddress
  },
}
