<template>
  <div>
    <vue-json-editor :class="{'hidden': !display}" v-model="Json" :allowEditor="allowEditor" :show-btns="false" :mode="'code'" :exapndedOnStart="true" @json-change="JsonChange"/>
    <text-area v-if="Id === 1" id="html-text" :text="Json" :class="{'text-area':true, 'hidden': display}"></text-area>
  </div>
</template>

<script>
  import vueJsonEditor from 'components/jsonEditor/vue-json-editor'
  import textArea from "components/textArea/textArea";

  export default{
    props:{
      allowEditor: Boolean,
      Json: {
        type: [String, Object],
        default: function () {
          return {}
        }
      },
      Id: Number
    },
    data() {
      return {
      }
    },
    components: {
      vueJsonEditor,
      textArea
    },
    computed: {
      mode() {
        if (typeof this.Json === "object") {
          return 'code'
        }else if (typeof this.Json === "string") {
          return 'text'
        }
      },

      display() {
        if (typeof this.Json === "object") {
          return  true
        }else if (typeof this.Json === "string") {
          return  false
        }
      }
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
  .hidden {
    display: none;
  }
  .jsoneditor {
    border: #dcdee2 1px solid!important;
  }
  .jsoneditor-outer {
    height: 263px!important;
    padding-top: 0!important;
    margin-top: 0!important;
  }
  .text-area {
    width: 1050px;
    height: 294px;
  }
</style>
