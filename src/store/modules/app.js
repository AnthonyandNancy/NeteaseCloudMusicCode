
const getDefaultState = () => {
  return {
    keywords: null,
    ablum: null
  }
}

const state = getDefaultState()

const mutations = {

  SET_kEYWORDS: (state, keywords) => {
    state.keywords = keywords
  },
  SET_ALBUM: (state, id) => {
    state.ablum = id
  }

}

const actions = {
  // 热门列表选择歌曲
  chooseHotSong({ commit }, song) {
    // console.log('热门列表选择歌曲',song)
    commit('SET_kEYWORDS', song)
  },
  chooseAblum({ commit }, id) {
    commit('SET_ALBUM', id)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

