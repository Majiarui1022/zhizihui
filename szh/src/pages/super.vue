<template>
  <div class="S_information">
    <div class="bg-shadow"></div>
    <!--消息弹窗-->
    <div class="news">
      <p class="news-tit">消息<span v-on:click="hidNews">x</span></p>
      <div class="news-cont">
        <ul>
          <li :id="val.user" v-for="(val,index) in applyfor" :key="index">
            <p>{{val.name}}</p>
            <div class="sure-not">
              <a href="javascript:void(0)" class="sure" v-on:click="sendnews(index,1,val.user,val.id)">同意</a>
              <a href="javascript:void(0)" class="not" v-on:click="sendnews(index,0,val.user,val.id)">不同意</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <header>
      <div class="header-nav-content">
        <a href="javascript:void(0)" v-on:click="showNews"><span class="iconfont">&#xe622;</span><em class="icon-tit-num" v-if="applyfor.length">{{applyfor.length}}</em><i>消息</i></a>
        <a href="javascript:void(0)" v-on:click="quit"><span class="iconfont">&#xe600;</span><i>退出</i></a>
      </div>
    </header>
    <section>
      <div class="section-menu">
        <div class="menu-left">
          <div class="nav">
            <ul class="nav-list">
              <li v-for="(val,idx) in allData" :key="idx">
                <span v-on:click="changeClass(idx)"><span class="iconfont icon-img">&#xe67b;</span><router-link :to="val.url">{{val.tit}}</router-link></span>
              </li>
              <!--<li class="active">-->
              <!--<span><router-link to="informationPres">狮子会介绍</router-link></span>-->
              <!--</li>-->
            </ul>
          </div>
        </div>
        <div class="menu-right">
          <div class="menu-long">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    export default {
        name: "super",
      data(){
        return{
          allData:[],
          token:"",         //密码
          applyfor:"",     //新的申请
        }
      },
      created(){
          this.token = window.sessionStorage.getItem('tok')
        this.axiosTest();

        setTimeout(()=>{
          this.initClass();
        },100)



        this.$axios({
          url: 'https://kungfunion.club/manage/messages/',
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utf-8",
            // 'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          this.applyfor = res.data
        }).catch(err => {
        });

      },
      methods:{
        axiosTest(){
          this.$axios({
            method: 'get',
            url: "../../static/data/superAdmin.json",
          }).then((response) => {
            this.allData = response.data

          }).catch(err =>{
          })
        },
        initClass(){
          $(".nav-list").children("li").eq(0).addClass("active")
        },
        changeClass(idx){
          if(!$(".nav-list").children("li").eq(idx).hasClass("active")){
            $(".nav-list").children("li").removeClass("active");
            $(".nav-list").children("li").eq(idx).addClass("active");
          }
        },
        showNews(){

          $(".bg-shadow").css("display","block");
          $(".news").css("display","block");
        },

        hidNews(){
          $(".bg-shadow").css("display","none")
          $(".news").css("display","none")
        },
        sendnews(index,val,userid,newsid){
          this.$axios({
            method: 'get',
            url: `https://kungfunion.club/manage/status/?user_id=${userid}&message_id=${newsid}&is_agree=${val}`,
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utf-8",
              // 'Content-Type': 'multipart/form-data'
            },
          }).then((res) => {
            this.applyfor.splice(index,1)
          }).catch(err =>{
          })
        },
        quit(){
          let kk = confirm("你确定退出当前登陆吗？")
          if(kk){
            window.sessionStorage.clear()
            this.$router.push('/login')
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .S_information{
    width: 100%;
    height:100%;
  }
  header{
    width: 100%;
    height:.7rem;
    background:rgba(7,55,50,1);
    box-shadow:0 .03rem .03rem 0 rgba(12,3,6,0.28);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .header-nav-content{
    float: right;
    display: flex;
  }
  .header-nav-content a{
    position: relative;
    display: flex;
    align-items: center;
  }
  .icon-tit-num{
    position: absolute;
    display: block;
    width:.16rem;
    height:.16rem;
    left: .25rem;
    top: .15rem;
    background:rgba(236,0,33,1);
    border-radius:50%;
    text-align: center;
    line-height: .16rem;
    font-size: .12rem;
    color:rgba(255,255,255,1);
  }
  .header-nav-content a i{
    font-size:.19rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-right: .34rem;
    line-height: .70rem;
    margin-left: .15rem;
  }
  .header-nav-content a span{
    font-size: .33rem;
    vertical-align: middle;
    color:#fff;
  }
  section{
    width: 100%;
    height:100%;
    box-sizing: border-box;
    padding-top: .7rem;
  }
  .section-menu{
    width: 100%;
    height:100%;
  }
  .menu-left{
    width: 2.83rem;
    height:100%;
    z-index: 5;
    background:rgba(7,55,50,1);
    float: left;
    position: fixed;
    left: 0;
    top: .7rem;
  }
  .nav-list{
    width: 100%;
  }
  .nav-list li{
    width: 100%;
    height:.81rem;
    line-height: .81rem;
    position: relative;
    text-align: center;
    span{
      display: flex;
      flex-direction: column;
      line-height: .81rem;
    }
  }
  .icon-img{
    font-size: .26rem;
    color:#fff;
    position: absolute;
    left: .35rem;
  }
  .nav-list li span a{
    font-size:.18rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    cursor: pointer;
  }
  .active{
    background:rgba(17,130,118,1);
  }
  .nav-list .active span a{
    color:rgba(255,255,255,1);
  }
  .menu-right{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 2.83rem;
  }
  .menu-long{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:.09rem .13rem;
    overflow-y: auto;
    min-height:9.49rem;
  }
  /*阴影*/
  .bg-shadow{
    width: 100%;
    height: 100%;
    z-index: 1000;
    background:rgba(51,51,51,1);
    opacity:0.4;
    position: fixed;
    left: 0;
    top: 0;
    display: none;
  }
  /*弹窗*/
  .news{
    width: 4.98rem;
    height:6.00rem;
    background:rgba(255,255,255,1);
    border-radius:.1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top:-3rem;
    margin-left:-2.49rem;
    z-index: 9999;
    display: none;
  }
  .news-tit{
    width: 100%;
    height:.5rem;
    background:rgba(85,180,170,1);
    text-align: center;
    font-size:.24rem;
    color:rgba(255,255,255,1);
    line-height:.5rem;
    span{
      font-size: .22rem;
      float: right;
      margin-right: .17rem;
      cursor: pointer;
    }
  }
  .news-cont{
    width: 100%;
    height: 100%;
    ul{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding:.22rem .42rem 0 .49rem;
      li:last-child{
        border:0;
      }
      li{
        width: 100%;
        padding-top:.17rem;
        overflow: hidden;
        border-bottom: 1px solid rgba(222,243,235,1);
        padding-bottom:.19rem;
        p{
          max-width:3.21rem;
          font-size:.16rem;
          color:rgba(51,51,51,1);
          margin-bottom: .16rem;
          span{
            display: block;
            font-size:.16rem;
          }
        }
        .sure-not{
          float: right;
          display: flex;
          width: 118px;
          justify-content: space-between;
          a{
            display: inline-block;
            width: .54rem;
            height:.20rem;
            border-radius:2rem;
            color:rgba(255,255,255,1);
            font-size: .12rem;
            text-align: center;
          }
          .sure{
            background:rgba(47,186,172,1);
          }
          .not{
            background:rgba(201,40,82,1);
          }
        }
      }
    }
  }
</stylescoped>
