
const getDefaultState = () => {
  return {
    keywords: null,
    ablum: null,
    singerID: null,
    songId: null,
    watchMusicTime: '00:00',
    idindex: 0,
    idList: [],
    songSheetID: 5058038668
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
  },
  SET_MUSICTIME: (state, time) => {
    state.watchMusicTime = time
  },
  SET_INDEX: (state, val) => {
    state.idindex = val
  },
  SET_IDLIST: (state, val) => {
    state.idList = val
  },
  SET_SONGSHEETID: (state, val) => {
    state.songSheetID = val
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
    // const list = []
    // list.push(id)
    // console.log('list',list,id)
    commit('SET_SONG', id)
  },
  watchMusicTime({ commit }, time) {
    // const list = []
    // list.push(id)
    // console.log('list',list,id)
    commit('SET_MUSICTIME', time)
  },
  setIndex({ commit }, val) {
    commit('SET_INDEX', val)
  },
  setIdList({ commit }, val) {
    // console.log(val)val
    commit('SET_IDLIST', val)
  },
  setSongSheetID({ commit }, val) {
    console.log(val)
    commit('SET_SONGSHEETID', val)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

