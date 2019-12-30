<template>
  <div class="postman-main">
    <url-input @getRes="getRes" @close="closeLoading" @open="openLoading" class="views" :params="Params" :headers="Headers" :Json="Json"/>
    <h2>Request</h2>
    <request-input class="views" :is-load="isLoad" :params="Params" :headers="Headers" @jsonChange="jsonChange"/>
    <response :res="response" class="views"/>
  </div>
</template>

<script>
  import RequestInput from "./RequestInput";
  import UrlInput from "./UrlInput";
  import Response from "./Response";
  export default {
    name: "PostmanMain",
    data() {
      return {
        Params: [],
        Headers: [],
        Json: {},
        response:{},
        isLoad: false
      }
    },
    components: {
      RequestInput,
      UrlInput,
      Response
    },
    methods: {
      jsonChange(v) {
        this.Json = v
      },
      getRes(res) {
        this.response = res
      },
      openLoading() {
        this.isLoad = true
      },
      closeLoading() {
        this.isLoad = false
      }
    }
  }
</script>

<style scoped>
  .postman-main {
    padding: 30px 40px;
  }
  .views {
    margin: 20px 0;
  }
</style>
