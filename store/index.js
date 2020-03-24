export const state = () => ({
  gsm: {
    "type": "FeatureCollection",
    "features": []
  },
  fiber: {
    "type": "FeatureCollection",
    "features": []
  },
  displayGSM: true,
  displayFiber: true
})

export const mutations = {
  ADD_GSM(state, list) {
    list.forEach(element => {
      let existAlready = state.gsm.features.find(value =>
        value._id === element._id
      )
      if (!existAlready) {
        state.gsm.features.push(element)
      }
    });
  },
  ADD_FIBER(state, list) {
    list.forEach(element => {
      let existAlready = state.gsm.features.find(value =>
        value._id === element._id
      )
      if (!existAlready) {
        state.fiber.features.push(element)
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
    y,
    z
  }) {
    if (z >= 13) {
      let response = await this.$axios.get('/gsm/' + x + '/' + y)
      commit('ADD_GSM', response.data)
    }
  },
  async getFiber({
    commit
  }, {
    x,
    y,
    z
  }) {
    if (z >= 16) {
      let response = await this.$axios.get('/fiber/' + x + '/' + y)
      commit('ADD_FIBER', response.data)
    }
  },
  toggleGSM({
    commit
  }) {
    commit('TOOGLE_GSM')
  },
  toggleFiber({
    commit
  }) {
    commit('TOOGLE_FIBER')
  }
}
