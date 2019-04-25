<template>
    <div class="S_information">
      <header>
        <div class="header-nav-content">
          <a href="javascript:void(0)" v-on:click="backlogin"><span class="iconfont close-back">&#xe600;</span><span>退出</span></a>
        </div>
      </header>
      <section>
        <div class="section-menu">
          <div class="menu-left">
            <div class="nav">
              <ul class="nav-list">
                <li v-for="(val,idx) in allData" :key="idx">
                  <span><router-link v-on:click.native="changeClass(idx)" :to="val.url">{{val.tit}}</router-link></span>
                </li>
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
        name: "information",
      data(){
          return{
            allData:[]
          }
      },
      created(){
        this.axiosTest();

        setTimeout(()=>{
          this.initClass();
        },100)

      },
      methods:{
        axiosTest(){
          this.$axios({
            method: 'get',
            url: "../../static/data/list.json",
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
        backlogin(){
          let kk = confirm("您确定退出吗？")
          if(kk){
            window.sessionStorage.clear();
            this.$router.push('/login')
          }
        }
      }
    }
</script>

<style scoped>
.S_information{
  width: 100%;
  height:100%;
}
  header{
    width: 100%;
    height:.7rem;
    background:rgba(7,55,50,1);
    box-shadow:0rem .03rem .03rem 0rem rgba(12,3,6,0.28);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .header-nav-content{
    float: right;
  }
.header-nav-content a{
  display: block;
  overflow: hidden;
  float: right;
}
  .header-nav-content a:first-child{
    margin-right: .37rem;
  }
  .header-nav-content a span{
    font-size:.19rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-right: .37rem;
    line-height: .70rem;
    float: left;
  }
  .header-nav-content a .close-back{
    font-size: .29rem;
    margin-right: .15rem;
  }
  section{
    width: 100%;
    height:100%;
    box-sizing: border-box;
    padding-top: .70rem;
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
    line-height: .81rem;
    position: relative;
    text-align: center;
  }
.nav-list li span a{
  font-size:.18rem;
  font-weight:400;
  color:rgba(153,153,153,1);
  cursor: pointer;
  display: block;
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
</style>
