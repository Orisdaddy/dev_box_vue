<template>
  <div>
    <Drawer title="设备列表" v-model="value" @on-close="closeDrawer">
      <List>
        <ListItem>
          <a href="javascript:void(0)" @click="AddModalSwitch(true)"><icon type="md-add"/>新增会话</a>
        </ListItem>
        <ListItem v-for="(i, index) in sessionList" :key="index" class="list-item">
          <div>
            <div class="machine-title">
              {{i.alias?i.alias:i.host}}
            </div>
            <div class="machine-host">
              {{i.host}}
            </div>
          </div>
          <template slot="extra">
            <a href="javascript:void(0)" title="连接" class="machine-icon" @click="startSession(i.id, i.alias?i.alias:i.host)"><icon type="ios-link"></icon></a>
            <a href="javascript:void(0)" title="传输" class="machine-icon" @click="startTransform(i.id, i.alias?i.alias:i.host)"><icon type="ios-document"></icon></a>
            <a href="javascript:void(0)" title="修改" class="machine-icon" @click="getSessionInfoAndUpdateModalSwitch(i.id, true)"><icon type="md-build"></icon></a>
            <a href="javascript:void(0)" title="删除" class="machine-icon" @click="deleteSession(i.id, index)"><icon type="md-trash"></icon></a>
          </template>
        </ListItem>
      </List>
    </Drawer>
    <machine-modal :switch="addModalSwitch" @closeModal="AddModalSwitch" @GetMachineInfo="AddSession"/>
    <machine-modal :connect-info="connectInfo" :switch="updateModalSwitch" @closeModal="UpdateModalSwitch" @GetMachineInfo="updateSession"/>
  </div>
</template>

<script>
  import {dataRequest} from "network/dataRequest";
  import MachineModal from "./MachineModal";
  export default {
    name: "machineList",
    props: {
      Switch: Boolean
    },
    components: {
      MachineModal
    },
    data() {
      return {
        value: false,
        addModalSwitch: false,
        updateModalSwitch: false,
        sessionList: [],
        connectInfo: {}
      }
    },
    watch:{
      Switch(){
        this.value = this.Switch
      }
    },
    methods: {
      closeDrawer() {
        this.$emit('closeDrawer', false)
      },

      AddModalSwitch(bool) {
        this.addModalSwitch = bool
      },

      getSessionInfo(id) {
        dataRequest(
            '/machine/session/' + id,
            'get',
            this.$store.state.User.token
        ).then(res => {
          this.connectInfo = res
        })
      },

      UpdateModalSwitch(bool) {
        this.updateModalSwitch = bool
      },

      getSessionInfoAndUpdateModalSwitch(id, bool) {
        this.getSessionInfo(id)
        this.UpdateModalSwitch(bool)
      },

      AddSession(info) {
        dataRequest(
            '/machine/session/',
            'post',
            this.$store.state.User.token,
            info
        ).then(res => {
          const data = res.data
          if (res.code === 1000) {
            this.sessionList.push({
              id: data.id,
              host: data.host,
              alias: data.alias,
            })
            const name = data.alias?data.alias:data.host
            this.$Message.success('添加会话' + name)
          }else {
            Object.keys(data).forEach(key => {
              this.$Message.error(
                  key + data[key]
              )
            })
          }

        })
      },


      startSession(id, label) {
        this.closeDrawer()
        this.$emit('startSession', {
          id: id,
          label: label,
          type: 'console',
          count: 0
        })
      },

      updateSession(info) {
        const id = info.id
        delete info['id']
        dataRequest(
            '/machine/session/' + id,
            'put',
            this.$store.state.User.token,
            info
        ).then(res => {
          const data = res.data
          if (res.code === 1000) {
            for (let i=0;i<this.sessionList.length;i++) {
              if (this.sessionList[i].id === data.id) {
                this.sessionList[i].host = data.host
                this.sessionList[i].alias = data.alias
                this.$Message.success('修改会话成功')
              }
            }
          }else {
            Object.keys(data).forEach(key => {
              this.$Message.error(
                  key + data[key]
              )
            })
          }
        })
      },

      deleteSession(id, index) {
        dataRequest(
            '/machine/session/' + id,
            'delete',
            this.$store.state.User.token
        ).then(res => {
          this.sessionList.splice(index, 1)
          this.$Message.success('删除会话成功')
        })
      },

      startTransform(id, label) {
        this.closeDrawer()
        this.$emit('startSession', {
          id: id,
          label: label,
          type: 'sftp',
          count: 0
        })
      }
    },
    mounted() {
      dataRequest(
          '/machine/session_list',
          'get',
          this.$store.state.User.token
      ).then(res => {
        this.sessionList = res
      })
    }
  }
</script>

<style scoped>
  .list-item {
    display: flex;
    justify-content: space-between;
  }
  .machine-title {
    font-weight: 600;
  }
  .machine-host {
    font-size: 12px;
    color: rgba(90, 90, 90, 0.5);
  }
  .machine-icon {
    margin: 0 5px;
  }
</style>
