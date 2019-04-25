<template>
  <div class="main">
    <div class="main-tit">
      <div class="list-tit">
        <div class="list-tit-left">
          <p class="list-tit-left-words">人员列表</p>
        </div>
        <div class="list-tit-right">
          <div class="search-list">
            <input type="text" class="search-words" @blur="diaoyong" v-model="searchpro" placeholder="搜索">
            <a href="javascript:void(0)" class="go-search" v-on:click="startSearch"><span class="iconfont">&#xe625;</span></a>
          </div>
        </div>
      </div>
      <div class="select-state">
        <div class="make-timers">
          <span class="time-tit">机构</span>
          <select name="" id="jigou" @change="makefq">
            <option value="" style="display: none"></option>
            <option :value="val.name" :id="val.id" v-for="(val,index) in jigou" :key="index">{{val.name}}</option>
          </select>
        </div>
        <div class="make-timers">
          <span class="time-tit">分区</span>
          <select name="" id="sel-fenqu" @change="makefwd">
            <option value="" style="display: none"></option>
            <option :value="val.name" :id="val.id"  v-for="(val,index) in fenqu" :key="index">{{val.name}}</option>
          </select>
        </div>
        <div class="make-timers">
          <span class="time-tit">服务队</span>
          <select name="" id="sel-fuwudui" @change="changefwd">
            <option value="" style="display: none"></option>
            <option :value="val.name" :id="val.id"  v-for="(val,index) in fuwudui" :key="index">{{val.name}}</option>
          </select>
        </div>
      </div>
      <div class="reset-btn">
        <span class="reset-empty" v-on:click="resetlist">重置</span>
        <span class="fine" v-on:click="sendData">确定</span>
      </div>
    </div>
    <table border="0" cellpadding="0" cellspacing="0">
      <tbody>
      <tr>
        <th style="width: 2rem;">姓名</th>
        <th style="width: 3rem;">联系方式</th>
        <th colspan="5" style="width: 2rem;text-align: left">所在服务队</th>
        <th style="text-align: left">状态</th>
      </tr>
      <tr v-for="(val,index) in allper" :key="index">
      <td style="width: 2rem;">{{val.name}}</td>
      <td style="width: 3rem;">{{val.username}}</td>
      <td colspan="5" style="width: 2rem;text-align: left">{{val.serviceteam}}</td>
      <td style="text-align: left" :class="val.is_active == true?'isyes':'isno'">{{val.active_ing}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        name: "SuperPersonlist",
      data(){
          return{
            token:"",
            beiallper:"",     //备用
            allper:"",       //全部人员
            searchpro:"",    //搜索人员
            serviceID:"",    //搜索服务队ID
            jigou:"",        //所有机构
            fenqu:"",        //所有分区
            fuwudui:"",       //服务队
            jigouID:"",       //查询分区提供的机构ID
            fenquID:"",        //查询服务队提供的分区ID
            zhongzhuan:""
          }
      },
      created(){
          this.token = window.sessionStorage.getItem('tok')
        this.$axios({
          url: `https://kungfunion.club/manage/users/ `,
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utf-8",
            // 'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res.data);
          this.allper = res.data;
          this.zhongzhuan  = this.allper;
        for(var i= 0; i <this.allper.length;i++){
          if(this.allper[i].is_active == true){
            this.allper[i].active_ing = "是"
          }else if(this.allper[i].is_active == false){
            this.allper[i].active_ing = "否"
          }
        }

          this.beiallper = res.data;
        }).catch(err => {
          console.log(err);
        });             //初始所有

        this.$axios({
          url: `https://kungfunion.club/manage/teams/ `,
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utf-8",
            // 'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res.data);
          this.jigou = res.data;
        }).catch(err => {
          console.log(err);
        });            //获取机构

    },
      methods:{
        diaoyong(){
          if(this.searchpro == ""){
            this.allper = this.zhongzhuan;
          }
        },
        startSearch(){
          console.log(this.searchpro)
          this.$axios({
            url: `https://kungfunion.club/manage/search/users?name=${this.searchpro} `,
            method: 'get',
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utf-8",
              // 'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res.data);
            this.allper = res.data;
            for(var i= 0; i <this.allper.length;i++) {
              if (this.allper[i].is_active == true) {
                this.allper[i].active_ing = "是"
              } else if (this.allper[i].is_active == false) {
                this.allper[i].active_ing = "否"
              }
            }
          }).catch(err => {
            console.log(err);
          });
        },          //搜索
        makefq(){
          this.jigouID = $("#jigou option:selected").attr('id');
          this.$axios({
            url: `https://kungfunion.club/manage/teams/${this.jigouID}/ `,
            method: 'get',
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utf-8",
              // 'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res.data.sub);
            this.fenqu = res.data.sub
          }).catch(err => {
            console.log(err);
          });
        },     //获取分区
        makefwd(){
          this.jigouID = $("#sel-fenqu option:selected").attr('id');
          this.$axios({
            url: `https://kungfunion.club/manage/teams/${this.jigouID}/ `,
            method: 'get',
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utf-8",
              // 'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res.data.sub);
            this.fuwudui = res.data.sub
          }).catch(err => {
            console.log(err);
          });
        },                                   //获取服务队
        changefwd(){
          this.fenquID = $("#sel-fuwudui option:selected").attr('id');
          console.log(this.fenquID)
          },
        sendData(){
          console.log(this.fenquID)
          this.$axios({
            url: `https://kungfunion.club/manage/serviceteam/users?serviceteam=${this.fenquID} `,
            method: 'get',
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utf-8",
              // 'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res.data);
            this.allper = res.data
            for(var i= 0; i <this.allper.length;i++) {
              if (this.allper[i].is_active == true) {
                this.allper[i].active_ing = "是"
              } else if (this.allper[i].is_active == false) {
                this.allper[i].active_ing = "否"
              }
            }
          }).catch(err => {
            console.log(err);
          });
        },                         //发送服务队ID
        resetlist(){
          this.jigou = this.fenqu = this.fuwudui = this.searchpro = "";
          this.allper = this.beiallper;
          this.$axios({
            url: `https://kungfunion.club/manage/teams/ `,
            method: 'get',
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utf-8",
              // 'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res.data);
            this.jigou = res.data;
          }).catch(err => {
            console.log(err);
          });            //获取机构
        },
        //失焦

      }
    }
</script>

<style scoped lang="scss">
  .main{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:.09rem .13rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem .03rem .07rem 0rem rgba(0, 0, 0, 0.38);
    border-radius:.04rem;
  }
  .main-tit{
    width: 100%;
    padding:.22rem .51rem .15rem .18rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .list-tit{
    width: 100%;
    overflow: hidden;
  }
  .list-tit-left{
    overflow: hidden;
  }
  .list-tit-left p{
    font-size:.24rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    float: left;
  }
  .add-product span{
    font-size:.14rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    position: absolute;
    top: .05rem;
    right: .11rem;
  }
  .list-tit-right{
    overflow: hidden;
    margin-top: -.1rem;
  }
  .search-list{
    float: right;
  }
  .search-words{
    width: 2.4rem;
    height:.38rem;
    font-size:.16rem;
    font-weight:400;
    color:rgba(165,165,165,1);
    line-height:.38rem;
    text-indent: .21rem;
    border:1px solid rgba(33,131,121,1);
    border-radius:1px;
    float: left;
  }
  .go-search{
    width: .57rem;
    height:.4rem;
    background:rgba(33,131,121,1);
    border-radius:1px;
    float: right;
    text-align: center;
    span{
      display: block;
      font-size: .22rem;
      color: #fff;
      line-height: .4rem;
    }
  }
  .select-state{
    width: 100%;
    margin-bottom: .16rem;
    overflow: hidden;
  }
  .make-timers{
    float: left;
    margin-right: .3rem;
  }
  .make-timers select{
    min-width: 1rem;
    float: left;
    font-size:.18rem;
  }
  .make-timers select option{
    font-size:.18rem;
  }
  .inp-time{
    width:1.98rem;
    height:.28rem;
    border:1px solid rgba(33,131,121,1);
    border-radius:2px;
    float: left;
  }
  .time-tit{
    font-size:.16rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:.3rem;
    margin-right: .08rem;
    float: left;
  }
  .reset-btn{
    float: right;
    overflow: hidden;
  }
  .reset-btn span{
    width:.8rem;
    height:.36rem;
    font-size:.16rem;
    font-weight:400;
    line-height:.36rem;
    float: left;
    text-align: center  ;
    border:1px solid rgba(33,131,121,1);
    border-radius:.02rem;
    margin-left: .21rem;
    cursor: pointer;
  }
  .reset-empty{
    color:rgba(33,131,121,1);
  }
  .fine{
    background:rgba(33,131,121,1);
    color:rgba(255,255,255,1);
  }
  table{
    width: 100%;
  }
  td,th{
    height:.6rem;
    line-height: .6rem;
    font-size:.14rem;
    font-weight:400;
    text-align: center;
  }
  table tbody th{
    color:rgba(255,255,255,1);
    background:rgba(33,131,121,1);
    text-align: left;
    text-indent: .29rem;
  }
  table tbody tr a{
    text-decoration:underline;
  }
  td{
    color:rgba(51,51,51,1);
    text-align: left;
    text-indent: .29rem;
  }
  tbody tr:nth-child(2n){
    background:rgba(233,247,246,1);
  }
  tbody tr td:first-child{
    color:rgba(33,131,121,1);
  }
  .isyes{
    color:#0EA495;
  }
  .isno{
    color:#E30005;
  }
  /*弹窗*/
  .news{
    width: 4.98rem;
    height:6rem;
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
          a{
            display: inline-block;
            width: .54rem;
            height:.20rem;
            border-radius:2px;
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
</style>
