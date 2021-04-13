<template>
  <div class="login">
    <a-form-model
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
      class="login-form"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '../../api/user';

export default {
  data() {
    // 校验规则
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    // 校验邮箱
    const checkEmail = (rule, value, callback) => {
      // 没有值就弹出
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      // 核对邮箱的校验规则，判断是否符合规则
      if (emailReg.test(value)) {
        return callback();// 如何符合规则，就callback继续下面的操作
      }
      // 不符合再抛出错误
      return callback(new Error('邮箱格式不正确'));
    };
    // 校验密码
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: '',
        email: '',
      },
      rules: {
        // 校验规则，当修改时就会校验
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    // 提交的时候
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.loginForm).then((res) => {
            console.log(res);
            // 邮箱密码正确后对res里的信息进行存储
            this.$store.dispatch('setUserInfo', res);
            // 进行页面跳转,跳转到home页面
            this.$router.push({
              name: 'Home',
            });
            // 登录失败就弹出错误信息提示
          }).catch((error) => {
            this.$message.error(error);
          });
          return true;
        }
        // console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/login.less");
</style>
