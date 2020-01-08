<template>
  <div>
    <Input class="input" v-model="$store.state.Postman.host">
      <Select v-model="$store.state.Postman.method" slot="prepend" style="width:100px">
        <Option value="GET">GET</Option>
        <Option value="POST">POST</Option>
        <Option value="PUT">PUT</Option>
        <Option value="PATCH">PATCH</Option>
        <Option value="DELETE">DELETE</Option>
      </Select>
      <Button slot="append" type="primary" @click="Request">G O</Button>
    </Input>
  </div>
</template>

<script>
  import {prequest} from 'network/postmanReq'
  import {dataRequest} from 'network/dataRequest'
  export default {
    name: "UrlInput",
    data() {
      return {
        keyList: [],
      }
    },

    computed: {
      method() {
        return this.$store.state.Postman.method
      },
      host() {
        return this.$store.state.Postman.host
      },
      body() {
        return this.$store.state.Postman.body
      },
      headers() {
        return this.$store.state.Postman.headers
      },
      params() {
        return this.$store.state.Postman.params
      },
      completeUrl() {
        let url = this.$store.state.Postman.host
        if (url.substr(0, 7) === 'http://' || url.substr(0, 8) === 'https://') {
          return url
        }else {
          return 'http://' + url
        }
      }
    },
    methods: {
      addHistory(){
        dataRequest(
            '/postman/history/',
            'post',
            this.$store.state.User.token,
            {
              host: this.completeUrl,
              method: this.method,
              headers: this.headers,
              params: this.params,
              body: this.body,
            })
      },

      Request() {
        if (!this.host) {
          this.$Message.warning('必须填写请求地址')
          return
        }
          if (this.method === 'GET') {
              const conf = {
                url: this.completeUrl,
                method: this.method,
                headers: this.headers,
                params: this.params,
              }
              const time1 = new Date().getTime()
              // 打开载入气泡
              this.$emit('open')
              prequest(conf).then(res => {
                res['Times'] = new Date().getTime() - time1
                this.$emit('getRes', res)
                this.$store.state.isRequest = true
                this.$emit('close')
                if (this.$store.state.User.id) {
                  this.addHistory()
                }
              }).catch(res => {
                this.$emit('close')
                this.$Notice.error({
                  title: '请求失败,请检查网络或服务端',
                });
              })
          } else {
            const conf = {
              url: this.completeUrl,
              method: this.method,
              headers: this.headers,
              data: this.body
            }
            const time1 = new Date().getTime()
            this.$emit('open')
            prequest(conf).then(res => {
              res['Times'] = new Date().getTime() - time1
              this.$emit('getRes', res)
              this.$store.state.isRequest = true
              this.$emit('close')
              if (this.$store.state.User.id) {
                this.addHistory()
              }
            }).catch(res => {
              this.$Notice.error({
                title: '请求失败,请检查网络或服务端',
              });
              this.$emit('close')
            })
          }
        }
    }
  }
</script>

<style scoped>

</style>
