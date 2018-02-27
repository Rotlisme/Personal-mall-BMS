<template>
    <div>
        <h1>首页</h1>
        <el-date-picker v-model="value" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-carousel :interval="1500" type="card" height="200px" >
            <el-carousel-item v-for="item in 6" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import apiConfig from "../../js/api_config.js";

export default {
  data() {
    return {
      value: "",
      pickerOptions: {
        // 大于今天的日期不能选
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  }
};
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #08d9f5;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #f54a07;
  }
</style>