<template>
  <div class="postman">
    <Row>
      <Col span="18">
        <postman-main/>
      </Col>
      <Col span="6">history</Col>
    </Row>

  </div>
</template>

<script>
  import PostmanMain from "./child/postmanMain/PostmanMain";
  export default {
    name: "PostMan",
    components: {
      PostmanMain
    }
  }
</script>

<style scoped>
  .postman {
    padding: 50px 80px;
  }
</style>
