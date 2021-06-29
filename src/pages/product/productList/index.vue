<template>
  <div>
    <!-- <el-button type="primary" @click="dialogFormVisible = true"
      >添加商品</el-button> -->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品id：" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称:" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点：" :label-width="formLabelWidth">
          <el-input v-model="form.sellPoint" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格：" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量：" :label-width="formLabelWidth">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品简介：" :label-width="formLabelWidth">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            handleAdd(form);
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-table :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" 
    style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        prop="id"
        width="80"
        label="商品id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        width="80"
        label="商品名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="image"
        width="80"
        label="图片地址"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="sellPoint"
        width="300"
        label="商品卖点"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="price"
        width="80"
        label="商品价钱"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="num"
        width="80"
        label="商品数量"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="descs"
        label="商品描述"
        width="200"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        width="200"
        :render-header="renderHeader"
      ></el-table-column>
      <el-table-column
      align="right">
      <template slot="header" slot-scope="{}">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
      
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import api from "@/api";
// import elTable from '@/components/el-table'
export default {
  data() {
    return {
      tableData: [],
      total: 1,
      currentPage: 1,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "200px",
      search:''
    };
  },
  mounted() {
    this.getAll(1);
  },
  components: {
    // elTable
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAll(this.currentPage);
    },
    getAll(value) {
      api
        .getSelectTbItemAllByPage({
          page: value,
        })
        .then((res) => {
          // console.log(res);
          this.tableData = res.data.data.result;
        }),
        api.getTotal().then((res) => {
          this.total = res.data.result[0]["count(*)"];
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },

    /**
     * 删除
     */
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定删除
          api
            .getDeleteItemById({
              id: row.id,
            })
            .then((res) => {
              if (res.data.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.http(this.page);
              } else {
                this.$message({
                  type: "error",
                  message: "删除出现错误",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    /**
     * 增加
     */
    handleAdd(form) {
      console.log(form);
      api
        .postAddItem({
          id: form.id,
          title: form.title,
          sellPoint: form.sellPoint,
          price: form.price,
          num: form.num,
          desc: form.desc,
        })
        .then((res) => {
          this.getAll(1);
        });
    },
    /**
     * 添加商品按钮
     */
    renderHeader(h) {
      return (
        <div>
          <el-button
            type="primary"
            // style="padding:3px;margin-left:5px"
            size="mini"
            onClick={() => {
              this.dialogFormVisible = true;
            }}
            //---------------------
          >
            添加商品
          </el-button>
        </div>
      );
    },
  },
};
</script>