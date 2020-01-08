<template>
  <div>
    <List border>
      <ListItem class="list-item">
        <div>历史</div>
        <template slot="extra">
          <div><a href="javascript:void(0)" @click="deleteAllHistory">清空</a></div>
        </template>

      </ListItem>
      <Scroll height="750">
        <ListItem v-if="historyList" v-for="(i, index) in historyList" class="list-item" :key="i.id">
          <a href="javascript:void(0)" @click="getHistory(i.id)">
            <div :class="['method', i.method]">{{i.method}} </div>
            <div class="url">{{i.host | Ellipsis}}</div>
          </a>
          <template slot="extra">
            <div class="extra">
              <a href="javascript:void(0)" @click="deleteHistory(i.id, index)"><Icon type="md-trash"/></a>
              <div class="little">
                {{i.date_time | dateTime}}
              </div>
            </div>
          </template>
        </ListItem>
        <ListItem v-else>
          无历史记录
        </ListItem>
      </Scroll>

    </List>
  </div>
</template>

<script>
  import {dataRequest} from "network/dataRequest";

  export default {
    name: "history",
    data() {
      return {
        historyList: []
      }
    },
    methods: {
      deleteAllHistory() {
        dataRequest(
            '/postman/history_list',
            'delete',
            this.$store.state.User.token
        ).then(res => {
          this.historyList.splice(0)
          this.$Message.success('清空')
        }).catch(res => {
          this.$Message.warning('清空失败')
        })
      },

      deleteHistory(id, index) {
        dataRequest(
            '/postman/history/' + id,
            'delete',
            this.$store.state.User.token
        ).then(res => {
          this.historyList.splice(index, 1)
          this.$Message.success('删除')
        }).catch(res => {
          this.$Message.warning('删除失败')
        })
      },
      getHistory(id) {
        this.$emit('reqHistory', id)
      }
    },
    filters: {
      Ellipsis(v) {
        if (v.length >= 35) {
          return v.substr(0, 35) + '...'
        }
        return v
      },
      dateTime(time) {
        return new Date(time).toLocaleString('chinese', {hour12: false}).replace('/', "-").replace("/", "-")
      }
    },
    mounted() {
      dataRequest(
          '/postman/history_list',
          'get',
          this.$store.state.User.token
      ).then(res => {
        this.historyList = res.reverse()
      })
    }
  }
</script>

<style scoped>
  .list-item{
    display: flex;
    justify-content: space-between;
  }
  .little {
    font-size: 10px;
    color: rgba(100,100,100,0.5);
  }
  .extra {
    text-align: right;
  }
  .method {
    width: 50px;
  }
  .url {
    width: 150px;
  }
  .GET {
    color: green;
  }
  .POST {
    color: orange;
  }
  .PUT {
    color: cyan;
  }
  .PATCH {
    color: blue;
  }
  .DELETE {
    color: red;
  }
</style>
