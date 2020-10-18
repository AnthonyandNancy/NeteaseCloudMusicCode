
const getDefaultState = () => {
  return {
    storeHotSong: null
  }
}

const state = getDefaultState()

const mutations = {

  SET_STOREHOTSONG: (state, storeHotSong) => {
    state.storeHotSong = storeHotSong
  }

}

const actions = {
  // 热门列表选择歌曲
  chooseHotSong({ commit }, song) {
    // console.log('热门列表选择歌曲',song)
    commit('SET_STOREHOTSONG', song)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

