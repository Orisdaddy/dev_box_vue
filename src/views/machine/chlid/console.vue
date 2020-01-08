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
        cursorPosition: 0,
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
        const msg = message.data

        const result = msg.replace(/.*?\r\n/, '\r\n')
        this.term.write(result)
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
        // 监听键盘按键
        const printable = !key.domEvent.altKey && !key.domEvent.ctrlKey && !key.domEvent.metaKey;
        const keyCode = key.domEvent.keyCode
        if (keyCode === 13) {
          // 监听回车
          this.sendCommon(this.common)
          this.common = ''
          this.cursorPosition = 0
        } else if (keyCode === 8) {
          // 监听退格
          if (this.common) {
            this.common = this.common.substr(0, this.common.length -1)
            this.term.write('\b \b');
            this.cursorPosition--
          }
        } else if (keyCode === 38 || keyCode === 40) {
          // 监听上下方向键
          return
        }else if (keyCode === 37) {
          // 监听左方向键
          if (this.cursorPosition <= 0) {
            return
          }else {
            this.term.write(key.key);
            this.cursorPosition--
          }
        }else if (keyCode === 39) {
          // 监听右方向键
          if (this.cursorPosition >= this.common.length) {
            return
          }else {
            this.term.write(key.key);
            this.cursorPosition++
          }
        } else if (printable) {
          // 监听其余键
          const common0 = this.common.slice(0, this.cursorPosition)
          const common1 = this.common.slice(this.cursorPosition)
          this.common = common0 + key.key + common1
          this.cursorPosition++
          let back = ""
          for (let i of common1) {
            back += "[D"
          }
          this.term.write(key.key + common1 + back);
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
