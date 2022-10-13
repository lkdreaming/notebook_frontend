<template>
  <div>
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
                  <li><a href="#">登出</a></li>
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
import Button from '../../button/Button'

// console.log('11111' + this.tokenData)

// this.$(document).ready(function() {
//   console.log('11111' + this.tokenData)
// })

let tokeData = JSON.parse(localStorage.getItem('tokenData'))
export default {
  name: 'Head',
  components: {Button},
  data: function () {
    return {
      username: tokeData.name,
      user_head_img_url: tokeData.userHeadImageUrl,
      hidden: false
    }
  }
}
</script>

<style scoped>
.logo {
  height: 100%;
  background: #354144;
  color: white;
}
.dropdown-list {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 20px;
  overflow: hidden;
  transition: 0.3s;
}

.dropdown-item {
  border-style: dashed;
}
</style>
