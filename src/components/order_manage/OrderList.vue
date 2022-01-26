<template>
  <div class="order">
    <div class="search">
      <el-input
        placeholder="请输入内容"
        style="width: 300px"
        v-model="searchValue"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>
    <div class="tabs">
      <el-table
        :data="orderList"
        v-if="orderList"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          fixed
          prop="id"
          label="序号"
          width="60"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="200px">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="120px">
        </el-table-column>
        <el-table-column prop="pay_status" label="是否付款" width="120px">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status == '0'">{{
              scope.row.pay_status | format
            }}</el-tag>
            <el-tag type="success" v-else>{{
              scope.row.pay_status | format
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="120px">
        </el-table-column>
        <el-table-column prop="update_time" label="下单时间" width="150px">
          <template slot-scope="scope">
            {{ scope.row.update_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showOrderInfo(scope.row.order_id)"
              >查看</el-button
            >
            <el-button type="success" icon="el-icon-location" size="mini" @click="trade((scope.row.order_id))"
              >物流</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, pager, next, total, jumper"
        :total="total"
        :page-size="10"
        :current-page="pagenum"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
    <div class="mask">
      <el-dialog title="商品信息" :visible.sync="showInfoBtn">
        <el-row>
          <el-col
            :span="8"
            v-for="(item, index) in img"
            :key="index"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img
                :src="item.pics[0].pics_mid"
                class="image"
              />
              <div style="padding: 14px">
                <span>￥{{item.goods_price}}元</span>
                <div class="bottom clearfix">
                  <span class="goodname">{{item.goods_name}}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quit">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "VShopManageOrderlist",

  data() {
    return {
      searchValue: "",
      showInfoBtn: false,
    };
  },
  filters: {
    format(val) {
      if (val != "0") {
        return "已付款";
      } else {
        return "未付款";
      }
    },
    formatTime(val) {
      const date = new Date(val);
      return (
        date.getFullYear() +
        "-" +
        date.getMonth() +
        1 +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },
  },
  computed: {
    ...mapState({
      orderList: (state) => state.order.orderList,
      total: (state) => state.order.total,
      pagenum: (state) => state.order.pagenum,
      localOrder: (state) => state.order.localOrder,
      img: (state) => state.order.img,
    }),
  },
  mounted() {
    this.getOrderList();
  },

  methods: {
    ...mapActions("order", [
      "getOrderList",
      "searchOrderList",
      "getLocalOrderInfo",
    ]),
    indexMethod(val) {
      val++;
      return val;
    },
    pageChange(val) {
      this.$store.commit("order/changePage", { result: val });
      this.getOrderList();
    },
    search() {
      this.searchOrderList({ result: this.searchValue });
    },
    showOrderInfo(val) {
      this.getLocalOrderInfo({ result: val });

      this.showInfoBtn = true;
    },
    quit() {
      this.showInfoBtn = false;
    },
    trade(){
              this.$notify({
          title: "提示",
          message: "未开放该功能",
          type: "warning",
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.order {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
}
.search {
  display: flex;
  background-color: white;
  padding: 0px 0px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.bottom {
  margin-top: 20px;
}
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .goodname{
    font-size: 12px;
    overflow: hidden;

text-overflow: ellipsis;

display: -webkit-box;

-webkit-line-clamp: 2;

overflow:hidden;

/*! autoprefixer: off */

-webkit-box-orient: vertical;
  }
</style>