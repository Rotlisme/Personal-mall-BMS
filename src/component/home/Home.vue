<template>
    <div>
        <h1>首页</h1>
        <el-date-picker
            v-model="value"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
        </el-date-picker>
    </div>
</template>

<script>
    import apiConfig from '../../js/api_config.js';

    export default {
        data() {
            return {
                value: '',
                pickerOptions: {
                    // 大于今天的日期不能选
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            };
        }
    }
</script>