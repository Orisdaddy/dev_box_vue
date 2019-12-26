<template>
  <Menu mode="horizontal" :theme="theme" active-name="home"  @on-select="navRedirect">
    <Row>
      <Col span="22">
        <MenuItem name="home">
          <Icon type="ios-home" />
          首页
        </MenuItem>
        <MenuItem name="postman">
          <Icon type="ios-git-network" />
          模拟请求工具
        </MenuItem>
        <MenuItem name="markdown">
          <Icon type="ios-bookmarks" />
          在线文档
        </MenuItem>
        <MenuItem name="machine">
          <Icon type="ios-desktop"/>
          设备管理
        </MenuItem>
      </Col>
      <Col span="2">
        <MenuItem v-if="!username" name="login">
          登录
        </MenuItem>
        <MenuItem v-else>
          {{username}}
        </MenuItem>
      </Col>
    </Row>
  </Menu>
</template>
<script>
  export default {
    data () {
      return {
        theme: 'dark',
        username: this.$store.state.User.username
      }
    },
    methods: {
      navRedirect(name) {
        const location = {path: '/' + name}
        this.$router.push(location)
      },
    }
  }
</script>

<style>
  .right {

  }
</style>
