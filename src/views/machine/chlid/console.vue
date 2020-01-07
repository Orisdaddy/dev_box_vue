<template>
  <div>
    <div :id="termId"></div>
  </div>
</template>

<script>
  import {Terminal} from 'xterm'
  import 'xterm/css/xterm.css'

  export default {
    name: 'console',
    props: {
      sessionId: Number,
      termId: String
    },
    data() {
      return {
        common: '',
        header: '[hello world]',
        ws: null,
        term: null,
      }
    },
    methods: {
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
        if (msg.mode === 'login') {
          if (msg.status === 'error') {
            this.$Message.error('账户密码错误')
            this.header = '[LOGIN ERROR]'
          }else {
            this.header = '[' + msg.data.username + '@' + msg.data.hostname + ' ~]#'
            this.term.write(this.header)
          }

        }else if (msg.mode === 'common') {
          this.term.write('\r\n' + msg.data)
          this.term.write('\r\n'+this.header);
        }
      },

      sendCommon(common) {
        const commonInfo = JSON.stringify({
          mode: 'common',
          data: common
        })
        this.ws.send(commonInfo)
      }

    },
    mounted() {
      this.ws = new WebSocket('ws://127.0.0.1:8000/ws/server/' + this.sessionId + '@' + new Date().getTime())
      this.ws.onopen = this.open
      this.ws.onerror = this.error
      this.ws.onmessage = this.receive
      this.ws.onclose = this.close

      this.term = new Terminal({
        cols: 120,
        rows: 50,
        scrollback:1000,
        cursorBlink: true,
      })
      this.term.open(document.getElementById(this.termId))
      this.term.onKey((key) => {
        const printable = !key.domEvent.altKey && !key.domEvent.ctrlKey && !key.domEvent.metaKey;
        if (key.domEvent.keyCode === 13) {
          this.sendCommon(this.common)
          this.common = ''
        } else if (key.domEvent.keyCode === 8) {
          if (this.common) {
            this.common = this.common.substr(0, this.common.length -1)
            this.term.write('\b \b');
          }
        } else if (printable) {
          this.common += key.key
          this.term.write(key.key);
        }
      })
    },

    beforeDestroy() {
      this.ws.close()
    }

  }

</script>

<style>
</style>
