<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <b-button variant="success" @click="goTable">boot Table test</b-button>
    <b-card header="featured" header-tag="header" title="bstrap的表格">
      <b-row>
        <b-col cols="6">
          <b-input-group class="mb-2">
            <b-form-input placeholder="search a name" v-model="queryInfo.query">
            </b-form-input>
            <b-input-group-prepend is-text>
              <span @click="getUserList" class="search_btn"
                ><b-icon icon="search"></b-icon>
              </span>
            </b-input-group-prepend>
          </b-input-group>
        </b-col>
        <b-col cols="4"></b-col>
        <b-col cols="2">
          <b-button
            variant="primary"
            class="add_btn"
            @click="addDialogVisible = true"
          >
            新增用户
          </b-button>
        </b-col>
      </b-row>
      <!-- bootstrap全数据全字段显示 表格-->
      <b-table striped bordered hover responsive :items="userlist"> </b-table>
      <b-row></b-row>
      <hr />
      <h4>eleuiの表格</h4>
      <!--  eleui表格 可以指定字段渲染-->
      <el-table :data="userlist" border strip>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!-- 作用域插槽 拿到每行的绑定数据 -->
          <template slot-scope="scope">
            <!-- {{ scope.row }} -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" width="180px">
          <!-- 再这里放作用域插槽 -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页导航，每次需要发送请求 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="100px"
        >
        <!-- prop对应校验规则 -->
          <el-form-item label="新用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 编辑用户 -->
      <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <!-- 查询后才有数据，需要定义新数组 -->
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="100px"
        >
        <!-- prop对应校验规则 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editDialogVisible= false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "users",
  data() {
    return {
      items: [
        { text: "ホームページ", href: "#" },
        { text: "ユーザー名", href: "#" },
        { text: "ユーザーリスト", href: "#" },
      ],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      // 用户保存请求返回的用户数据
      userlist: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible:false,
      addForm: { 
        username: "",
        password:'',
        email:'',
        mobile:''
       },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "用户名长度请在3-10", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度请在6-20", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          ],
        mobile: [
          { required: true, message: "请输入手机", trigger: "blur" },
          ],
      },
      editForm:{},
      editFormRules:{
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          ],
        mobile: [
          { required: true, message: "请输入手机", trigger: "blur" },
          ],
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$axios.get("users", {
        params: this.queryInfo,
      });
      console.log(res);
      if (res.meta.status !== 200)
        return alert("用户列表获取失败" + res.meta.status);
      this.userlist = res.data.users;
      this.total = res.data.total;
    },
    goTable() {
      this.$router.push("/bootusers");
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
      
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    async userStateChanged(userinfo) {
      const { data: res } = await this.$axios.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return alert(res.meta.status);
      }
      alert("更新用户状态成功");
    },
    // 关闭新增user后，重置表单
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
    // 添加user
    addUser(){
      // 表单预校验
      this.$refs.addFormRef.validate(async valid =>{
        if(!valid) return 
        const {data:res} =await this.$axios.post('users',this.addForm)
// 失败时操作
        if(res.meta.status !== 201) { alert(res.meta.status)}
// 成功时返回201响应码
        alert(res.meta.status)
// 关闭对话框
        this.addDialogVisible = false
      this.getUserList();
        
      
      }) 
    },
    // 编辑user
    async showEditDialog(id){
      console.log(id);
      
      const { data: res } = await this.$axios.get(
        'users/'+id
      );
      if (res.meta.status !== 200) {
        
        return alert(res.meta.msg);
      }
      
      this.editForm = res.data
      this.editDialogVisible =true
    },
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    }
  },
};
</script>
<style scoped>
.add_btn {
  float: right;
}
.search_btn {
  cursor: pointer;
}
</style>