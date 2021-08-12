export const state = () => ({
  device: {
    ua: {},
    isSp: false
  }
})

export const mutations = {
  updateDeviceState(state, device) {
    state.device.ua = device.ua
    state.device.isSp = device.isSp
  }
}

export const getters = {
  isPc(state) {
    return !state.device.isSp
  },
  isIe(state) {
    return state.device.ua.isIE === undefined ? false : state.device.ua.isIE
  },
  isIe11(state) {
    if (state.device.ua.isIE === undefined) {
      return false
    }

    return state.device.ua.isIE && state.device.ua.version === '11.0'
  }
}
