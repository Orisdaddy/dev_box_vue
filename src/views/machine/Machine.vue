<template>
  <div class="machine-main">
    <term-tabs :tabs="tabs" @openDrawer="DrawerSwitch"/>
    <machine-list :switch="Switch" @closeDrawer="DrawerSwitch" @startSession="startSession"/>
    <div class="drawer-switch" @click="DrawerSwitch(true)">
      <icon type="md-list"/>
    </div>
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
        this.tabs.push(obj)
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
