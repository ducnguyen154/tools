import Vue from 'vue'

Vue.filter('numberFormat', (value) => {
  return parseInt(value)
    .toFixed(0)
    .toString()
    .replace(/(\d)(?=(\d{3})+\b)/g, '$1.')
})
