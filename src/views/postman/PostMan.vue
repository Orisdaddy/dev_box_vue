<template>
  <div class="postman">
    <Row>
      <Col span="18">
        <postman-main/>
      </Col>
      <Col span="6">
        <div v-if="$store.state.User.token">
          <history @reqHistory="reqHistory"/>
        </div>
        <div v-else>
          未登录
        </div>
      </Col>
    </Row>

  </div>
</template>

<script>
  import PostmanMain from "./child/postmanMain/PostmanMain";
  import History from "./child/History";
  import {dataRequest} from "network/dataRequest";

  export default {
    name: "PostMan",
    methods: {
      ObjectToArray(obj) {
        let arr = []
        let i = 0
        Object.keys(obj).forEach(function (key) {
          arr.push({
            id: i,
            key: key,
            value: obj[key]
          })
          i++
        })
        return arr
      },

      reqHistory(id) {
        dataRequest(
            '/postman/history/' + id,
            'get',
            this.$store.state.User.token
        ).then(res => {
          res['params'] = JSON.parse(res['params'])
          res['body'] = JSON.parse(res['body'])
          res['headers'] = JSON.parse(res['headers'])
          const ha = Object.keys(res['headers'])
          const pa = Object.keys(res['params'])
          if (ha.length == 0) {
            res['headers_array'] = [{
              id: 0,
              key: '',
              value: '',
            }]
          }else {
            res['headers_array'] = this.ObjectToArray(res['headers'])
          }
          if (pa.length == 0) {
            res['params_array'] = [{
              id: 0,
              key: '',
              value: '',
            }]
          }else {
            res['params_array'] = this.ObjectToArray(res['params'])
          }
          this.$store.state.Postman = res
        })
      }
    },
    components: {
      PostmanMain,
      History
    }
  }
</script>

<style scoped>
  .postman {
    padding: 50px 80px;
  }
</style>
