<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../../public/img/theme/team-3.jpg" alt="" />
      </div>
      <!-- 登录表单 -->
      <b-form
        @submit="onSubmit"
        @reset="onReset"
        v-if="show"
        :model="loginForm"
        class="login_form"
      >


        <b-form-group
          id="fieldset-1"
          description="Let us know your name."
          label="Enter your name"
          label-for="input-1"
          valid-feedback="Thank you!"
          :invalid-feedback="invalidFeedback"
          :state="state"
        >
          <b-form-input
            id="input-1"
            v-model="loginForm.name"
            :state="state"
            trim
          ></b-form-input>


        <!-- <label for="feedback-user">User ID</label>
        <b-form-input
          v-model="userId"
          :state="validation"
          id="feedback-user"
        ></b-form-input>
        <b-form-invalid-feedback :state="validation">
          Your user ID must be 5-12 characters long.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Looks Good.
        </b-form-valid-feedback> -->


        <label for="text-password">Password</label>
        <b-form-input
          v-model="userPassword"
          type="password"
          id="text-password"
          aria-describedby="password-help-block"
        ></b-form-input>
        <b-form-text id="password-help-block">
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </b-form-text>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        name: "ありな",
        pass: "123456",
      },
      userId: "myID",
      userPassword: "123456",

      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(this.userId + this.userPassword + "will be sent");
      //   alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.userId = "";
      this.userPassword = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  computed: {
    state() {
      return this.loginForm.name.length >= 4;
    },

    invalidFeedback() {
      if (this.loginForm.name.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
    validation() {
      return this.userId.length > 4 && this.userId.length < 13;
    },
  },
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
      margin-bottom: 10px;
    }
    .btn {
      margin: 5px 10px;
      float: right;
    }
  }
}
</style>
