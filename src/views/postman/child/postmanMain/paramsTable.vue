<template>
  <div>
    <Table border height="231" ref="selection" :columns="columns" :data="params" @on-select="select" @on-select-cancel="selectCancel">
    </Table>
    <div class="new-row"><a href="javascript:void(0)" @click="newRow"><Icon type="md-add"/> New Row</a></div>
  </div>
</template>

<script>
  export default {
    name: "paramsTable",
    props: {
      type: String
    },
    computed: {
      Params() {
        if (this.type === 'header') {
          return this.$store.state.Postman.headers_array
        }else {
          return this.$store.state.Postman.params_array
        }

      }
    },
    watch: {
      Params(nv, ov) {
        this.params = nv
      },
      updateParams(nv, ov) {
        this.$emit('ParameterChange', this.ArrayToObject(nv))
      }
    },
    data() {
      return {
        updateParams: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'Key',
            key: 'key',
            align:'center',
            render: (h, p) => {
              const {id, key} = p.row
              const inp = h('input', {
                style: {
                  width: '100%',
                  padding: '4px 2px',
                  border: '1px solid #e9eaec',
                },
                domProps: {
                  value: key
                },
                on: {
                  input: (event) => {
                    this.params[id].key = event.target.value
                    this.updateParams.splice(0)
                  }
                }
              })
              return inp
            }
          },
          {
            title: 'Value',
            key: 'value',
            align:'center',
            render: (h, p) => {
              const {id, value} = p.row
              const inp = h('input', {
                style: {
                  width: '100%',
                  padding: '4px 2px',
                  border: '1px solid #e9eaec',
                },
                domProps: {
                  value: value
                },
                on: {
                  input: (event) => {
                    this.params[id].value = event.target.value
                    this.updateParams.splice(0)
                  }
                }
              })
              return inp
            }
          }
        ],
        params: [
          {
            id: 0,
            key: '',
            value: '',
          },
        ]
      }
    },
    methods: {
      ArrayToObject(arr) {
        let obj = {}
        for (let i of arr) {
          obj[i.key] = i.value
        }
        return obj
      },

      newRow() {
        const lastID = this.params[this.params.length-1].id
        this.params.push({
          id: lastID + 1,
          key: '',
          value: ''
        })
        this.updateParams.splice(0)
      },

      select(selection, row) {
        if (row.key){
          this.updateParams.push(row)
        }
      },

      selectCancel(selection, row) {
        const index = this.updateParams.findIndex(item => item.id === row.id)
        this.updateParams.splice(index, 1)
      }
    }
  }
</script>

<style scoped>
  .new-row {
    background-color: #ebebeb;
    width: 100%;
    height: 32px;
    text-align: center;
    line-height: 32px;
  }
</style>

