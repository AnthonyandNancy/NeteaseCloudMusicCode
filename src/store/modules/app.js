
const getDefaultState = () => {
  return {
    keywords: null,
    ablum: null,
    singerID:null,
    songId:null
  }
}

const state = getDefaultState()

const mutations = {

  SET_kEYWORDS: (state, keywords) => {
    state.keywords = keywords
  },
  SET_ALBUM: (state, id) => {
    state.ablum = id
  },
  SET_SINGER: (state, id) => {
    state.singerID = id
  },
  SET_SONG: (state, id) => {
    state.songId = id
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
  },
  chooseSinger({ commit }, id) {
    commit('SET_SINGER', id)
  },
  chooseSong({ commit }, id) {
    commit('SET_SONG', id)
  }


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

