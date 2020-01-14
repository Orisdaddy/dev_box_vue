<template>
  <div>
    <Scroll height="294">
      <Row style="height: 100%">
        <Col span="1" style="height: 100%">
          <div class="line-num">
            <div class="num" v-for="i in num">{{i}}</div>
          </div>
        </Col>
        <Col span="23" style="height: 100%">
          <div class="content">
            <pre class="row" v-for="i in row" v-html="contents(i)"></pre>
          </div>
        </Col>
      </Row>
    </Scroll>
  </div>
</template>

<script>
  export default {
    name: "textArea",
    props: {
      text: String
    },
    computed: {
      row() {
        let str = this.text
        str = str.replace(/\r/gi,"");
        str = str.split("\n");
        return str
      },
      num() {
        let list = [1]
        for (let i=0;i<this.row.length;i++) {
          if (i >= 1) {
            list.push(i+1)
          }
        }
        return list
      }
    },
    methods: {
      contents(row) {
        const tags = row.match(/<[^/].*?>/)
        const endTags = row.match(/<\/.*?>/)

        if (tags) {
          tags[0] = tags[0].replace(/</, '')
          tags[0] = tags[0].replace(/>/, '')
          const rep = '<span class="html-tags"><</span>' +
              '<span class="html-tags">' + tags[0] + '</span>' +
              '<span class="html-tags">></span>'
          row = row.replace('<'+tags+'>', rep)
          const property = tags[0].match(/ .*?=".*?"/g)
          if (property) {
            for (let i of property) {
              const propertyKey = i.match(/ .*?=/)
              const propertyValue = i.match(/=".*?"/)
              const Key = propertyKey[0].substr(0, propertyKey[0].length - 1)
              const KeyRep = '<span class="property-key">' + Key + '</span>'
              const ValueRep = '<span class="property-value">' + propertyValue[0] + '</span>'
              row = row.replace(i, KeyRep + ValueRep)
            }
          }
        }
        if (endTags) {
          endTags[0] = endTags[0].replace(/<\//, '')
          endTags[0] = endTags[0].replace(/>/, '')
          const rep = '<span class="html-tags"><</span>' +
              '<span class="html-tags">/</span>'+
              '<span class="html-tags">' + endTags[0] + '</span>' +
              '<span class="html-tags">></span>'
          row = row.replace('</'+endTags+'>', rep)
        }
        // console.log(row);
        return row
      }
    }
  }
</script>

<style scoped>
  div >>> .ivu-scroll-content {
    /*height: 274px*/
    height: 100%
  }
  .line-num {
    background: rgb(235, 235, 235);
    height:100%;
  }
  .num {
    background: rgb(235, 235, 235);
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    height: 20px;
    line-height: 20px;
  }
  .content {
    background: rgb(250, 250, 250);
    border:1px solid #eaeaea;
    height:100%;
  }
  .row {
    margin: 0;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  .row >>> .html-tags {
    color: #3cab00!important;
  }
  .row >>> .property-key {
    color: red!important;
  }
  .row >>> .property-value {
    color: blue!important;
  }

</style>
