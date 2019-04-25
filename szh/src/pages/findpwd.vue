<template>
  <div class="login">
    <div class="login_Index">
      <div class="login_Left">
        <div class="findpwdfirst_Box">
          <div class="findpwdfirst">
            <p class="reset_tit">重置密码</p>
            <form action="" class="modification">
              <div class="zhi" style="position: relative">
              <p class="reg_lable">手机号</p>
              <i id="errors" style="font-size: .12rem;display: block;color:red;"></i>
              <input type="text" class="phone" id="user-iphone" @blur="zhangh" v-model="userphone">
                <a href="javascript:void(0)" id="getcodes" style="position: absolute;right: 0;font-size: .2rem;bottom:.1rem;border-left: 1px solid #666;padding:0 .1rem" v-on:click="getczyzm">获取验证码{{timeout}}</a>
              </div>
                <p class="reg_lable">验证码</p>
                <i id="code" style="font-size: .12rem;display: block;color:red;"></i>
                <input type="type" class="new_pas" id="yzcode" v-model="usercode">
              <p class="reg_lable">新密码</p>
              <i id="new-pas" style="font-size: .12rem;display: block;color:red;"></i>
              <input type="password" class="new_pas" @blur="paszheng" id="new-pasword" v-model="newpas">
              <p class="reg_lable">确认密码</p>
              <i id="old-pas" style="font-size: .12rem;display: block;color:red;"></i>
              <input type="password" class="old_pas" v-model="oldpas" @blur="oldpaszhen">
              <input type="button" v-on:click="tijiao" class="sub_btn" value="确定" >
            </form>
          </div>
        </div>
      </div>
      <div class="login_Right"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "findpwd",
      data(){
          return{
            errs:"",         //手机号校监
            paserr:"",       //新密码校监
            oldpasserr:"",   //旧密码校监
            userphone:"",    //用户输入的手机号
            usercode:"",     //用户输入的验证码
            oldpas:"",       //用户输入的确认密码
            newpas:"",       //用户输入的新密码
            timeout:"",       //倒计时
            authcode:"",       //验证码
            state:true            //防止表单重复提交
          }
      },
      mounted(){
      },
      methods:{
        zhangh(){
          var hu =/^1\d{10}$/;
          if(!hu.test(this.userphone)){
            this.errs=false;
            $("#errors").html("请输入正确的手机号");
          }else{
            $("#errors").html("");
            this.errs=true;
          }
        },
        tijiao(){
          if(this.state){
            this.state = false;
            let a = this.errs+this.paserr+this.oldpasserr;
            var username=document.cookie.split("=")[1];
            if(a == 3 && this.usercode == username){
              let newpasswords = {
                username:this.userphone,
                sms_code:this.usercode,
                password:this.newpas,
                password2:this.oldpas
              }
              this.$axios({
                method: 'put',
                url: 'https://kungfunion.club/users/password/ ',
                data: newpasswords,
              }).then(res => {
                alert('修改成功');
                this.state = true;
                this.$router.push('/login')
              }).catch(err => {
                alert(err.response.data.non_field_errors);
                this.state = true;
              });
            }else if(a != 3){
              this.state = true;
              alert("请填写完整信息")
              return false;
            }else if(this.usercode != username){
              this.state = true;
              alert("请输入正确验证码")
            }
          }else{
          }

        },






        paszheng(){
          let reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,18}$/;
          if(!reg2.test(this.newpas)){
            this.paserr=false;
            $("#new-pas").html("请输入至少6位密码");
          }else if(this.oldpas != this.newpas && this.oldpas != ""){
            this.paserr=false;
            $("#old-pas").html("两次密码不一致");
          }else{
            $("#new-pas").html("");
            $("#old-pas").html("");
            this.paserr=true;
          }

        },
        oldpaszhen(){
          let reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,18}$/;
          if(!reg2.test(this.oldpas)){
            this.oldpasserr=false;
            $("#old-pas").html("请输入至少6位密码");
          }else if(this.oldpas != this.newpas){
            this.oldpasserr=false;
            $("#old-pas").html("两次密码不一致");
          }else{
            $("#new-pas").html("");
            $("#old-pas").html("");
            this.paserr=true;
            this.oldpasserr=true;
          }
        },
        getczyzm(){
          if(this.timeout != ""){
            return false;
          }else{
            if(this.errs){
              let useriphone = this.userphone;
              this.timeout = 60        //获取验证码倒计时
              $("#getcodes").css({
                "cursor": "no-drop",
                "color":"#666"
              })
              let timer = setInterval(()=>{
                this.timeout--;
                if(this.timeout == 0){
                  this.timeout = "";
                  $("#getcodes").css({
                    "cursor": "pointer",
                    "color":"blue"
                  })
                  clearInterval(timer);
                }
              },1000)
              this.$axios({
                method: 'get',
                url: `https://kungfunion.club/sms_codes/${useriphone}/`,
              }).then(res => {
                this.authcode = res.data.sms_code[0];
                var date=new Date();
                date.setTime(date.getTime()+5*60*1000+8*60*60*1000); //设置date为当前时间+5分    改成东八区
                document.cookie=`username = ${this.authcode}; expires=${date.toGMTString()}`;

              }).catch(error => {
              });
            }else{
              alert("请填写正确手机号")
            }
          }


        },
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
    margin-left:-6.50rem;
    margin-top:-3.66rem;
  }
  .login_Left,.login_Right{
    height:100%;
    float: left;
    border-radius: .08rem;
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
  .findpwdfirst_Box{
    width: 100%;
    height:100%;
    box-sizing: border-box;
    padding:.97rem .88rem .78rem .46rem;
  }
  .findpwdfirst{
    width: 100%;
    height:100%;
    position: relative;
  }
  .reset_tit{
    font-size:.3rem;
    font-weight:bold;
    color:rgba(56,81,199,1);
  }
  .modification{
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .reg_lable{
    height:.18rem;
    font-size:.18rem;
    color:rgba(51,51,51,1);
    line-height:.13rem;
  }
  .phone,.new_pas,.old_pas{
    border:0;
    border-bottom: 1px solid rgba(190,190,190,1);
    width: 100%;
    background: #e9e9f3;
    line-height: .32rem;
    margin-bottom: .33rem;
    font-size: .20rem;
    padding-top:.06rem;
  }
  .sub_btn{
    width: 100%;
    height:.6rem;
    background: #3851c7;
    font-size: .2rem;
    color:#fff;
    text-align: center;
    line-height: .6rem;
    border-radius: .24rem;
    margin-top:.67rem;
  }
  input{
    display: block;
  }
</style>
