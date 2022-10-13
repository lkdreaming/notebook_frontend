<template>
  <div id="login_box">
    <h2>LOGIN</h2>
    <div id="input_box">
      <input type="text" placeholder="请输入用户名" v-model="phone">
    </div>
    <div class="input_box">
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <button @click="login">登录</button>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  mounted() {
    console.log(new Date().getTime())
  },
  methods: {
    login: function () {
      this.axios
        .post('/user/doLogin', {
          'phone': this.phone,
          'password': this.password
        })
        .then(response => {
          console.log(response.data)
          let success = response.data.success
          if (success) {
            localStorage.setItem('token', response.data.data.Authorization)
            localStorage.setItem('tokenExpireTimeStamp', response.data.data.tokenExpireTimeStamp)
            localStorage.setItem('RefreshedToken', response.data.data.RefreshedToken)
            localStorage.setItem('tokenData', JSON.stringify(response.data.data.tokenData))
            this.$router.push('/edit')
          } else {
            alert(response.data.errorMessage)
          }
        })
        // .then(response => (console.log(response)))
        // .then(response => (localStorage.setItem('token', response.data.data.token)))
        // .then(response => (this.$router.push('/edit')))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    }
  }
}
</script>

<style>
body {
  background: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg') no-repeat;
  background-size: 100% 130%;
}

#login_box {
  width: 40%;
  height: 400px;
  background-color: #00000060;
  margin: auto;
  margin-top: 10%;
  text-align: center;
  border-radius: 10px;
  padding: 50px 50px;
}

h2 {
  color: #ffffff90;
  margin-top: 5%;
}

#input-box {
  margin-top: 5%;
}

span {
  color: #fff;
}

input {
  border: 0;
  width: 60%;
  font-size: 15px;
  color: #fff;
  background: transparent;
  border-bottom: 2px solid #fff;
  padding: 5px 10px;
  outline: none;
  margin-top: 10px;
}

button {
  margin-top: 50px;
  width: 60%;
  height: 30px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  background-image: linear-gradient(to right, #30cfd0, #330867);
}

#sign_up {
  margin-top: 45%;
  margin-left: 60%;
}

a {
  color: #b94648;
}
</style>
