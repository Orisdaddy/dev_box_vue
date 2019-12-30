<template>
  <div>
    <Input class="input" v-model="Url">
      <Select v-model="method" slot="prepend"  style="width:100px">
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
  import {request} from 'network/postmanReq'
  export default {
    name: "UrlInput",
    props:{
      Params: {
        type: Array,
        default: function () {
          return []
        }
      },
      Headers: {
        type: Array,
        default: function () {
          return []
        }
      },
      Json: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        method: 'GET',
        Url: '',
        keyList: [],
      }
    },
    computed: {
      headers() {
        return this.ArrayToObject(this.Headers)
      },
      params() {
        return this.ArrayToObject(this.Params)
      },
      completeUrl() {
        if (this.Url.substr(0, 7) === 'http://' || this.Url.substr(0, 8) === 'https://') {
          return this.Url
        }else {
          return 'http://' + this.Url
        }
      }
    },
    methods: {
      ArrayToObject(arr) {
        const obj = {}
        for (let i of arr){
          obj[i.key] = i.value
        }
        return obj
      },

      isKeyRepeat(type) {
        const list = type === '请求头' ? this.Headers : this.Params
        for (let i of list) {
          this.keyList.push(i.key)
        }

        if ((new Set(this.keyList)).size != this.keyList.length) {
          this.$Message.warning(type + '中存在相同的键')
          this.keyList = []
          return false
        } else {
          this.keyList = []
          return true
        }
      },

      Request() {
        if (!this.Url) {
          this.$Message.warning('必须填写请求地址')
          return
        }
        if (this.isKeyRepeat('请求头')) {
          if (this.method === 'GET') {
            if (this.isKeyRepeat('参数')) {
              const conf = {
                url: this.completeUrl,
                method: this.method,
                headers: this.headers,
                params: this.params,
              }
              const time1 = new Date().getTime()
              // 打开载入气泡
              this.$emit('open')
              request(conf).then(res => {
                res['Times'] = new Date().getTime() - time1
                this.$emit('getRes', res)
                this.$store.state.isRequest = true
                this.$emit('close')
              }).catch(res => {
                this.$emit('close')
                this.$Notice.error({
                  title: '请求失败,请检查网络或服务端',
                });
              })
            }
          } else {
            const conf = {
              url: this.completeUrl,
              method: this.method,
              headers: this.headers,
              data: this.Json
            }
            const time1 = new Date().getTime()
            this.$emit('open')
            request(conf).then(res => {
              res['Times'] = new Date().getTime() - time1
              this.$emit('getRes', res)
              this.$store.state.isRequest = true
              this.$emit('close')
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
  }
</script>

<style scoped>

</style>
