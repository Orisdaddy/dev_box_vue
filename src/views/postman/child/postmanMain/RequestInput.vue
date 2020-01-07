<template>
    <div class="tabs">
      <div v-if="!isLoad">
        <Tabs type="card">
          <TabPane label="Params">
            <params-table :type="'params'" @ParameterChange="paramsChange"></params-table>
          </TabPane>

          <TabPane label="Headers">
            <params-table :type="'header'" @ParameterChange="headersChange"></params-table>
          </TabPane>

          <TabPane label="Body">
            <json-editor :id="0" :json="$store.state.Postman.body" :allow-editor="true"></json-editor>
          </TabPane>
        </Tabs>
      </div>
      <div v-else>
        <loading class="load"/>
      </div>
    </div>

</template>
<script>
  import paramsTable from "./paramsTable";
  import JsonEditor from "./JsonEditor";
  import Loading from "components/loading/Loading";
  export default {
    name: "RequestInput",
    props:{
      isLoad: Boolean
    },
    methods: {
      paramsChange(v) {
        this.$store.state.Postman.params = v
      },
      headersChange(v) {
        this.$store.state.Postman.headers = v
      },
      ObjectToArray(obj) {
        let arr = []
        let i = 0
        Object.keys(obj).forEach(function (key) {
          i++
          arr.push({
            id: i,
            key: key,
            value: obj[key]
          })
        })
        return arr
      }
    },
    components: {
      paramsTable,
      JsonEditor,
      Loading
    }
  }
</script>
<style scoped>
  .tabs {
  }
  .tabs >>> .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
    border-radius: 0;
    background: #fff;
  }
  .tabs >>> .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
    border-top: 1px solid #3399ff;
  }
  .tabs >>> .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
  }
  .tabs >>> .ivu-table-cell {
    padding: 0;
  }
  .tabs >>> td[class^="ivu-table-column"] {
    height: 0;
  }
  .load >>> .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
