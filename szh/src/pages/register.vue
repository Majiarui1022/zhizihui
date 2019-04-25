<template>
  <div class="login">
    <div class="login_Index">
      <div class="login_Left">
        <!--注册模块-->
        <section class="register_Section">
          <p class="reg_tit">注册</p>
          <form action="" class="reg_register">
            <p class="reg_lable">真实姓名</p>
            <input type="text" class="S_name" v-model="name">
            <p class="reg_lable">手机号</p>
            <i id="errors" style="font-size: .12rem;display: block;color:red;"></i>
            <div class="zhi" style="position: relative">
              <input type="text" id="user-iphone" class="phone" @blur="zhangh" v-model="userphone">
              <a href="javascript:void(0)" id="getcode" style="position: absolute;right: 0;font-size: .2rem" v-on:click="getyzm">获取验证码{{timeout}}</a>
            </div>
            <p class="reg_lable" v-model="code">验证码</p>
            <input type="text" class="yanz">
            <p class="reg_lable">所属机构</p>
            <div class="zhi">
              <select type="text" class="organ" id="jigou" style="position: relative;display: block" @change="getID">
                <option value="" style="display: none;"></option>
                <option :value="jgnum.name"  class="fqnum":id="jgnum.id"  style="position: absolute;" v-for="(jgnum,index) in jigoudata" :key="index">{{jgnum.name}}</option>
              </select>
            </div>
            <p class="reg_lable">所属分区</p>
            <div class="zhi">
              <select type="text" class="organ" id="fenqu" style="position: relative;display: block" @change="getfqID">
                <option value="" style="display: none;"></option>
                <option value="fqnum.name" v-if="fenqudata"  class="fqnum" :id="fqnum.id"  style="position: absolute;" v-for="(fqnum,index) in fenqudata" :key="index">{{fqnum.name}}</option>
              </select>
            </div>
            <p class="reg_lable">所属服务队</p>
            <div class="zhi">
              <select type="text" class="organ" style="position: relative;display: block" id="fuwudui">
                <option value="" style="display: none;"></option>
                <option value="fwdnum.name" v-if="fuwuduidata"  class="fqnum" :id="fwdnum.id"  style="position: absolute;" v-for="(fwdnum,index) in fuwuduidata" :key="index">{{fwdnum.name}}</option>
              </select>
            </div>
            <input type="button" v-on:click="tijiao" class="register_btn" value="提交">
          </form>
        </section>
      </div>
      <div class="login_Right"></div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "register",
      data(){
          return{
            name:"",         //用户名
            userphone:"",    //用户电话
            errs:"",
            jigoudata:"",    //后端返回机构数据
            jgid:"",         //机构ID
            fenqudata:"",    //后端返回分区数据
            fqid:"",         //分区ID
            fuwuduidata:"",  //后端返回服务队数据
            fwdid:"",         //服务队ID
            authcode :"",    //后端返回验证码
            timeout:"",
            starts:true,
            code:""
          }
      },
      created(){
        this.$axios({
          method: 'get',
          url: 'https://kungfunion.club/manage/teams/',
        }).then(res => {
          this.jigoudata = res.data
        }).catch(error => {
        });
      },
      methods:{
        zhangh(){
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
          if(this.starts && this.code == this.authcode){
            if(this.errs){
              this.starts = false
              this.fwdid = $("#fuwudui option:selected").attr('id');
              let register = {
                name:this.name,
                username:this.userphone,
                serviceteam:this.fwdid,
                sms_code:this.authcode
              }
              this.$axios({
                method: 'post',
                url: `https://kungfunion.club/users/`,
                data:register,
              }).then(res => {
                this.starts = true
                if(res.data.message == 1){
                  alert("注册成功！请等待管理员审核！")
                  this.$router.push('/login')
                }else{
                  alert("注册失败，请稍后再试")
                  return false;
                }
              }).catch(error => {
                alert("未知错误，请稍后重试！！！")
                this.starts = true
                return false;
              });
            }else{
              alert("您输入信息有误，请细心核对！！")
              return false;
            }
          }else{
            return false
          }

        },
        getID(){
          this.jigou = $("#jigou option:selected").attr('id');
          this.$axios({
            method: 'get',
            url: `https://kungfunion.club/manage/teams/${this.jigou}/`,
          }).then(res => {
            this.fenqudata = res.data.sub
          }).catch(error => {
          });
        },
        getfqID(){
          this.jgid = $("#fenqu option:selected").attr('id');
          this.$axios({
            method: 'get',
            url: `https://kungfunion.club/manage/teams/${this.jgid}/`,
          }).then(res => {
            this.fuwuduidata = res.data.sub;
          }).catch(error => {
          });
        },
        getyzm(){
          if(this.timeout != ""){
            return false;
          }else{
            if(this.errs){
              let userphone = $("#user-iphone").val()
              this.timeout = 60
              $("#getcode").css({
                "cursor": "no-drop",
                "color":"#666"
              })
              let timer = setInterval(()=>{
                this.timeout--;
                if(this.timeout == 0){
                  this.timeout = "";
                  $("#getcode").css({
                    "cursor": "pointer",
                    "color":"blue"
                  })
                  clearInterval(timer);
                }
              },1000)
              this.$axios({
                method: 'get',
                url: `https://kungfunion.club/sms_codes/${userphone}/`,
              }).then(res => {
                this.authcode = res.data.sms_code[0];
              }).catch(error => {
              });
            }else{
              alert("请填写正确手机号")
            }
          }


        }
      }
    }
</script>

<style scoped lang="scss">
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
    height:7.8rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left:-6.5rem;
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
  /*注册模块*/
  .register_Section{
    width: 100%;
    height:100%;
    box-sizing: border-box;
    padding:.55rem .88rem .78rem .46rem;
  }
  .reg_tit{
    font-size:.3rem;
    font-weight:bold;
    color:rgba(56,81,199,1);
    margin-bottom: .43rem;
  }
  .reg_lable{
    height:.18rem;
    font-size:.18rem;
    color:rgba(51,51,51,1);
    line-height:.13rem;
  }
  .zone,.serve,.organ,.phone,.S_name,.yanz{
    border:0;
    border-bottom: 1px solid rgba(190,190,190,1);
    width: 100%;
    background: #e9e9f3;
    line-height: .32rem;
    margin-bottom: .33rem;
    font-size: .20rem;
    padding-top:.06rem;
  }
  .register_btn{  width: 100%;
    height:.6rem;
    background: #3851c7;
    font-size: .2rem;
    color:#fff;
    text-align: center;
    line-height: .6rem;
    border-radius: .24rem;
    margin-top:.05rem;
  }
  input{display: block}
  .zhi{
    select{
      position: relative;
      option{
        position: absolute;
        font-size: .2rem;

      }
    }
  }
</style>
