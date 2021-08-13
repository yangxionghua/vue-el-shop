<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../../public/img/theme/team-3.jpg" alt="" />
      </div>
      <!-- 登录表单 -->
      <b-form @submit.stop.prevent="onSubmit" class="login_form">
        <!-- 账号输入框 -->
        <b-form-group
          id="example-input-group-1"
          label="username"
          label-for="example-input-1"
        >
          <b-form-input
            id="example-input-1"
            name="example-input-1"
            v-model="$v.form.username.$model"
            :state="validateState('username')"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback"
            >请输入正确格式：3-20 characters.</b-form-invalid-feedback
          >
        </b-form-group>

        <!-- 密码框 -->
        <b-form-group
          id="example-input-group-2"
          label="password"
          label-for="example-input-2"
        >
          <b-form-input
            id="example-input-2"
            name="example-input-2"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            aria-describedby="input-2-live-feedback"
            type="password"
          ></b-form-input>

          <b-form-invalid-feedback id="input-2-live-feedback"
            >password must be 6-20</b-form-invalid-feedback
          >
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button class="ml-2" @click="resetForm()">Reset</b-button>
      </b-form>
    </div>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      class="alert_success"
    >
      <p>登录成功 {{ dismissCountDown }} seconds...</p>
    </b-alert>

    <!-- 提示框 -->

    <!-- <b-button @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-button> -->
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "login",
  data() {
    return {
      form: {
        username: "admin",
        password: "123456",
      },

      dismissSecs: 10,
      dismissCountDown: 0,
    };
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15),
        // email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15),
      },
    },
  },
  methods: {
    validateState(name) {
      // console.log(this);
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        username: "",
        password: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    async onSubmit() {
      this.$v.form.$touch();
      //   console.log(this);
      //   console.log(this.$v.form);
      if (this.$v.form.$anyError) {
        alert("请检查表单为未完成项");
        return;
      }
      // 验证成功 实行跳转登录
      //   alert(this.form + this.form.password + "--Form submitted!");
      // console.log(this.form);需要与数据库元素名对上
      const { data: res } = await this.$axios.post("login", this.form);
      // console.log(result);
      if (res.meta.status !== 200) {
        return alert("登录失败 错误码：" + res.meta.status);
      }

      //  console.log(res);
      this.showAlert();
      //   成功后 保存登录令牌token
      window.sessionStorage.setItem("token", res.data.token);
      console.log(res.data.token);
      //   跳转页面
      this.$router.push("/home");
      
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
  computed: {},
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  // position+transition 块居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 5px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -60%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border-color: #eee;
    }
  }
  .login_form {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    padding: 10px;
    .form-group {
      height: 90px;
      margin-bottom: 10px;
    }
    .btn {
      margin: 5px 10px;
      float: right;
    }
  }
}
.alert_success {
  width: 500px;
  height: 100px;
  z-index: 99;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
