export const state = () => ({
  gsm: [],
  fiber: [],
  displayGSM: true,
  displayFiber: true
})

export const mutations = {
  ADD_GSM(state, list) {
    list.forEach(element => {
      let existAlready = state.gsm.find(value =>
        value._id === element._id
      )
      if (!existAlready) {
        state.gsm.push(element)
      }
    });
  },
  ADD_FIBER(state, list) {
    list.forEach(element => {
      let existAlready = state.gsm.find(value =>
        value._id === element._id
      )
      if (!existAlready) {
        state.fiber.push(element)
      }
    });
  },
  TOOGLE_GSM(state) {
    state.displayGSM = !state.displayGSM
  },
  TOOGLE_FIBER(state) {
    state.displayFiber = !state.displayFiber
  }
}

export const actions = {
  async getGSM({
    commit
  }, {
    x,
    y
  }) {
    let response = await this.$axios.get('/gsm/' + y + '/' + x)
    commit('ADD_GSM', response.data)
  },
  async getFiber({
    commit
  }) {
    let response = await this.$axios.get('/fiber/' + y + '/' + x)
    commit('ADD_FIBER', response.data)
  },
  toggleGSM({
    commit
  }) {
    commit('TOOGLE_GSM')
  },
  toogleFiber({
    commit
  }) {
    commit('TOOGLE_FIBER')
  }
}
