<!--根据iview-ui封装-->
<template>
  <div class="login-page">
    <Input class="input" v-model="username" placeholder="用户名" />
    <Input class="input" v-model="password" type="password" password placeholder="密码"/>
    <Row class="input">
      <Col span="12">
        <Input v-model="captcha" placeholder="验证码" ></Input>
      </Col>
      <Col span="12">
        <img @click="ChangeCaptcha" class="captcha" :src="captchaImg" alt="">
      </Col>
    </Row>
    <Button class="input" type="primary" @click="Login">登录</Button>
  </div>
</template>

<script>
  import {request} from 'network/request'
  import crypto from "crypto";

  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: '',
        captcha: '',
        captchaCode: '',
        captchaImg: ''
      }
    },
    methods: {
      VerifyForm() {
        if(this.username === '') {
          this.$Message.warning('请输入用户名')
          return false
        }else if(this.password === '') {
          this.$Message.warning('请输入密码')
          return false
        }else if(this.captcha === '') {
          this.$Message.warning('请输入验证码')
          return false
        }
        return true
      },
      Login() {
        const sha256 = crypto.createHash('sha256');
        sha256.update(this.password);
        const password = sha256.digest("hex")

        if(this.VerifyForm()){
          request({
            url: '/user/login',
            method: 'post',
            data: {
              username: this.username,
              password: password,
              captcha: this.captcha,
              captcha_code: this.captchaCode
            }
          }).then(res => {
            if(res.code === 1000) {
              this.$Message.success(res.msg)
              this.$store.commit('saveUser', res.data)
              this.$router.push({path: '/home'})
            }else {
              this.$Message.warning(res.msg)
            }
          })
        }
      },
      ChangeCaptcha() {
        request({
          url: '/user/captcha'
        }).then(res => {
          this.captchaImg = 'data:image/png;base64,' + res.data.img
          this.captchaCode = res.data.captcha_code
        })
      }
    },
    mounted() {
      this.ChangeCaptcha()
    },
  }
</script>

<style scoped>
  .login-page {
    margin: 15% 35%;
  }
  .input {
    margin: 10px 0;
  }
  .captcha{
    margin-left: 10px;
    width: 100%;
    height: 32px;
  }
</style>
