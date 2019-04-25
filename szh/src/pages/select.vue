<template>
    <div class="choose-sel">
      <div class="select-bg">
        <div class="sel-content">
          <p class="sel-con-tit">狮子会爱心基金会</p>
          <div class="sel-menu">
            <div class="show-hou show-con">
              <div class="checked-box aft" v-on:click="checkedOne" ></div>
              <span>狮子会爱心基金后端系统</span>
            </div>
            <div class="show-ji show-con">
              <div class="checked-box"  v-on:click="checkedTwo"></div>
              <span>狮子会爱心基金展示系统</span>
            </div>
            <div class="sle-list-box">
              <select name="" id="productID" class="sle-list" style="background: #EEEEEE" disabled="disabled">
                <option selected="selected" disabled="disabled"  style='display: none' value=''></option>
                <option :value="list.name" :id="list.id" :key="index"  v-for="(list,index) in todaylist">{{list.name}}</option>
              </select>
            </div>
            <a href="javascript:void(0)"  v-on:click="goUrl" class="go-sle">确定</a>
            <div class="unsubscribe"><a to="javascript:void(0)" v-on:click="removeuser" style="cursor: pointer">注销</a></div>
            <div class="get-back"><router-link to="/login">返回</router-link></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "selevt",
      data(){
        return{
          showhou:1,
          showzhan:0,
          todaylist:"",     //当天展示项目
          tokens:"",
          proID:""          //服务队ID
        }
      },
      created(){
        this.token = window.sessionStorage.getItem('tok')
        this.$axios({
          url: 'https://kungfunion.club/projects/samedays/ ',
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utd-8"
          }
        }).then(res => {
          this.todaylist = res.data;
        }).catch(err => {
        });

      },
      mounted(){
        var _that = this;
          $(".checked-box").click(function(_that){
            if(!$(this).hasClass("aft")){
              $(".checked-box").removeClass("aft");
              $(this).addClass("aft");
            }
          });
      },
      methods:{







        checkedOne(){
          this.showzhan = 0;
          this.showhou = 1;
          $(".sle-list").css({
            "background-color":"#EEEEEE",
          })
          $(".sle-list").attr("disabled","disabled")
        },
        checkedTwo(){
          this.showzhan = 1;
          this.showhou = 0;
          $(".sle-list").css({
            "background-color":"",
          })
          $(".sle-list").removeAttr("disabled")
        },
        goUrl(){
          if(this.showhou == 1 && this.showzhan == 0){
            this.$router.push('/informationBackstage')
          }else if(this.showhou == 0 && this.showzhan == 1){
            this.proID = $("#productID option:selected").attr('id');
            // sessionStorage.setItem('proid',this.proID);   //设置传参的项目ID
            if(this.proID == null || this.proID == ""){
              alert('请选择项目')
            }else{
              this.$router.push({
                name:'RaisefundsStart',
                query:{
                  id:this.proID
                }
              })
            }
          }
        },
        removeuser(){
          let kk = confirm("你确定注销当前账户吗？");
          if(kk){
            this.$axios({
              url:'https://kungfunion.club/cancel/active/',
              method: 'get',
              headers: {
                'Authorization':'JWT '+this.token,
                'Accept':"application/json; charset=utd-8"
              }
            }).then(res => {
              window.sessionStorage.clear()
              alert("注销成功")
              this.$router.push({
                name:'Login',
                query:{
                }
              })
            }).catch(err => {
              alert(err);
            });
          }
        },


      }
    }
</script>

<style scoped lang="scss">
.choose-sel{
  width: 100%;
  height:100%;
  .select-bg{
    width: 100%;
    height:100%;
    background: url("../assets/images/bg.png") no-repeat;
    background-size: cover;
    .sel-content{
      width:5.95rem;
      height:7.33rem;
      background:rgba(232,233,242,1);
      box-shadow:.04rem .04rem .09rem .01rem rgba(6,12,39,0.39);
      border-radius:.10rem;
      box-sizing: border-box;
      padding-top:1.19rem;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -2.975rem;
      margin-top:-3.665rem;
      background: url("../assets/images/bj8.png") no-repeat;
      background-size: cover;
      .sel-con-tit{
        font-size:.3rem;
        font-weight:bold;
        color:rgba(34,51,128,1);
        text-align: center;
        margin-bottom: .81rem;
      }
      .show-con{
        overflow: hidden;
        text-align: center;
        margin-bottom: .32rem;
        display: flex;
        justify-content: center;
        div,span{
          display: inline-block;
          vertical-align: middle;
          position: relative;
        }
        .checked-box{
          width:.3rem;
          height:.3rem;
          border:3px solid rgba(56,81,199,1);
          border-radius:50%;
          margin-right: .26rem;
          cursor: pointer;
        }
        span {
          font-size: .24rem;
          color: rgba(56, 81, 199, 1);
        }
        .aft:after{
          content:"";
          width:.14rem;
          height:.14rem;
          background:rgba(56,81,199,1);
          border-radius:50%;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top:-.07rem;
          margin-left:-.07rem;
        }
      }
      .sle-list-box{
        select{
          appearance:none;
          -moz-appearance:none;
          -webkit-appearance:none;
        }
        .sle-list{
          width:3.97rem;
          height:.45rem;
          border:1px solid rgba(56,81,199,1);
          border-radius:.23rem;
          display: block;
          margin:0 auto;
          text-indent: .25rem;
          font-size: .20rem;
          option{
            font-size: .20rem;
            padding-left: .25rem;
          }
        }
      }
      .go-sle{
        width:4rem;
        height:.6rem;
        background:rgba(56,81,199,1);
        box-shadow:.04rem .04rem .09rem .01rem rgba(6,12,39,0.2), -.04rem -.04rem .09rem .01rem rgba(6,12,39,0.2);
        border-radius:.3rem;
        display: block;
        margin:0 auto;
        text-align: center;
        line-height: .6rem;
        font-size:.2rem;
        color:rgba(255,255,255,1);
        position: absolute;
        bottom: 1.19rem;
        left: .98rem;
      }
      .unsubscribe{
        position: absolute;
        left: .46rem;
        bottom: .18rem;
      }
      .get-back{
        position: absolute;
        right: .31rem;
        bottom: .18rem;
      }
      .unsubscribe,.get-back a{
          display: block;
          font-size:.22rem;
          color:rgba(56,81,199,1);
      }
    }
  }
}
</style>
