<template>
  <div class="reset">
    <div class="alert">
      <el-alert show-icon center="" title="编辑商品信息" type="info">
      </el-alert>
    </div>
    <div class="step">
      <el-steps :active="index" align-center finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="tab">
      <el-tabs @tab-click="tabClick" tab-position="left" style="height: 100%">
        <el-tab-pane label="基本信息">
          <template>
            <el-form
              :model="goodsInfo"
              label-position="top"
              label-width="80px"
              v-if="goodsInfo"
            >
              <el-form-item label="商品名称">
                <el-input v-model="goodsInfo.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格">
                <el-input v-model="goodsInfo.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量">
                <el-input v-model="goodsInfo.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量">
                <el-input v-model="goodsInfo.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <template>
                  <div style="width: 200px">
                    <el-cascader disabled></el-cascader>
                  </div>
                </template>
              </el-form-item>
            </el-form>
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <template>
            <el-form label-position="top" label-width="80px">
              <el-form-item label="暂无"> </el-form-item>
            </el-form>
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <template>
            <el-form label-position="top" label-width="80px">
              <el-form-item label="暂无"> </el-form-item>
            </el-form> </template
        ></el-tab-pane>
        <el-tab-pane label="商品图片" style="height: 650px">
          <template>
            <div class="img">
              <el-upload
                :file-list="goodsInfo.pics | format"
                action="https://jsonplaceholder.typicode.com/posts/"
                class="upload-demo"
                :disabled="true"
                list-type="picture"
              >
                <el-button size="small" type="primary" @click.prevent="upClick"
                  >点击上传</el-button
                >
              </el-upload>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <template>
            <div>
              <QuillEditor
                :placeholder="goodsInfo.goods_introduce | formatContent"
              ></QuillEditor>
              <div style="display: flex">
                <el-button
                  @click="sendReset"
                  type="primary"
                  style="margin-top: 30px"
                  >提交</el-button
                >
              </div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import QuillEditor from "../goods_manage/QuillEdit.vue";
export default {
  name: "VShopManageResetgoods",
  components: {
    QuillEditor,
  },
  data() {
    return {
      index: 0,
      goods_id: "",
    };
  },
  filters: {
    format(val) {
      let data = [];
      if (val) {
        for (let i = 0; i < val.length; i++) {
          val[i];
          data.push({ name: i, url: val[i].pics_sma_url });
        }
      }
      return data;
    },
    formatContent(val) {
      if (val) {
        val = val.split("data-src=");
        for (let i = 0; i < val.length; i++) {
          val[i] = val[i].split(" alt");
          val[i] = val[i][0];
        }
        for (let i = 0; i < val.length; i++) {
          val[i] = val[i].split("?");
          val[i] = val[i][0];
        }
      }
      return val;
    },
  },
  computed: {
    ...mapState({
      goodsInfo: (state) => state.goods.goodsListById,
    }),
  },
  mounted() {
    this.goods_id = this.$route.params.id;
    this.getGoodsById({ result: this.$route.params.id });
  },
  methods: {
    ...mapActions("goods", ["getGoodsById"]),
    tabClick(val) {
      this.index = +val.index;
    },
    sendReset() {
      this.$notify({
        title: "警告",
        message: "服务端暂未开放该功能",
        type: "warning",
      });
    },
    upClick() {
      this.$notify({
        title: "警告",
        message: "服务端暂未开放该功能",
        type: "warning",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.reset {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.step {
  padding: 20px;
  box-sizing: border-box;
}
.el-tabs,
.el-tabs--left {
  width: 100%;
  height: 100%;
}
.el-form-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>