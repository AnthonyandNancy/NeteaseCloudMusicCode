export default {
  data () {
    return {
      pagingInfo: {
        current_page: 1,
        total: 0,
        last_page: 1,
        per_page: 10
      }
    }
  },
  methods: {
    handleSizeChange (val) {

    },
    handleCurrentChange (val, func) {
      this.pagingInfo.current_page = val
      func()
      console.log(`当前页: ${val}`)
    }
  }
}
