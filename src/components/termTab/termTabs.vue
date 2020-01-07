<template>
  <div class="term-tabs">
    <Tabs v-if="tabs.length != 0" type="card" @on-tab-remove="handleTabRemove" :animated="false">
      <TabPane v-for="(i, index) in tabs" :key="index" :label="i.label" closable>
        <console :session-id="i.id" :term-id="'console' + index"/>
      </TabPane>
    </Tabs>
    <div v-else>
      <a href="javascript:void(0)" @click="openDrawer">右侧开启会话</a>
    </div>
  </div>

</template>

<script>
  import console from "views/machine/chlid/console";
  import termTest from "views/termTest";
  export default {
    name: "termTabs",
    components: {
      console,
      termTest
    },
    props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      handleTabRemove (name) {
        this.tabs.splice(index, 1)
      },

      openDrawer () {
        this.$emit('openDrawer', true)
      }
    }
  }
</script>

<style scoped>
 .term-tabs >>> .ivu-icon-md-add {
   margin-right: 0!important;
 }
 .term-tabs >>> .ivu-icon-md-add:hover{
   color: #1D8CE0!important;
 }
  .term-tabs >>> .ivu-tabs-tab-disabled {
    color: black;
    pointer-events: auto;
  }
</style>
