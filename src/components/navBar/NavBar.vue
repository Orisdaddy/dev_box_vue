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
          <Icon type="ios-desktop" />
          设备管理
        </MenuItem>
        <Submenu name="">
          <template slot="title">
            <Icon type="ios-buffer" />
            数据库管理
          </template>
          <MenuGroup title="SQL">
            <MenuItem name="3-1">mysql</MenuItem>
          </MenuGroup>
          <MenuGroup title="NO SQL">
            <MenuItem name="3-4">redis</MenuItem>
          </MenuGroup>
        </Submenu>
      </Col>
      <Col span="2">
        <MenuItem v-if="this.$store.state.User.username" name="home">
          {{$store.state.User.username}}
        </MenuItem>
        <MenuItem v-else name="login">
          登录
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
