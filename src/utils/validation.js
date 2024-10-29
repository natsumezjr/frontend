// src/utils/validation.js
export const validateRegistrationForm = (form) => {
    const errors = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    };
  
    const usernamePattern = /^[a-zA-Z0-9_]{1,16}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!form.username) {
      errors.username = '用户名不能为空';
    } else if (!usernamePattern.test(form.username)) {
      errors.username = '用户名只能包含字母、数字和下划线，且长度不能超过16位';
    }
  
    if (!form.password) {
      errors.password = '密码不能为空';
    } else if (!passwordPattern.test(form.password)) {
      errors.password = '密码必须包含至少一个大写字母、一个小写字母和一个数字，且长度至少为6位';
    }
  
    if (form.confirmPassword !== form.password) {
      errors.confirmPassword = '两次输入的密码不一致';
    }
  
    if (!form.email) {
      errors.email = '邮箱不能为空';
    } else if (!emailPattern.test(form.email)) {
      errors.email = '邮箱格式不正确';
    }
  
    return errors;
  };

export const validateLoginForm = (form) => {
    const errors = {
      username: '',
      password: '',
    };
  
    const usernamePattern = /^[a-zA-Z0-9_]{1,16}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  
    if (!form.username) {
      errors.username = '用户名不能为空';
    } else if (!usernamePattern.test(form.username)) {
      errors.username = '用户名只能包含字母、数字和下划线，且长度不能超过16位';
    }
  
    if (!form.password) {
      errors.password = '密码不能为空';
    } else if (!passwordPattern.test(form.password)) {
      errors.password = '密码必须包含至少一个大写字母、一个小写字母和一个数字，且长度至少为6位';
    }
  
    return errors;
};