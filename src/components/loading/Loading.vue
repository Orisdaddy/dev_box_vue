<template>
  <div class="spin-main">
    <Spin>
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Going</div>
    </Spin>
  </div>
</template>

<script>
  export default {
    name: "Loading"
  }
</script>

<style scoped>
  .spin-main{
    position: relative;
    height: 312px;
  }
  .spin-main >>> .ivu-spin-text {
    position: relative;
    top: 130px;
  }
</style>
