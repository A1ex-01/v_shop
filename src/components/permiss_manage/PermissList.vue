<template>
  <div class="permiss">
    <div class="addRole">
      <el-button type="primary" @click="addRoleM">添加角色</el-button>
    </div>
    <div class="tab">
      <el-table border :data="rolesList" v-if="rolesList" style="width: 90%">
        <el-table-column type="expand" prop="children">
          <template slot-scope="scope">
            <div @click="table(scope.row.id)">
              <el-table
                :data="scope.row.children"
                style="width: 100%"
                :cell-style="{ background: '#f5f5f5' }"
                :show-header="false"
              >
                <el-table-column prop="authName" width="200">
                  <template slot-scope="scope">
                    <el-tag
                      >{{ scope.row.authName }}
                      <i
                        class="el-icon-close"
                        @click="tagClick(scope.row.id)"
                      ></i>
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </template>
                </el-table-column>
                <el-table-column prop="children">
                  <template slot-scope="scope">
                    <el-table
                      :data="scope.row.children"
                      :cell-style="{ background: '#f5f5f5' }"
                      :show-header="false"
                    >
                      <el-table-column prop="authName" width="200">
                        <template slot-scope="scope">
                          <el-tag type="success"
                            >{{ scope.row.authName
                            }}<i
                              class="el-icon-close"
                              @click="tagClick(scope.row.id)"
                            ></i
                          ></el-tag>
                          <i class="el-icon-caret-right"></i>
                        </template>
                      </el-table-column>
                      <el-table-column>
                        <template slot-scope="scope">
                          <el-tag
                            style="margin-right: 10px; margin-bottom: 10px"
                            v-for="(item, index) in scope.row.children"
                            :key="index"
                            type="warning"
                            >{{ item.authName
                            }}<i
                              class="el-icon-close"
                              @click="tagClick(item.id)"
                            ></i
                          ></el-tag>
                          <!-- <el-tag>{{ scope.row.authName }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column width="200">
                    <template slot-scope="scope">
                      <el-table :data="scope.row.children">
                        <el-table-column prop="authName">
                          <template slot-scope="scope">
                            <el-tag>{{ scope.row.authName }}</el-tag>
                          </template>
                        </el-table-column>
                      </el-table> -->
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>

                <!-- <el-table-column prop="name" width="180"> </el-table-column>
            <el-table-column label="地址"> </el-table-column> -->
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          prop="id"
          type="index"
          width="100"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="resetInfo(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteInfo(scope.row)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="mixInfo(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mask">
      <el-dialog
        :destroy-on-close="true"
        title="添加角色"
        :visible.sync="addRoleBtn"
      >
        <el-form :model="addRoleInfo" :rules="rules" ref="addRoleInfo">
          <el-form-item label="角色名称" prop="roleName" label-width="85px">
            <el-input v-model="addRoleInfo.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc" label-width="85px">
            <el-input v-model="addRoleInfo.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addQuit">取 消</el-button>
          <el-button type="primary" @click="addConfirm('addRoleInfo')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        :destroy-on-close="true"
        title="修改角色"
        :visible.sync="resetRoleBtn"
      >
        <el-form :model="showInfo" :rules="resetRules" ref="resetRoleInfo">
          <el-form-item label="角色名称" prop="roleName" label-width="85px">
            <el-input v-model="showInfo.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc" label-width="85px">
            <el-input v-model="showInfo.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addQuit">取 消</el-button>
          <el-button type="primary" @click="resetConfirm('resetRoleInfo')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        :destroy-on-close="true"
        title="分配角色"
        :visible.sync="mixRoleBtn"
      >
        <el-tree
          :data="myTree"
          show-checkbox
          default-expand-all
          :default-checked-keys="bindData"
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          v-if="mixRoleBtn"
          @check-change="nodeClick"
        >
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeTree">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色名称"));
      } else {
        if (value.length < 2 || value.length > 16) {
          callback(new Error("长度不得少于2或大于16"));
        } else {
          callback();
        }
      }
    };
    const validateDesc = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色描述"));
      } else {
        callback();
      }
    };
    return {
      addRoleBtn: false,
      resetRoleBtn: false,
      mixRoleBtn: false,
      bindData: [],
      tableNum:"",
      defaultProps: {
        children: "children",
        label: "authName",
      },
      addRoleInfo: {
        roleName: "",
        roleDesc: "",
      },
      mixChildren: "",
      showInfo: {
        roleName: "",
        roleDesc: "",
        id: "",
      },
      rules: {
        roleName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { validator: validateName, trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { validator: validateDesc, trigger: "change" },
        ],
      },
      resetRules: {
        roleName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { validator: validateName, trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { validator: validateDesc, trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      rolesList: (state) => state.permiss.rolesList,
      myTree: (state) => state.permiss.myTree,
    }),
  },
  mounted() {
    this.getRoles();
    this.getAllRole();
  },
  methods: {
    ...mapActions("permiss", [
      "addRole",
      "getRoles",
      "changeRole",
      "deleteRole",
      "getAllRole",
      "giveAuthorize",
      "deleteAuthorize"
    ]),
    table(val) {
      this.tableNum = val;
    },
    sendInfo(val) {
      (val);
    },
    tagClick(val) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          (this.tableNum,val)
          this.deleteAuthorize({"roleId":this.tableNum,"rightId":val})
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    nodeClick(cal) {
      (cal);
    },
    addRoleM() {
      this.addRoleBtn = true;
    },
    indexMethod(index) {
      index++;
      return index++;
    },
    addQuit() {
      ("0");
      this.addRoleBtn = false;
      this.resetRoleBtn = false;
    },
    addConfirm(formName) {
      // (1);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.addRole(this.addRoleInfo);
          this.addRoleBtn = false;
        } else {
          return false;
        }
      });
    },
    closeTree() {
      this.bindData = [];
      (this.bindData);
      this.mixRoleBtn = false;
    },
    submit() {
      (this.bindData);
      this.giveAuthorize({
        id: this.showInfo.id,
        rid: this.$refs.tree.getCheckedKeys().toString(),
      });
      this.bindData = [];
      this.mixRoleBtn = false;
    },
    resetConfirm(formName) {
      // (1);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.changeRole({
            id: this.showInfo.id,
            roleName: this.showInfo.roleName,
            roleDesc: this.showInfo.roleDesc,
          });
          this.resetRoleBtn = false;
        } else {
          return false;
        }
      });
    },
    resetInfo(val) {
      this.showInfo.roleName = val.roleName;
      this.showInfo.roleDesc = val.roleDesc;
      this.showInfo.id = val.id;
      this.resetRoleBtn = true;
    },
    deleteInfo(val) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRole({ id: val.id });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    mixInfo(val) {
      this.showInfo.roleName = val.roleName;
      this.showInfo.roleDesc = val.roleDesc;
      this.showInfo.id = val.id;
      this.mixChildren = val.children;
      for (let i = 0; i < this.mixChildren.length; i++) {
        // (this.mixChildren[i].id);
        if (this.mixChildren[i].children) {
          for (let j = 0; j < this.mixChildren[i].children.length; j++) {
            // (this.mixChildren[i].children[j].authName);
            if (this.mixChildren[i].children[j].children) {
              for (
                let z = 0;
                z < this.mixChildren[i].children[j].children.length;
                z++
              ) {
                this.bindData.push(
                  this.mixChildren[i].children[j].children[z].id
                );
              }
            }
          }
        }
      }
      this.mixRoleBtn = true;
    },
    handleNodeClick() {
      ("node");
    },
  },
};
</script>
<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table__body > tbody > tr:hover > td {
  background-color: #ffffff !important;
}
.addRole {
  padding: 25px 0px 20px 20px;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
}
.tab {
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  box-sizing: border-box;
}
</style>
