<template>
  <div class="goodslist">
    <div class="title">
      <el-alert
        title="注意：服务端暂不提供图片上传、商品添加、编辑的提交功能，如需测试，可在本地8888端口自启服务端，具体参考Network Request URL！"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
    </div>
    <div class="search">
      <el-input placeholder="请输入内容" style="width: 300px" v-model="inputValue">
        <el-button @click="searchGoods" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" style="margin-left: 10px" @click="addGoods"
        >添加商品</el-button
      >
    </div>
    <div class="info">
      <el-table
        :data="goodsList"
        stripe
        v-if="goodsList"
        style="width: 100%"
        border
      >
        <el-table-column
          fixed
          prop="id"
          label="序号"
          type="index"
          :index="indexMethod"
          width="50"
        >
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="500">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="140">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="140">
        </el-table-column>
        <el-table-column prop="upd_time" label="创建时间" width="200">
          <template slot-scope="scope">{{
            scope.row.upd_time | formatTime
          }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="resetGoods(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteGoods"
              >删除</el-button
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
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "VShopManageGoodslist",

  data() {
    return {
      inputValue:""
    };
  },

  mounted() {
    this.getGoodsList();
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goods.goodsList,
      total: (state) => state.goods.total,
      pagenum: (state) => state.goods.pagenum,
    }),
  },
  filters: {
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
  methods: {
    ...mapActions("goods", ["getGoodsList","searchGoodsList"]),
    indexMethod(val) {
      val++;
      return val++;
    },
    addGoods() {
      this.$notify({
        title: "提示",
        message: "服务端暂不提供该功能",
        type: "warning",
      });
    },
    searchGoods(){
      if(this.inputValue){
        this.searchGoodsList({"result":this.inputValue})
      }else{
        this.getGoodsList();
      }
    },
    pageChange(val) {
      this.$store.commit("goods/changePagenum", { result: val });
      this.getGoodsList();
    },
    deleteGoods() {
      this.$notify({
        title: "提示",
        message: "服务端暂不提供该功能",
        type: "warning",
      });
    },
    resetGoods(val) {
      this.$router.push("/welcome/goods/goods/" + val.goods_id);
    },
  },
};
</script>
<style lang="scss" scoped>
.goodslist {
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background-color: white;
  box-sizing: border-box;
}
.search {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.title {
  margin-bottom: 20px;
}
.bottom {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
}
</style>