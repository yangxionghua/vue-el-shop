<template>
  <b-container class="home-container">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <img
          src="https://placekitten.com/g/30/30"
          class="d-inline-block align-top"
          alt="Kitten"
        />
        BootstrapVue
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- 内容主体 换了饿了么ui-->

    <el-container class="content_container">
        <!-- 侧边栏菜单 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- router路由链接 以index作为路由链接路径 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse = "isCollapse"
          :collapse-transition = "false"
          router
          :default-active="activePath"
        >
        
          <!-- 1级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <!-- <i :class="iconsObj[item.id]"></i> -->
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 2级菜单 -->
          
          <el-menu-item
            :index="'/'+item2.path"
            v-for="item2 in item.children"
            
            :key="item2.id"
            @click="saveNavState('/'+item2.path)"
          >
            <template slot="title">
              <b-icon icon="bar-chart-fill"></b-icon>
              <span>{{ item2.authName }}</span>
            </template>
          </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容内容主题,是home的子路由 -->
      <el-main>
        <router-view></router-view>
        </el-main>
    </el-container>
  </b-container>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      menulist: [],
    //   动态绑定图标 :class根据id
    iconsObj:{
        '125':'el-icon-user',
        '103':'el-icon-eleme',
        '101':'el-icon-s-goods',
        '102':'el-icon-s-order',
        '145':'el-icon-s-check'
    },
    isCollapse:false,
    // 激活的链接地址
    activePath:''

    };
  },
  created() {
    this.getMenuList();
    // 再创建时触发
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    logout() {
      if (confirm("确认要退出吗")) {
        window.sessionStorage.clear();
        this.$router.push("./login");
      }
    },
    // 获取菜单数据
    async getMenuList() {
      const { data: res } = await this.$axios.get("menus");
      // console.log(res)
      if (res.meta.status !== 200)
        return alert("获取失败 状态码" + res.meta.msg);
      // 将所有获取的菜单保存
      this.menulist = res.data;
    },
    toggleCollapse(){
        this.isCollapse = !this.isCollapse
    },
    // 点击二级菜单时出发，保存路由链接地址，再传到 用于高亮显示
    saveNavState(activePath){
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
    }
  },
};
</script>
<style lang="less" scoped>

.navbar-expand-lg .navbar-collapse {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.home-container {
  height: 100%;
}
.content_container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
  .el-manu{
      border-right: 0;
  }
}
.el-main {
  background-color: #eee;
}
.b-icon{
    margin-right: 0.75rem;
}

.toggle-button{
  
    background-color: #545c76;
    text-align: center;
    cursor: pointer;
}
</style>    