<template>

  <div class="main">
    <div class="zhezhao-c"></div>
    <div class="main-tit">
      <div class="list-tit">
        <div class="list-tit-left">
          <p class="list-tit-left-words">服务队列表</p>
        </div>
        <div class="list-tit-right">
          <div class="search-list">
            <!--<input type="text" class="search-words" placeholder="搜索">-->
            <!--<a href="javascript:void(0)" class="go-search"><span class="iconfont">&#xe625;</span></a>-->
          </div>
        </div>
      </div>
      <div class="select-state">
        <div class="make-timers">
          <a href="javascript:void(0)" class="add-service" v-on:click="showBG"><span class="iconfont add-ser-img">&#xe618;</span>添加机构</a>
        </div>

        <div class="make-timers">
          <a href="javascript:void(0)" class="add-service" v-on:click="fenqushow"><span class="iconfont add-ser-img">&#xe618;</span>添加分区</a>
        </div>

        <div class="make-timers">
          <a href="javascript:void(0)" class="add-service" v-on:click="fwdshow"><span class="iconfont add-ser-img">&#xe618;</span>添加服务队</a>
        </div>
      </div>
    </div>
    <!--<table border="0" cellpadding="0" cellspacing="0">-->
      <!--<tbody>-->
      <!--<tr>-->
        <!--<th style="width: 2rem;">所属机构</th>-->
        <!--<th style="width: 3rem;">所属分区</th>-->
        <!--<th colspan="5" style="width: 2rem;">服务队名称</th>-->
        <!--<th>操作</th>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td style="width: 2rem;">xx机构</td>-->
        <!--<td style="width: 3rem;">xx分区</td>-->
        <!--<td colspan="5" style="width: 2rem;">杭州服务队</td>-->
        <!--<td class="is-true">-->
          <!--<a href="javascript:void(0)" class="bian">编辑</a>-->
          <!--<a href="javascript:void(0)" class="remove">删除</a>-->
        <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td style="width: 2rem;">xx机构</td>-->
        <!--<td style="width: 3rem;">xx分区</td>-->
        <!--<td colspan="5" style="width: 2rem;">杭州服务队</td>-->
        <!--<td class="is-true">-->
          <!--<a href="javascript:void(0)" class="bian">编辑</a>-->
          <!--<a href="javascript:void(0)" class="remove">删除</a>-->
        <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td style="width: 2rem;">xx机构</td>-->
        <!--<td style="width: 3rem;">xx分区</td>-->
        <!--<td colspan="5" style="width: 2rem;">杭州服务队</td>-->
        <!--<td class="is-true">-->
          <!--<a href="javascript:void(0)" class="bian">编辑</a>-->
          <!--<a href="javascript:void(0)" class="remove">删除</a>-->
        <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
    <!--</table>-->
    <div class="addfwd-tan">
      <div class="addfwd-tit">机构 <span class="close-tan" v-on:click="closehan">X</span></div>
      <div class="addfuw" style="display: flex;align-items: center">
        <label>添加机构</label>
        <input type="text" v-model="jigouvalue">
      </div>
      <a href="javascript:void(0)" class="okss" v-on:click="addjigou">确定</a>
    </div>
    <div class="addfq-tan showfq">
      <div class="addfwd-tit">机构 <span class="close-tan" v-on:click="closefenqu">X</span></div>
      <div class="addfuw">
        <div class="zhi" style="text-align: center;margin-bottom: .1rem">
          <label>所属机构</label>
          <select name="" id="jg" style="z-index: 999999;width: 217px;height:38px;border-radius: 4px;border: 1px solid #DCDFE6;">
            <option value="" style="display: none"></option>
            <option :id="val.id" :value="val.name" v-for="(val,index) in jigoulist" :key="index">{{val.name}}</option>
          </select>
        </div>
        <div class="zhi" style="display: flex;justify-content: center">
          <label style="margin-right: .3rem;">所属分区</label>
          <input type="text" style="width: 217px;height:38px;border-radius: 4px;border: 1px solid #DCDFE6;" v-model="fenquword">
        </div>
        <a href="javascript:void(0)" class="okss" v-on:click="sendaddpro">确定</a>
      </div>
    </div>
    <div class="addfq-tan showfwd">
      <div class="addfwd-tit">机构 <span class="close-tan" v-on:click="closefud">X</span></div>
      <div class="addfuw" style="display: flex;flex-direction: column;align-items: center;justify-content: center">
        <div class="zhi" style="text-align: center;margin-bottom: .1rem;display: flex;align-items: center;justify-content: center">
          <label style="margin-right: .1rem;margin-bottom: .1rem;">所属机构</label>
          <select name="" @change="getfq" id="fwd_jgid" style="z-index: 999999;width: 217px;height:38px;border-radius: 4px;border: 1px solid #DCDFE6;">
            <option value="" style="display: none;"></option>
            <option :id="val.id" :value="val.name" v-for="(val,index) in jigoulist" :key="index">{{val.name}}</option>
          </select>
        </div>
        <div class="zhi" style="text-align: center;margin-bottom: .1rem;display: flex;align-items: center;justify-content: center">
          <label style="margin-right: .1rem;margin-bottom: .1rem;">所属分区</label>
          <select name="" id="fwd_fqid" style="z-index: 999999;width: 217px;height:38px;border-radius: 4px;border: 1px solid #DCDFE6;">
            <option value="" style="display: none;"></option>
            <option :id="val.id" :value="val.name" v-for="(val,index) in fenquist" :key="index">{{val.name}}</option>
          </select>
        </div>
        <div class="zhi" style="display: flex;justify-content: center;align-items: center">
          <label style="margin-right: .1rem;margin-bottom: .1rem;">所属服务队</label>
          <input type="text" style="width: 217px;height:38px;border-radius: 4px;border: 1px solid #DCDFE6;" v-model="fuwuduiword">
        </div>
        <a href="javascript:void(0)" class="okss" v-on:click="sendaddfwd">确定</a>
      </div>
    </div>
    <div>
      <!--<el-tree-->
        <!--:data="tal"-->
        <!--:props="defaultProps"-->
        <!--accordion-->
        <!--@node-click="handleNodeClick">-->
      <!--</el-tree>-->
      <div class="select-state" style="text-indent: .1rem">
        <div class="make-timers">
          <span class="time-tit">机构</span>
          <select name="" id="jigou" @change="makefq" style="width: 1rem">
            <option value="" style="display: none"></option>
            <option :value="val.name" :id="val.id" v-for="(val,index) in jigou" :key="index">{{val.name}}</option>
          </select>
        </div>
        <div class="make-timers">
          <span class="time-tit">分区</span>
          <select name="" id="sel-fenqu" @change="makefwd"  style="width: 1rem">
            <option value="" style="display: none"></option>
            <option :value="val.name" :id="val.id"  v-for="(val,index) in fenqu" :key="index">{{val.name}}</option>
          </select>
        </div>
        <div class="make-timers">
          <span class="time-tit">服务队</span>
          <select name="" id="sel-fuwudui" @change="changefwd" style="width: 1rem">
            <option value="" style="display: none"></option>
            <option :value="val.name" :id="val.id"  v-for="(val,index) in fuwudui" :key="index">{{val.name}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SuperAdministration",
      data(){
          return {
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            value: '',
            input: "",
            tal: [],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            token:"",
            jigouvalue:"",       //添加机构value




            jigoulist:[],           //初始获取所有机构




            jgid:"",                 //选中的机构ID
            fenquword:"",             //用户输入的分区



            fenquist:[],            //初始获取所有分区
            fudjgid:'',             // 服务队弹窗选中机构的ID
            fudfqid:'',              // 服务队弹窗选中分区的ID
            fuwuduiword:"",           //用户输入的服务队


            jigou:"",        //所有机构
            fenqu:"",        //所有分区
            fuwudui:"",       //服务队
          }
      },
      created(){
          var that = this;
          this.token = window.sessionStorage.getItem('tok')
        this.$axios({
          url: `https://kungfunion.club/manage/allteams/`,
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utf-8",
            // 'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res.data);
          this.tal = res.data
          var bbb= JSON.parse(JSON.stringify(this.tal).replace(/name/g,"lable"));
          var ccc= JSON.parse(JSON.stringify(bbb).replace(/sub/g,"children"));
          console.log(ccc)
          this.tal = ccc;
          console.log(this.tal)



        }).catch(err => {
          // console.log(this.tal)
          console.log(err);
        });
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
      mounted(){
        console.log(this.tal)
    },
      methods:{
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
          }).catch(err => {
            console.log(err);
          });
        },

        // 添加机构
        addjigou(){
          this.$axios({
            url: `https://kungfunion.club/manage/c_teams/`,
            method: 'post',
            data:{
              name:this.jigouvalue,
              classify:1,
            },
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utf-8",
              // 'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res.data);
            alert("添加成功")
            this.$router.push('/superAdministration')
          }).catch(err => {
            console.log(err);
          });

        },




          // 控制机构模块
        showBG(){
          $(".addfwd-tan").css("display","block");
          $(".bg-shadow").css("display","block");
        },
        closehan(){
          $(".addfwd-tan").css("display","none");
          $(".bg-shadow").css("display","none");
        },

        // 控制分区模块
        fenqushow(){
          $(".showfq").css("display","block");
          $(".bg-shadow").css("display","block");
            console.log(this.jigoulist)
          if(this.jigoulist.length == 0 || this.jigoulist == null) {
            this.$axios({
              url: `https://kungfunion.club/manage/teams/`,
              method: 'get',
              headers: {
                'Authorization': 'JWT ' + this.token,
                'Accept': "application/json; charset=utf-8",
                // 'Content-Type': 'multipart/form-data'
              }
            }).then(res => {
              console.log(res.data);
              this.jigoulist = res.data
              console.log(this.val)
            }).catch(err => {
              console.log(err);
            });
          }
        },
        closefenqu(){
          $(".showfq").css("display","none");
          $(".bg-shadow").css("display","none");
        },

        //控制服务队模块
        fwdshow(){
          $(".showfwd").css("display","block");
          $(".bg-shadow").css("display","block");

          //首先获取所有机构
            this.$axios({
              url: `https://kungfunion.club/manage/teams/`,
              method: 'get',
              headers: {
                'Authorization': 'JWT ' + this.token,
                'Accept': "application/json; charset=utf-8",
                // 'Content-Type': 'multipart/form-data'
              }
            }).then(res => {
              console.log(res.data);
              this.jigoulist = res.data
            }).catch(err => {
              console.log(err);
            });



        },


        //服务队弹窗   选中机构时触发此事件
        getfq(){
          this.fudjgid = $("#fwd_jgid option:selected").attr('id');
          console.log(this.fudjgid)
            this.$axios({
              url: `https://kungfunion.club/manage/teams/${this.fudjgid}/`,
              method: 'get',
              headers: {
                'Authorization': 'JWT ' + this.token,
                'Accept': "application/json; charset=utf-8",
                // 'Content-Type': 'multipart/form-data'
              }
            }).then(res => {
              console.log(res.data.sub);
              this.fenquist = res.data.sub
            }).catch(err => {
              console.log(err);
            });
        },
        closefud(){
          $(".showfwd").css("display","none");
          $(".bg-shadow").css("display","none");
        },
        //添加分区
        sendaddpro(){
          this.jgid = $("#jg option:selected").attr('id');
          console.log(this.jgid)



          this.$axios({
            url: `https://kungfunion.club/manage/c_teams/`,
            method: 'post',
            data:{
              name:this.fenquword,
              classify:2,
              parent:this.jgid
            },
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utf-8",
              // 'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res.data);
            alert("添加成功")
            this.$router.push('/superAdministration')
          }).catch(err => {
            console.log(err);
          });



        },

        // 添加服务队
        sendaddfwd(){
          this.fudfqid = $("#fwd_fqid option:selected").attr('id');
          console.log(this.fudfqid)


          this.$axios({
            url: `https://kungfunion.club/manage/c_teams/`,
            method: 'post',
            data:{
              name:this.fuwuduiword,
              classify:3,
              parent:this.fudfqid
            },
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utf-8",
              // 'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res.data);
            alert("添加成功")
            this.$router.push('/superAdministration')
          }).catch(err => {
            console.log(err);
          });
        }
      }
    }
</script>

<style scoped lang="scss">
  .select-state{
  }
  .main{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:.09rem .13rem;
    background:rgba(255,255,255,1);
    box-shadow:0 .03rem .07rem 0 rgba(0, 0, 0, 0.38);
    border-radius:.04rem;
  }
  .main-tit{
    width: 100%;
    padding:.22rem .51rem .15rem .18rem;
    box-sizing: border-box;
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
    height:.3609rem;
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
    float: left ;
  }
  .go-search{
    width: .57rem;
    height:.4rem;
    background:rgba(33,131,121,1);
    border-radius:1px;
    float: right;
    text-align: center;
    span{
      font-size: .22rem;
      color: #fff;
      line-height: .4rem;
    }
  }
  .add-service{
    background:rgba(68,160,151,1);
    border-radius:.15rem;
    font-size:.14rem;
    color:rgba(255,255,255,1);
    padding:.03rem .13rem .04rem .04rem;
    float: left;
    .add-ser-img{
      margin-right: .1rem;
      vertical-align: middle;
      font-size: .22rem;
    }
  }

  .select-state{
    width: 100%;
    margin-bottom: .16rem;
    overflow: hidden;
  }
  .make-timers{
    float: left;
    margin-right: .2rem;
  }
  .inp-time{
    width:1.98rem;
    height:.28rem;
    border:1px solid rgba(33,131,121,1);
    border-radius:.02rem;
  }
  .time-tit{
    font-size:.16rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:.3rem;
    margin-right: .08rem;
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
  .is-true{
    color:#0EA495;
    .bian{
      font-size:.14rem;
      color:rgba(33,131,121,1);
      text-decoration: none;
      margin-right: .31rem;
    }
    .remove{
      font-size:.14rem;
      color:rgba(255,40,55,1);
      text-decoration: none;
    }
  }
  .is-false{
    color:#E30005;
  }
  .addfq-tan{
    width:4.98rem;
    height:3.96rem;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -2.46rem;
    margin-top: -1.98rem;
    border-radius: .08rem;
    z-index: 10000;
    .addfwd-tit{
      width: 100%;
      height:.5rem;
      background: #55B5AA;
      font-size: .24rem;
      text-align: center;
      line-height: .6rem;
      color:#fff;
      .close-tan{
        position: absolute;
        right: .2rem;
        top:0;
        font-size: .3rem;
        color:#fff;
        cursor: pointer;
      }
    }
    .addfuw{
      width: 100%;
      height:3rem;
    }
    label{
      font-size: .2rem;
    }
  }
  .addfwd-tan{
    width:4.98rem;
    height:3.96rem;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -2.46rem;
    margin-top: -1.98rem;
    border-radius: .08rem;
    z-index: 10000;
    display: none;
    .addfuw{
      width: 100%;
      height:2.47rem;
      display: flex;
      align-items: center;
      justify-content: center;
      label{
        width: .9rem;
        line-height: .3rem;
        font-size: .2rem;
        color:#56b3ab;
        float: left;
      }
      input{
        height: .4rem;
        font-size: .2rem;
      }
    }
    .addfwd-tit{
      width: 100%;
      hegiht:.5rem;
      background: #55B5AA;
      font-size: .24rem;
      text-align: center;
      line-height: .6rem;
      color:#fff;
      .close-tan{
        position: absolute;
        right: .2rem;
        top:0;
        font-size: .3rem;
        color:#fff;
        cursor: pointer;
      }
    }
    .addipt-list{
      width: 100%;
      height:3.47rem;
      box-sizing: border-box;
      padding-top:.17rem;
      padding-left: .3rem;
      .zhijia{
        overflow: hidden;
        display: flex;
        margin-bottom: .24rem;
        label{
          width: .9rem;
          line-height: .3rem;
          font-size: .14rem;
          color:#56b3ab;
          float: left;
        }
        .add-logolist{
          float: left;
          ul{
            overflow: hidden;
            li{
              width: .64rem;
              height:.64rem;
              float: left;
              position: relative;
              margin-right: .08rem;
              margin-bottom: .08rem;
              img{
                width: .6rem;
                height:.6rem;
                display: block;
              }
              a{
                position: absolute;
                right: 0rem;
                bottom:0rem;
                font-size: .14rem;
                color:#e70908;
              }
            }
          }
        }
        .add-photo-box{
          .add-photo{
            width: .64rem;
            height:.64rem;
            background: url("../../../assets/images/添加.png") no-repeat;
            background-size: cover;
            float: left;
          }
          p{
            font-size: .12rem;
            color:#219da5;
            float: left;
            margin-top:.51rem;
            margin-left: .1rem;
          }
        }
        .shuru{
          width: 2.96rem;
          height:.28rem;
          border:1px solid #dcdcdc;
          float: left;
          border-radius: 4px;
        }
      }

    }

  }
  .el-input{
    input{
    }
  }
  .el-select-dropdown__list{
    z-index: 99999;
  }
  .okss{
    position: absolute;
    width: .6rem;
    height: .3rem;
    font-size: 0.14rem;
    background: #55B5AA;
    border-radius: 5px;
    display: block;
    right: 0.1rem;
    bottom: 0.1rem;
    text-align: center;
    line-height: .3rem;
    color: #fff;
  }
  .showfq{
    display: none;
  }
  .showfwd{
    display: none;
  }
  /*.zhezhao-c{*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*position: fixed;*/
    /*left: 0;*/
    /*top:0;*/
    /*background: #333333;*/
    /*opacity: 0.4;*/
    /*z-index: 555;*/
  /*}*/
</style>
<!--<div class="addipt-list">-->
  <!--<div class="zhijia">-->
    <!--<label>所属机构</label>-->
    <!--<select name="" class="shuru">-->
      <!--<option value=""></option>-->
      <!--<option value=""></option>-->
      <!--<option value=""></option>-->
    <!--</select>-->
  <!--</div>-->
  <!--<div class="zhijia">-->
    <!--<label>所属分区</label>-->
    <!--<select name="" class="shuru">-->
      <!--<option value=""></option>-->
      <!--<option value=""></option>-->
      <!--<option value=""></option>-->
      <!--<option value=""></option>-->
    <!--</select>-->
  <!--</div>-->
  <!--<div class="zhijia">-->
    <!--<label>所属服务队</label>-->
    <!--<input type="text" class="shuru">-->
  <!--</div>-->
  <!--<div class="zhijia">-->
    <!--<label>服务队logo</label>-->
    <!--<div class="add-logolist">-->
      <!--<ul>-->
        <!--<li>-->
          <!--<img src="../../../assets/images/添加.png" alt="">-->
          <!--<a href="javascript:void(0)" class="remove-logo">删除</a>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <!--<div class="add-photo-box">-->
      <!--<div class="add-photo"></div>-->
      <!--<p>上传100*100png图片</p>-->
    <!--</div>-->
  <!--</div>-->
<!--</div>-->
