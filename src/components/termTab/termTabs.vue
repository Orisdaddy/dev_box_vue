<template>
  <div class="term-tabs">
    <Tabs v-if="tabs.length != 0" type="card" @on-tab-remove="handleTabRemove" :animated="false">
      <TabPane v-for="(i, index) in tabs" :key="i.label + i.type" :icon="icon(i.type)" :label="i.label" closable>
        <console v-if="i.type === 'console'" :session-id="i.id" :term-id="'console' + index"/>
        <sftp v-if="i.type === 'sftp'" :session-id="i.id"/>
      </TabPane>
    </Tabs>
    <div v-else>
      <a href="javascript:void(0)" @click="openDrawer">右侧开启会话</a>
    </div>
  </div>

</template>

<script>
  import Console from "views/machine/Child/console";
  import sftp from "views/machine/Child/sftp";
  export default {
    name: "termTabs",
    components: {
      Console,
      sftp
    },
    props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      handleTabRemove (index) {
        for (let i=0;i<this.tabs.length;i++) {
          let tabIndex = this.tabs[i].index
          if (index === tabIndex) {
            this.tabs.splice(i, 1)
          }
        }
      },


      openDrawer () {
        this.$emit('openDrawer', true)
      },

      icon(type) {
        if (type === 'console') {
          return 'ios-link'
        }else if (type === 'sftp') {
          return 'ios-document'
        }
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
