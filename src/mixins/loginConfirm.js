export default {
  methods: {
    // 是否需要弹登陆确认框
    // 需要 返回true 并直接弹出登陆确认框
    // 不需要 返回false
    loginConfirm () {
      // 判断用户是否登录
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
