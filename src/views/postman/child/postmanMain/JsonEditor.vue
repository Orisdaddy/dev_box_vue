<template>
  <div>
    <vue-json-editor v-model="Json" :allowEditor="allowEditor" :show-btns="false" :mode="'code'" :exapndedOnStart="true" @json-change="JsonChange"></vue-json-editor>
<!--    <vue-json-editor v-else v-model="json" :allowEditor="allowEditor" :show-btns="false" :mode="'code'" :exapndedOnStart="true" @json-change="JsonChange"></vue-json-editor>-->
  </div>
</template>

<script>
  import vueJsonEditor from 'components/jsonEditor/vue-json-editor'

  export default{
    props:{
      allowEditor: Boolean,
      Json: {
        type: Object,
        default: function () {
          return {}
        }
      },
      Id: Number
    },

    components: {
      vueJsonEditor
    },

    methods: {
      JsonChange(v) {
        this.$store.state.Postman.body = v
      },
    },
    mounted() {
      const menu = document.getElementsByClassName('jsoneditor-menu')
      const statusbar = document.getElementsByClassName('jsoneditor-statusbar')
      const jsoneditor = document.getElementsByClassName('jsoneditor')
      jsoneditor[this.Id].removeChild(menu[0])
      jsoneditor[this.Id].removeChild(statusbar[0])
    }
  }
</script>

<style>
  .jsoneditor {
    border: #dcdee2 1px solid!important;
  }
  .jsoneditor-outer {
    height: 263px!important;
    padding-top: 0!important;
    margin-top: 0!important;
  }
</style>
