<template>
  <div class="login">
    <div class="login_Index">
      <div class="login_Left">
        <!--登陆模块-->
        <div class="login_Model">
          <p class="forger_First">狮子会公益基金系统</p>
          <form action="" class="S_Message">
            <span class="lable_tit">账号</span>
            <input type="text" class="user" v-model="loginForm.username" id="user-iphone" @blur="zhangh">
            <i id="errors" style="font-size: .12rem; color:red; display: block;"></i>
            <span class="lable_tit">密码</span>
            <input type="password" class="pas_word" id="pass-word" v-model="loginForm.password">
            <div style="overflow: hidden;display: block">
              <router-link to="/findpwd" class="S_foget">忘记密码</router-link>
              <router-link to="/register" class="register">没有账号?先注册</router-link>
            </div>
            <input type="button" v-on:click="tijiao" class="sub_but" value="登陆">
          </form>
        </div>
      </div>
      <div class="login_Right"></div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
    export default {
        name: "login",
        data(){
         return{
           errs:"",    //手机号的正则
           loginForm: {
             username: '',
             password: ''
           },
           userToken:""
         }
        },
      mounted(){
      },
      methods:{
        ...mapMutations(['changeLogin']),
        zhangh:()=>{
          let str = $("#user-iphone").val();
          var hu =/^1\d{10}$/;
          if(!hu.test(str)){
            this.errs=false;
            $("#errors").html("请输入正确的手机号");
          }else{
            $("#errors").html("");
            this.errs=true;
          }
        },

        tijiao(){
          let _this = this
          if (this.loginForm.username === '' || this.loginForm.password === '') {
            alert('账号或密码不能为空');
          }else {
            this.$axios({
              method: 'post',
              url: 'https://kungfunion.club/authorizations/',
              data: _this.loginForm,
            }).then(res => {
              _this.userToken =res.data.token;
              // 将用户token保存到vuex中
              // _this.changeLogin({ Authorization: _this.userToken });
              // 将用户token保存到sessionStorage中
              sessionStorage.setItem('tok',_this.userToken);
              sessionStorage.setItem('id',res.data.id);
              sessionStorage.setItem('serviceteam_id',res.data.serviceteam_id);
              if(!res.data.is_staff){
                _this.$router.push('/select');
              }else{
                _this.$router.push('/superPersonlist');
              }
            }).catch(error => {
              alert('账号或密码错误');
            });
          }
        }
      }
    }
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .login{
    width: 100%;
    height:100%;
    background:#1C2C77;
  }
  .login_Index{
    width:13rem;
    height:7.33rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left:-6.5rem;
    margin-top:-3.66rem;
  }
  .login_Left,.login_Right{
    height:100%;
    float: left;
    border-radius: 0.08rem;
  }
  .login_Left{
    width:4.82rem;
    background:#e9e9f3;
  }
  .login_Right{
    width: 8.18rem;
    background:url("../assets/images/login.png") no-repeat;
    background-size: cover;
  }
  .login_Model{
      width: 100%;
      -webkit-box-sizing: border-box;
      height:100%;
    padding:1.95rem .38rem .78rem .40rem;
  }
  .login_Model .forger_First{
    text-indent:.05rem;
    color:#3851C7;
    font-size: .3rem;
    text-space: .1rem;
    font-weight: bold;
  }
  .S_Message{
    margin-top:.6rem;
  }
  .lable_tit{
    font-size: .2rem;
    margin-top:.4rem;
    display: block;
  }
  .user,.pas_word{
    border:0;
    border-bottom: 1px solid rgba(190,190,190,1);
    width: 100%;
    background: #e9e9f3;
    line-height: .28rem;
    margin:.2rem 0;
    font-size: .28rem;
    display: block;
  }
  .S_foget,.register{
    font-size:.14rem;
    font-weight:400;
    text-decoration:underline;
    color:rgba(56,81,199,1);
    line-height:.3rem;
    float: left;
  }
  .register{
    float: right;
  }
  .sub_but{
    width: 100%;
    height:.6rem;
    background: #3851c7;
    font-size: .2rem;
    color:#fff;
    text-align: center;
    line-height:.6rem;
    margin-top:.4rem;
    border-radius:.24rem;
  }
</style>
