<template>
  <div v-if="$store.state.User.token" class="machine-main">
    <term-tabs :tabs="tabs" @openDrawer="DrawerSwitch"/>
    <machine-list :switch="Switch" @closeDrawer="DrawerSwitch" @startSession="startSession"/>
    <div class="drawer-switch" @click="DrawerSwitch(true)">
      <icon type="md-list"/>
    </div>
  </div>
  <div class="machine-main" v-else>
    <a href="javascript:void(0)" @click="goLogin">请登录</a>
  </div>
</template>

<script>
  import machineList from "./chlid/machineList";
  import termTabs from "components/termTab/termTabs";
  export default {
    name: "Machine",
    components: {
      machineList,
      termTabs
    },
    data() {
      return {
        Switch: false,
        tabs: []
      }
    },
    methods: {
      DrawerSwitch(bool) {
        this.Switch = bool
      },

      startSession(obj) {
        for (let i of this.tabs) {
          if (obj.id === i.id) {
            obj.count = i.count + 1
            if (obj.count === 1) {
              obj.label = obj.label + '(' + obj.count +')'
            }else if (obj.count > 1) {
              obj.label = obj.label.replace(/\(\d.*\)/, '(' + obj.count + ')')
            }
          }
        }
        this.tabs.push(obj)
      },

      goLogin() {
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
</script>

<style scoped>
  .machine-main {
   margin: 20px 20px;
  }
  .drawer-switch {
    cursor: pointer;
    text-align: center;
    position: fixed;
    top: 50%;
    right: 0;
    width: 20px;
    height: 100px;
    line-height: 100px;
    background-color: #e1e1e1;
    border: #b9b9b9 1px solid;
    border-radius: 2px;
  }
</style>
