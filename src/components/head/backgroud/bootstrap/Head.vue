<template>
  <div v-if="isShow" id="app">
    <div class="row">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="col-lg-10 navbar-header">
            <a class="navbar-brand" href="#">
              <img class="logo" alt="Brand" src="https://ops-web-ui-bj.oss-cn-beijing.aliyuncs.com/index.png">
            </a>
          </div>
          <div class="col-lg-2">
            <div class="right dropdown">
              <div class="row">
                <button id="head"
                        class="btn btn-default dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        type="button"
                >
                  <img alt="" class="img-circle" :src="user_head_img_url" width="65px" height="60px"/>
                  <span style="color: #FFFFFF;font-size: 15px">
                    <i style="color: #2c3e50">{{ username }}</i>
                  </span>
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li><a href="#">个人信息</a></li>
                  <li><a href="#" @click="logout">登出</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

  </div>
</template>

<script>
// // 引入jQuery、bootstrap
// import $ from 'jquery'
import 'bootstrap'
//
// // 引入bootstrap样式
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'Head',
  data: function () {
    return {
      isShow: false,
      username: '',
      user_head_img_url: '',
      hidden: false
    }
  },
  methods: {
    async logout() {
      console.log('logout')
      await this.axios
        .post('/user/doLogout')
        .then(() => {
          localStorage.clear()
          this.$router.push('/login')
          this.$router.go(0)
        })
    }
  },
  mounted() {
    this.$nextTick(function () {
      let tokenData = JSON.parse(localStorage.getItem('tokenData'))
      if (tokenData) {
        this.username = tokenData.name
        this.user_head_img_url = tokenData.userHeadImageUrl
      }
      this.isShow = localStorage.getItem('tokenData') != null
    })
  }
}
</script>

<style scoped>
.logo {
  height: 100%;
  background: #354144;
  color: white;
}

</style>
