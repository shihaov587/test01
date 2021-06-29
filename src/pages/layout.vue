<template>
  <el-container style="">
    <el-header><Nav /></el-header>
    <el-main><router-view></router-view></el-main>
  </el-container>
</template>



<script>
import Nav from "../components/nav";
export default {
  name: "layout",
  components: {
    Nav,
  },
};
</script>
