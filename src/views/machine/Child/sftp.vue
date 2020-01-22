<template>
  <div class="sftp-main">
    <div>
      <Select v-model="path" @on-change="DirList">
        <Option v-for="(i, index) in rootPath" :value="i" :key="index">{{i}}</Option>
      </Select>
      <div class="tool-bar">
        <div style="margin-right: 20px">
          <Button size="small" @click="Back" :disabled="backStack.length === 0"><Icon type="md-arrow-dropleft" /></Button>
          <Button size="small" @click="Forward" :disabled="forwardStack.length === 0"><Icon type="md-arrow-dropright" /></Button>
        </div>
        <Checkbox v-model="isShowHiddenFiles">显示隐藏文件</Checkbox>
      </div>
    </div>
    <div class="file-list">
      <Table :loading="loading" highlight-row height="550" :columns="Columns" :data="fileData" @on-row-click="onRowClick" @on-row-dblclick="onRowDbClick"></Table>
    </div>
    <div class="operation-bar">
      <div>
        <Upload :before-upload="UploadFile" action="">
          <Button icon="ios-cloud-upload-outline">上传文件</Button>
          <div v-for="i in uploadList">{{i.name | Ellipsis(10)}}
            <div>
              <Spin v-if="i.status === 'loading'"><Icon type="ios-loading" class="spin-icon-load"></Icon>上传中..</Spin>
              <Spin v-if="i.status === 'success'" style="color: #3cab00"><Icon type="ios-checkmark-circle"></Icon>上传完成</Spin>
              <Spin v-if="i.status === 'fail'" style="color: red"><Icon type="ios-close-circle"></Icon>上传失败</Spin>
            </div>
          </div>
        </Upload>

      </div>

      <div>
        <Button icon="ios-cloud-download-outline" @click="downloadFile">下载文件</Button>
        <div v-for="i in downloadList">{{i.name | Ellipsis(10)}}
          <div>
            <Spin v-if="i.status === 'loading'"><Icon type="ios-loading" class="spin-icon-load"></Icon>下载中..</Spin>
            <Spin v-if="i.status === 'success'" style="color: green"><Icon type="ios-checkmark-circle"></Icon>下载完成</Spin>
            <Spin v-if="i.status === 'fail'" style="color: red"><Icon type="ios-close-circle"></Icon>下载失败</Spin>
          </div>
        </div>
      </div>

      <Button icon="ios-cloud-download-outline" @click="deleteFile">删除文件</Button>
    </div>
  </div>
</template>

<script>
  import {ws} from 'network/ws'
  import { saveAs } from 'file-saver';

  export default {
    name: "sftp",

    props: {
      sessionId: Number
    },

    data() {
      return{
        ws: null,
        tab: '',
        chooseFile: {},
        path: '/',
        nowPath: '/',
        rootPath: ['/'],
        isShowHiddenFiles: false,
        loading: true,
        backStack: [],
        forwardStack: [],
        uploadList: [],
        downloadList: [],


        allFileData: [],

        Columns: [
          {
            title: 'name',
            key: 'name',
            render: (h, p) => {
              const {name, type} = p.row
              let icon_type =''
              if (type === 'd') {
                icon_type = 'ios-folder'
              }else if (type === '-') {
                icon_type = 'ios-document'
              }else {
                icon_type = 'ios-copy'
              }
              const icon = h('Icon', {
                props: {
                  type: icon_type
                }
              })
              const content = h('div', [
                  icon,
                  h('span', {
                    style: {
                      marginLeft: '10px'
                    },
                    domProps: {
                      innerText: name
                    },
                  })
              ])
              return content
            }
          },
          {
            title: 'size',
            key: 'size',
            width: 100
          },
        ]
      }
    },
    computed: {
      fileData() {
        if (this.isShowHiddenFiles) {
          return this.allFileData
        }else {
          let list = []
          for (let i of this.allFileData) {
            if (i.name.substr(0, 1) != ".") {
              list.push(i)
            }
          }
          return list
        }
      }
    },
    watch: {
      path(now, old) {
        this.rootPath.splice(0,1)
        this.rootPath.unshift(now)
      }
    },
    methods: {
      Forward() {
        const path = this.forwardStack.splice(this.forwardStack.length-1, 1)[0]
        this.backStack.push(this.path)
        this.path = path
        this.nowPath = path
        this.getDirList(this.path)
      },
      Back() {
        const path = this.backStack.splice(this.backStack.length-1, 1)[0]
        this.forwardStack.push(this.path)
        this.path = path
        this.nowPath = path
        this.getDirList(this.path)
      },
      onRowClick(data, index) {
        this.chooseFile = {
          type: data.type,
          name: data.name,
          path: this.path + '/' + data.name
        }
      },

      onRowDbClick(data, index) {
        if (data.type === 'd') {
          const path = (this.path==='/'? this.path:this.path+'/') + data.name
          this.backStack.push(this.path)
          this.path = path
          this.nowPath = path
          this.forwardStack = []
          this.getDirList(path)
        }else {
          this.chooseFile = {
            type: data.type,
            name: data.name,
            path: this.path + '/' + data.name
          }
        }

      },

      deleteFile() {
        const info = {
          mode: 'delete',
          path: this.chooseFile.path,
          name: this.chooseFile.name,
          type: this.chooseFile.type
        }
        this.ws.send(JSON.stringify(info))
      },

      UploadFile(file) {
        if (file) {
          // let formData = new window.FormData()
          let fileReader = new FileReader()
          const that = this
          fileReader.onloadend = function () {
            const content = window.btoa(fileReader.result)
            const info = {
              'type': 'd',
              'mode': 'upload_file',
              'size': file.size,
              'name': file.name,
              'path': (that.path==='/'? that.path:that.path+'/') + file.name,
              'content': content
            }
            that.uploadList.push({
              name: file.name,
              status: 'loading'
            })
            that.ws.send(JSON.stringify(info))
          }
          fileReader.readAsBinaryString(file);
          return false
        }
      },

      uploadFolder() {
        console.log(this.$refs.folder.files);
      },

      downloadFile() {
        const info = {
          mode: 'download',
          path: this.chooseFile.path,
          name: this.chooseFile.name,
          type: this.chooseFile.type
        }
        this.downloadList.push({
          name: this.chooseFile.name,
          status: 'loading'
        })
        this.ws.send(JSON.stringify(info))
      },

      DirList(path) {
        this.backStack.push(this.nowPath)
        this.nowPath = path
        this.forwardStack = []
        this.getDirList(path)
      },

      getDirList(path) {
        const msg = {
          mode: 'dir_list',
          path: path
        }
        this.loading = true
        this.ws.send(JSON.stringify(msg))
      },

      open(e) {
        this.$Notice.success({
          title: '主机连接成功'
        })
      },

      close(e) {
        console.log('断开连接');
      },

      error(e) {
        this.$Notice.error({
          title: '主机连接出错'
        })
      },

      receive(message) {
        const msg = JSON.parse(message.data)
        if (msg.mode === 'root_dir') {
          // const result = msg.msg.replace(/.*?\r\n/, '\r\n')
          for (let i of msg.files) {
            this.rootPath.push('/' + i)
          }
        }else if (msg.mode === 'dir_list') {
          this.allFileData = msg.files
          this.loading = false
        }else if (msg.mode === 'upload_file') {
          if (msg.status === true) {
            for (let i of this.uploadList){
              if (i.name === msg.name) {
                i.status = 'success'
                this.deferRemoveObj(this.uploadList, i)
              }
            }
          }else{
            for (let i of this.uploadList){
              if (i.name === msg.name) {
                i.status = 'fail'
                this.deferRemoveObj(this.uploadList, i)
              }
            }
          }
        }else if (msg.mode === 'download') {
          function Base64UrlToBytes(base64Str) {
            let bytes = window.atob(base64Str);
            let ab = new ArrayBuffer(bytes.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
              ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab]);
          }
          const blob = Base64UrlToBytes(msg.content)
          const file = new File([blob], msg.name, {type: "text/plain;charset=utf-8", lastModified: Date.now()})
          for (let i of this.downloadList){
            if (i.name === msg.name) {
              i.status = 'success'
              this.deferRemoveObj(this.downloadList, i)
            }
          }
          saveAs(file)
        }else if(msg.mode === 'delete') {
          if (msg.status === true) {
            this.$Message.success(msg.name + '删除')
            this.getDirList(this.path)
          }else {
            this.$Message.error(msg.name + '删除失败')
          }
        }else if (msg.mode === 'other') {
          this.$Notice.warning({
            title: msg.msg
          })
        }
      },

      deferRemoveObj(_arr, _obj) {
        setTimeout(function () {
          let length = _arr.length;
          for (let i = 0; i < length; i++) {
            if (_arr[i] == _obj) {
              if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
              }
              else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
              }
              else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
              }
            }
          }
        }, 5000)
      },


    },

    mounted() {
      this.tab = this.sessionId + '@' + new Date().getTime()
      this.ws = ws('sftp', this.tab)
      this.ws.onopen = this.open
      this.ws.onerror = this.error
      this.ws.onmessage = this.receive
      this.ws.onclose = this.close
      const that = this
      this.ws.addEventListener('open', function () {
        that.ws.send(JSON.stringify({
          'mode': 'root_dir',
        }))
        that.getDirList('/')
      })
    }
  }
</script>

<style scoped>
  .sftp-main {
    margin: 100px 200px;
    width: 700px
  }
  .tool-bar {
    margin-top: 10px;
    display: flex;
    height: 26px;
    line-height: 26px;
  }
  .file-list {
    margin: 20px 0;
  }
  .operation-bar {
    display: flex;
    justify-content: space-between;
  }

  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
