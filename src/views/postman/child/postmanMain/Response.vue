<template>
  <div>
    <div v-if="$store.state.isRequest">
      <div :class="[Status, 'status']">
        <h2 style="color: black">Response</h2>
        <div>
          <span class="bs">Status:</span>{{res.status}} {{res.statusText}}
          <span class="bs">Time:</span>{{res.Times}}ms
        </div>
      </div>
      <Tabs type="card">
        <TabPane label="Body">
          <json-editor :id="1" :json="res.data" :allow-editor="false"/>
        </TabPane>

        <TabPane label="Headers">
          <header-table :Data="Headers"/>
        </TabPane>

      </Tabs>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
  import JsonEditor from "./JsonEditor";
  import HeaderTable from "components/table/headerTable";
  export default {
    name: "Response",
    props: {
      res: Object,
    },
    computed: {
      Headers() {
        const obj = this.res.headers
        let arr = []
        Object.keys(obj).forEach(function (key) {
          arr.push({
            key: key,
            value: obj[key]
          })
        })
        return arr
      },

      Status() {
        const status = this.res.status
        if (200 <= status < 300) {
          return 'success'
        } else if (300 <= status < 400) {
          return 'redirect'
        }else if (400 <= status) {
          return 'error'
        }
      }
    },
    components: {
      JsonEditor,
      HeaderTable
    }
  }
</script>

<style scoped>
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  .redirect {
    color: orange;
  }
  .status {
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
  }
  .status > div{
    display: flex;
    align-items: flex-end;
  }
  .bs {
    color: black;
    font-weight: 600;
    margin-left: 10px;
  }
</style>
