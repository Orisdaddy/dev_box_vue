<template>
  <Table border :columns="columns" :data="Data"></Table>
</template>

<script>
  export default {
    name: "HeaderTable",
    props: {
      Data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        columns: [
          {
            title: 'Key',
            key: 'key',
            align:'center'
          },
          {
            title: 'Value',
            key: 'value',
            align:'center'
          }
        ],
      }
    }
  }
</script>

<style scoped>

</style>
