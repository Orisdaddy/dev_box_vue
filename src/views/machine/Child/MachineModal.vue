<template>
  <Modal title="添加连接设备" v-model="value" @on-cancel="Close" @on-ok="Add">
    <Input class="input" prefix="md-desktop" placeholder="HOST" v-model="connectInfo.host"></Input>
    <Input class="input" prefix="md-attach" placeholder="会话名称" v-model="connectInfo.alias"></Input>
    <Input class="input" prefix="md-contact" placeholder="登录用户名" v-model="connectInfo.username"></Input>
    <Input class="input" prefix="md-key" password placeholder="登录密码" type="password" v-model="connectInfo.password"></Input>
  </Modal>
</template>

<script>
  export default {
    name: "MachineModal",
    props: {
      Switch: Boolean,
      connectInfo: {
        type: Object,
        default() {
          return {
            host: '',
            alias: '',
            username: '',
            password: '',
          }
        }
      }
    },
    watch:{
      Switch(){
        this.value = this.Switch
      }
    },
    data() {
      return {
        value: false,
      }
    },
    methods: {
      Close() {
        this.$emit('closeModal', false)
      },
      Add() {
        this.$emit('closeModal', false)
        this.$emit('GetMachineInfo', this.connectInfo)
      }
    }
  }
</script>

<style scoped>
  .input {
    margin: 10px 0;
  }
</style>
