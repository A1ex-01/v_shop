<template>
  <div class="main">
      <el-table :data="meau" stripe style="width: 100%" border v-if="meau">
        <el-table-column
          fixed
          prop="id"
          label="序号"
          width="50"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="350">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="350">
        </el-table-column>
        <el-table-column prop="level" label="权限等级" width="350">
          <template slot-scope="scope">
            <el-tag :type="scope.row.level | format2">{{
              scope.row.level | format
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      meau: (state) => state.permiss.meau,
    }),
  },
  filters: {
    format(val) {
      if (val == 0) {
        return "一级";
      } else if (val == 1) {
        return "二级";
      } else {
        return "三级";
      }
    },
    format2(val) {
              if (val == 0) {
        return "success";
      } else if (val == 1) {
        return "default";
      } else {
        return "warning";
      }
    },
  },
  mounted() {
    this.getMeau();
  },
  methods: {
    ...mapActions("permiss", ["getMeau"]),
    indexMethod(val) {
      val++;
      return val++;
    },
  },
};
</script>

<style lang="scss" scoped>
.main{
    width: 100%;
    background-color: white;
    padding:30px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
</style>