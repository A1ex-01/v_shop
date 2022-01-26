<template>
  <div class="goodstype">
    <div class="info">
      <el-alert
        show-icon=""
        title="注意：只允许为第三级分类设置相关参数！"
        :closable="false"
        type="warning"
      >
      </el-alert>
    </div>
    <div class="select">
      <span>选择商品分类：</span>
      <el-cascader
        :props="{ value: 'cat_id', label: 'cat_name', children: 'children' }"
        :options="allCategories | format"
        :show-all-levels="false"
        @change="nodeChange"
      >
      </el-cascader>
    </div>
    <div class="tabs">
      <el-tabs v-model="active">
        <el-tab-pane label="动态参数" name="first">
          <template>
            <div class="btn">
              <el-button type="primary" @click="addActiveValue"
                >添加参数</el-button
              >
            </div>

            <el-table :data="manyAttr" style="width: 100%" border>
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <template v-if="scope.row.attr_vals.indexOf(',') != -1">
                    <el-tag
                      style="margin: 0 15px 10px 15px"
                      v-for="(item, index) in scope.row.attr_vals.split(',')"
                      :key="index"
                      closable
                      @close="handleClose(scope.row, 'many', item)"
                    >
                      {{ item }}
                    </el-tag>
                  </template>
                  <template
                    v-if="
                      scope.row.attr_vals.indexOf(',') == -1 &&
                      scope.row.attr_vals
                    "
                  >
                    <el-tag
                      style="margin: 0 15px 10px 15px"
                      v-for="(item, index) in scope.row.attr_vals.split()"
                      :key="index"
                      closable
                      @close="handleClose(scope.row, 'many', item)"
                    >
                      {{ item }}
                    </el-tag>
                  </template>
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.attr_id == attr_id"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @blur="handleInputConfirm(scope.row, 'many')"
                  >
                  </el-input>
                  <el-button
                    v-else
                    style="margin: 0 15px 10px 15px"
                    class="button-new-tag"
                    size="small"
                    @click="addTag(scope.row)"
                    >+ New Tag</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="序号"
                width="50"
                type="index"
                :index="indexMethod"
              >
              </el-table-column>
              <el-table-column prop="attr_name" label="参数名称" width="">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="resetAttr(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="deleteAttr(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <template>
            <div class="btn">
              <el-button type="primary" @click="addStaticValue"
                >添加属性</el-button
              >
            </div>
            <el-table :data="onlyAttr" style="width: 100%" border>
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <template v-if="scope.row.attr_vals.indexOf(',') != -1">
                    <el-tag
                      style="margin: 0 15px 10px 15px"
                      v-for="(item, index) in scope.row.attr_vals.split(',')"
                      :key="index"
                      closable
                      @close="handleClose(scope.row, 'only', item)"
                    >
                      {{ item }}
                    </el-tag>
                  </template>
                  <template v-else>
                    <el-tag
                      style="margin: 0 15px 10px 15px"
                      v-for="(item, index) in scope.row.attr_vals.split()"
                      :key="index"
                      closable
                      @close="handleClose(scope.row, 'only', item)"
                    >
                      {{ item }}
                    </el-tag>
                  </template>
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.attr_id == attr_id"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @blur="handleInputConfirm(scope.row, 'only')"
                  >
                  </el-input>
                  <el-button
                    v-else
                    style="margin: 0 15px 10px 15px"
                    class="button-new-tag"
                    size="small"
                    @click="addTag(scope.row)"
                    >+ New Tag</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="序号"
                width="50"
                type="index"
                :index="indexMethod"
              >
              </el-table-column>
              <el-table-column prop="attr_name" label="参数名称" width="">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="resetAttr(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="deleteAttr(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template></el-tab-pane
        >
      </el-tabs>
    </div>
    <div class="mask">
      <el-dialog title="修改静态属性" :visible.sync="addStaticBtn">
        <el-form>
          <el-form-item label="静态属性:" label-width="90px" required>
            <el-input autocomplete="off" v-model="staticValue"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quit">取 消</el-button>
          <el-button type="primary" @click="confirmStatic">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改动态属性" :visible.sync="addActiveBtn">
        <el-form>
          <el-form-item label="动态属性:" label-width="90px" required>
            <el-input autocomplete="off" v-model="activeValue"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quit">取 消</el-button>
          <el-button type="primary" @click="confirmActive">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改静态属性" :visible.sync="resetStaticName">
        <el-form>
          <el-form-item label="静态属性:" label-width="90px" required>
            <el-input autocomplete="off" v-model="valueStaticName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quit">取 消</el-button>
          <el-button type="primary" @click="confirmChangeStaticName"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog title="修改动态参数" :visible.sync="resetActiveName">
        <el-form>
          <el-form-item label="动态属性:" label-width="90px" required>
            <el-input autocomplete="off" v-model="valueActiveName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quit">取 消</el-button>
          <el-button type="primary" @click="confirmChangeActiveName"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "VShopManageGoodstype",

  data() {
    return {
      active: "first",
      inputVisible: false,
      inputValue: "",
      catId: "",
      staticValue: "",
      activeValue: "",
      addStaticBtn: false,
      addActiveBtn: false,
      resetStaticName: false,
      resetActiveName: false,
      valueStaticName: "",
      valueActiveName: "",
      valueInfo: "",
      attr_id: "",
    };
  },
  filters: {
    format(val) {
      // 过滤没有三级的元素
      let arr = [];
      for (let i in val) {
        if (val[i].children) {
          for (let j in val[i].children) {
            if (val[i].children[j].children) {
              arr.push(val[i]);
              break;
            }
          }
        }
      }
      return arr;
    },
  },
  computed: {
    ...mapState({
      categories: (state) => state.goods.categories,
      allCategories: (state) => state.goods.allCategories,
      manyAttr: (state) => state.goods.manyAttr,
      onlyAttr: (state) => state.goods.onlyAttr,
    }),
  },
  mounted() {
    this.getAllCategoriesList();
  },

  methods: {
    ...mapActions("goods", [
      "getCategoriesList",
      "getAllCategoriesList",
      "getManyAttr",
      "getOnlyAttr",
      "deleteAttr",
      "deleteVals",
      "addManyValue",
      "addOnlyValue",
      "addMyStaticValue",
      "addMyActiveValue",
    ]),
    nodeChange(val) {
      this.getManyAttr({ result: val[2] });
      this.getOnlyAttr({ result: val[2] });
      this.cat_id = val[2];
    },
    indexMethod(val) {
      val++;
      return val++;
    },
    handleClose(val, sels, item) {
      // let attr = val.attr_vals;
      // let temp = [];
      // if (attr.indexOf(",") != -1) {
      //   attr = attr.split(",");
      //   for (let i in attr) {
      //     if (i != attr.indexOf(item)) {
      //       temp.push(attr[i]);
      //     }
      //   }
      // } else {
      //   temp = "";
      // }
      // val.attr_vals = temp;

      //传入值处理
      let a = val.attr_vals;
      let arr = [];
      if (a) {
        if (a.indexOf(",") != -1) {
          a = a.split(",");
          for (let i in a) {
            if (a[i] != item) {
              arr.push(a[i]);
            }
          }
          val.attr_vals = arr.toString();
        } else {
          a = "";
          val.attr_vals = a;
        }
      }
      const obj = {
        cat_id: val.cat_id,
        attr_id: val.attr_id,
        info: {
          attr_name: val.attr_name,
          attr_sel: sels,
          attr_vals: val.attr_vals,
        },
      };
      console.log(obj);
      this.deleteVals(obj);
    },
    deleteMyAttr(val) {
      this.deleteAttr({ attr_id: val.attr_id, cat_id: val.cat_id });
    },
    resetAttr(val) {
      console.log(val);
      this.valueInfo = val;
      if (this.cat_id) {
        console.log(this.valueInfo.attr_sel);
        if (this.valueInfo.attr_sel == "only") {
          this.valueStaticName = this.valueInfo.attr_name;
          this.resetStaticName = true;
        } else {
          this.valueActiveName = this.valueInfo.attr_name;
          this.resetActiveName = true;
        }
      } else {
        this.$notify({
          title: "提示",
          message: "你还未选择分类",
          type: "warning",
        });
      }
    },
    addTag(val) {
      this.attr_id = val.attr_id;
      //   this.inputVisible = true;
      //   this.$nextTick(() => {
      //     this.$refs.saveTagInput.$refs.input.focus();
      //   });
    },
    handleInputConfirm(val, type) {
      console.log(this.inputValue, val, type);
      //   let attr = val.attr_vals;
      //   if (attr.indexOf(",") != -1) {
      //     attr = attr.split(",");
      //     attr.push(this.inputValue);
      //   } else {
      //     attr.split().push(this.inputValue)
      //   }
      let obj;
      if (val.attr_vals) {
        obj = {
          cat_id: val.cat_id,
          attr_id: val.attr_id,
          info: {
            attr_name: val.attr_name,
            attr_sel: type.split(),
            attr_vals: val.attr_vals + "," + this.inputValue,
          },
        };
        val.attr_vals = val.attr_vals + "," + this.inputValue;
      } else {
        obj = {
          cat_id: val.cat_id,
          attr_id: val.attr_id,
          info: {
            attr_name: val.attr_name,
            attr_sel: type.split(),
            attr_vals: this.inputValue,
          },
        };
        val.attr_vals = this.inputValue;
      }
      //   val.attr_vals = attr.toString();
      this.deleteVals(obj);
      // console.log(obj,val.attr_vals)
      this.inputValue = "";
      this.inputVisible = false;
      this.attr_id = "";
    },
    addStaticValue() {
      if (this.cat_id) {
        this.addStaticBtn = true;
      } else {
        this.$notify({
          title: "提示",
          message: "你还未选择分类",
          type: "warning",
        });
      }
    },
    addActiveValue() {
      if (this.cat_id) {
        this.addActiveBtn = true;
      } else {
        this.$notify({
          title: "提示",
          message: "你还未选择分类",
          type: "warning",
        });
      }
    },
    quit() {
      this.addStaticBtn = false;
      this.addActiveBtn = false;
      this.resetStaticName = false;
      this.resetActiveName = false;
    },
    confirmStatic() {
      if (this.staticValue) {
        this.addOnlyValue({
          cat_id: this.cat_id,
          attr_name: this.staticValue,
          attr_sel: ["only"],
        });
        this.addStaticBtn = false;
      } else {
        this.$notify({
          title: "提示",
          message: "内容不能为空",
          type: "warning",
        });
      }
    },
    confirmActive() {
      if (this.activeValue) {
        this.addManyValue({
          cat_id: this.cat_id,
          attr_name: this.activeValue,
          attr_sel: ["many"],
        });
        this.addActiveBtn = false;
      } else {
        this.$notify({
          title: "提示",
          message: "内容不能为空",
          type: "warning",
        });
      }
    },
    confirmChangeStaticName() {
      if (this.valueStaticName) {
        this.addMyStaticValue({
          id: this.valueInfo.cat_id,
          attrId: this.valueInfo.attr_id,
          attr_name: this.valueStaticName,
          attr_sel: ["only"],
        });
        this.resetStaticName = false;
      }
    },
    confirmChangeActiveName() {
      if (this.valueActiveName) {
        this.addMyActiveValue({
          id: this.valueInfo.cat_id,
          attrId: this.valueInfo.attr_id,
          attr_name: this.valueActiveName,
          attr_sel: ["many"],
        });
        this.resetActiveName = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.goodstype {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
  .info {
    width: 100%;
  }
  .select {
    margin-top: 20px;
  }
  .tabs {
    width: 100%;
  }
}

.el-tabs,
.el-tabs--left {
  width: 100%;
  height: 100%;
  line-height: 20px;
}
.btn {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.input-new-tag {
  width: 120px;
}
</style>