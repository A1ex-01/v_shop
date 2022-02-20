<template>
  <div class="show">
    <v-chart class="chart" :option="option" />
  </div>
</template>
<script>
import request from "@/utils/request";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
export default {
  data() {
    return {
      option: {
        title: {
          text: "各地区流量", //图表标题
          top: 5, //距离容器底部位置
          left: 20,
          textStyle: {
            color: "green",
            fontSize: "18px",
          },
        },
        legend:{
            data:null
        },
        tooltip: {
          trigger: "axis",
        },
        // 默认颜色
        color: "#008c8c",
        xAxis: [
          {
            type: "category",
            data: null,
            axisTick: {
              show: false, // 取消x轴刻度
            },
            axisLine: {
              lineStyle: {
                color: "#D8D7D7", // 设置x轴颜色
              },
            },
            axisLabel: {
              textStyle: {
                color: "#666", // 设置x轴字体颜色
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false, // 取消y轴刻度
            },
          },
        ],
        series: {
          type: "line",
          smooth: true, // 曲线
          data: null,
          lineStyle: {
            // 渐变显示
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#FF6B70", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FF874C", // 100% 处的颜色
                },
              ],
              global: false,
            },
            width: 3,
            cap: "round",
          },
          showSymbol: false, // 隐藏折点
        },
      },
    };
  },
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "dark",
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await request({
        method: "get",
        url: "reports/type/1",
      });
      console.log(res.data.data);
        this.option.xAxis[0].data = res.data.data.xAxis[0].data
        this.option.series = res.data.data.series;
        this.option.legend = res.data.data.legend;
    },
  },
};
</script>
<style lang="scss" scoped>
.show {
  width: 100%;
  height: 100%;
  background-color: #fff;
  line-height: 30px;
  padding: 20px;
  box-sizing: border-box;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>