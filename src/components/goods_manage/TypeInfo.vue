<template>
  <div class="typeInfo">
    <div class="top">
      <el-button type="primary" @click="addTypeName">添加分类</el-button>
    </div>
    <div class="tabs">
      <el-table
        :data="categories"
        style="width: 100%"
        border
        stripe
        v-if="categories"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              :show-header="false"
              :data="scope.row.children"
              style="width: 100%"
              border
              stripe
              v-if="categories"
            >
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-table
                    :show-header="false"
                    :data="scope.row.children"
                    style="width: 100%"
                    border
                    stripe
                    v-if="categories"
                  >
                    <el-table-column
                      type="index"
                      :index="indexMethod"
                      width="80px"
                    >
                    </el-table-column>
                    <el-table-column prop="cat_name" width="">
                    </el-table-column>
                    <el-table-column width="">
                      <i class="el-icon-success" style="color: lightgreen"></i>
                    </el-table-column>
                    <el-table-column width="">
                      <template
                        ><el-tag type="warning">三级</el-tag></template
                      ></el-table-column
                    >
                    <el-table-column width="">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          size="mini"
                          @click="resetName(scope.row)"
                          >编辑</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          size="mini"
                          @click="deleteName(scope.row)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column type="index" :index="indexMethod" width="80px">
              </el-table-column>
              <el-table-column prop="cat_name" width=""> </el-table-column>
              <el-table-column width=""
                ><i class="el-icon-success" style="color: lightgreen"></i>
              </el-table-column>
              <el-table-column width="">
                <template
                  ><el-tag type="success">二级</el-tag></template
                ></el-table-column
              >
              <el-table-column width="">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="resetName(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="deleteName(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          width="80px"
        >
        </el-table-column>
        <el-table-column label="分类名称" prop="cat_name" width="">
        </el-table-column>
        <el-table-column label="是否有效" width="">
          <template
            ><i class="el-icon-success" style="color: lightgreen"></i></template
        ></el-table-column>
        <el-table-column label="排序" prop="" width="">
          <template><el-tag>一级</el-tag></template></el-table-column
        >
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="resetName(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteName(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
        <div class="bot" style="margin-top:20px">
      <el-pagination
        background
        layout="prev, pager, next, total, jumper"
        :total="catTotal"
        :page-size="5"
        :current-page="catPagenum"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
    <div class="bottom">
      <el-dialog title="修改分类名称" :visible.sync="resetBtn">
        <el-form>
          <el-form-item label="分类名称:" label-width="90px" required>
            <el-input autocomplete="off" v-model="typeName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quit">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加分类名称" :visible.sync="addTypeBtn">
        <el-form>
          <el-form-item label="分类名称" label-width="80px">
            <el-input v-model="myTypeName"></el-input>
          </el-form-item>
          <el-form-item label="父级分类" label-width="80px">
            <el-cascader
            style="width:100%"
              :props="{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
                checkStrictly: true,
              }"
              :options="allCategories | format"
              :show-all-levels="false"
              @change="nodeChange"
              v-if="categories"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quit">取 消</el-button>
          <el-button type="primary" @click="confirmType">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "VShopManageTypeinfo",

  data() {
    return {
      resetBtn: false,
      typeName: "",
      value: "",
      addTypeBtn: false,
      myTypeName: "",
      arr:[]
    };
  },
  filters: {
    format(val) {
      // 禁用三级的元素
      for (let i = 0; i < val.length; i++) {
        if (val[i].children) {
          for (let j = 0; j < val[i].children.length; j++) {
            if (val[i].children[j].children) {
              // val[i].children[j].children.length = 0;
              for (let k = 0; k < val[i].children[j].children.length; k++) {
                Object.assign(val[i].children[j].children[k], {
                  disabled: true,
                });
              }
            }
          }
        }
      }
      return val;
    },
  },
  mounted() {
    this.getCategoriesList();
    this.getAllCategoriesList();
  },
  computed: {
    ...mapState({
      categories: (state) => state.goods.categories,
      catPagenum: (state) => state.goods.catPagenum,
      catTotal: (state) => state.goods.catTotal,
      allCategories: (state) => state.goods.allCategories
    }),
  },
  methods: {
    ...mapActions("goods", ["getCategoriesList", "deleteType", "updateType","addTypeLevel","getAllCategoriesList"]),
    indexMethod(val) {
      val++;
      return val;
    },
    resetName(val) {
      this.value = val;
      this.typeName = this.value.cat_name;
      this.resetBtn = true;
    },
    quit() {
      this.resetBtn = false;
      this.typeName = "";
    },
    confirm() {
      this.updateType({ id: this.value.cat_id, cat_name: this.typeName });
      this.resetBtn = false;
    },
    deleteName(val) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteType({ result: val.cat_id });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addTypeName() {
      this.addTypeBtn = true;
    },
    nodeChange(val) {
      this.arr = val;
    },
    confirmType(){
      this.addTypeBtn = false;
      if(this.arr.length>0){
        this.addTypeLevel({cat_pid:this.arr[this.arr.length-1],cat_name:this.myTypeName,cat_level:this.arr.length})
      }else{
        this.addTypeLevel({cat_pid:0,cat_name:this.myTypeName,cat_level:0})
      }
    },
    pageChange(val){
      this.$store.commit("goods/changeCatPage",{result:val});
      this.getCategoriesList();
    }
  },
};
</script>
<style lang="scss" scoped>
.typeInfo {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .top {
    margin-bottom: 20px;
  }
  .tabs {
    width: 100%;
  }
}
</style>