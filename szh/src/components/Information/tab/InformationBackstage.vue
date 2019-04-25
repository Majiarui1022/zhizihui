<template>
    <div class="main">
      <div class="main-tit">
        <div class="list-tit">
          <div class="list-tit-left">
            <p class="list-tit-left-words">项目列表</p>
            <router-link to="/informationAddproduct" class="add-product"><span class="iconfont addicon">&#xe618;</span><span>添加项目</span></router-link>
          </div>
          <div class="list-tit-right">
            <div class="search-list">
              <input type="text" class="search-words" placeholder="搜索" id="searchname" @change="productlist" v-model="productname">
              <a href="javascript:void(0)" class="go-search"  v-on:click="searchproname"><span class="iconfont">&#xe625;</span></a>
            </div>
          </div>
        </div>
        <div class="select-state">
          <div class="make-timers">
            <span class="time-tit">筹备时间</span>
            <!--<input type="text" class="inp-time">-->
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
          <div class="make-state">
            <span class="state-tit">状态</span>
            <!--<input type="text" class="inp-time">-->
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="reset-btn">
          <span class="reset-empty" v-on:click="replacementpro">重置</span>
          <span class="fine" v-on:click="sendstate">确定</span>
        </div>
      </div>
      <table border="0" cellpadding="0" cellspacing="0">
        <tbody>
        <tr>
          <th>项目编号</th>
          <th>项目名称</th>
          <th>筹备时间</th>
          <th>目标金额(元)</th>
          <th>现场筹备金额(元)</th>
          <th>筹备金额（元）</th>
          <th>状态</th>
          <th>帮助次数</th>
          <th>操作</th>
        </tr>
        <tr v-for="(val,index) in datalist" :key="index">
          <td>{{val.rid}}</td>
          <td>{{val.name}}</td>
          <td>{{val.ac_time}}</td>
          <td>{{val.targetamount}}</td>
          <td>{{val.locale_amount}}(元)</td>
          <td>{{val.preparationamount}}</td>
          <td :class="[{'activitying':val.status==1},{'notstate':val.status == 0},{'chouing':val.status == 2},{'activityend':val.status == 3}]">{{val.statusa}}</td>
          <td>{{val.num}}</td>
          <!--1表示进行中   0：未进行   2筹集中   3：已结束-->
          <td :class="[{'proing':val.status==1},{'wejinxing':val.status == 0},{'choukuan':val.status == 2},{'proend':val.status == 3}]" v-on:click="ganbian(val.status,val.id)">{{val.statusc}}</td>
        </tr>
        </tbody>
      </table>
      <div class="lovelist-box">
        <div class="lovelist">
          <div class="list-tit">
            <p>爱心名单</p>
            <i class="close-list" v-on:click="closetable">x</i>
          </div>
          <div class="list-table">
            <table cellpadding="0" cellspacing="0">
              <tbody>
              <tr>
                <th style="width: 1.7rem">时间</th>
                <th style="width: 1.7rem">姓名</th>
                <th>金额</th>
              </tr>
              <tr v-for="(val,index) in lovelistpro" :key="index">
                <td>{{val.pay_time}}</td>
                <td>{{val.pid}}</td>
                <td>{{val.pay_sum}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        name: "InformationBackstage",
      data(){
          return{
            options: [{
              value: '0',
              label: '未开始'
            }, {
              value: '1',
              label: '现场进行中'
            },{
              value: '2',
              label: '筹款中'
            },{
              value: '3',
              label: '已结束'
            }],
            value: '',


            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now();
              },
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }]
            },

            token:"",
            datalist:"",             //返回数据列表
            productname:"",          //项目名称
            value2:"",                //筹备时间
            userid:"",
            zhongzhuanzhan:"",         //介质
            lovelistpro:[]             //爱心名单

        }
      },
      created(){
        this.token = window.sessionStorage.getItem('tok');
        this.userid = window.sessionStorage.getItem('id')
        this.$axios({
          url: `https://kungfunion.club/projects?user_id=${this.userid} `,
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utd-8"
          }
        }).then(res => {
          this.datalist = res.data
          for(var i = 0; i<res.data.length;i++){
            if(res.data[i].status == 0){
                this.datalist[i].statusa = '未开始'
                this.datalist[i].statusc = '编辑'
            }else if(res.data[i].status == 1){
              this.datalist[i].statusa = '现场进行中'
              this.datalist[i].statusc = '编辑'
            }else if(res.data[i].status == 2){
              this.datalist[i].statusa = '筹款中'
              this.datalist[i].statusc = '结束'
            }else if(res.data[i].status == 3){
              this.datalist[i].statusa = '已结束'
              this.datalist[i].statusc = '查看'
            }
          }
        this.zhongzhuanzhan = this.datalist;
        }).catch(err => {
        });
      },
      methods:{
        closetable(){
          $(".lovelist-box").css("display","none")
          $(".lovelist-box").removeClass("activecs")
        },
        searchproname(){
          this.$axios({
            url: `https://kungfunion.club/projects?name=${this.productname}&user_id=${this.userid}`,
            method: 'get',
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utd-8"
            }
          }).then(res => {
            this.datalist = res.data
            for(var i = 0; i<res.data.length;i++){
              if(res.data[i].status == 0){
                this.datalist[i].statusa = '未开始'
                this.datalist[i].statusc = '编辑'
              }else if(res.data[i].status == 1){
                this.datalist[i].statusa = '现场进行中'
                this.datalist[i].statusc = '编辑'
              }else if(res.data[i].status == 2){
                this.datalist[i].statusa = '筹款中'
                this.datalist[i].statusc = '结束'
              }else if(res.data[i].status == 3){
                this.datalist[i].statusa = '已结束'
                this.datalist[i].statusc = '查看'
              }
            }
          }).catch(err => {
          });

        },
        //搜索失焦
        productlist(){
          if(this.productname == ""){
            this.$axios({
              url: `https://kungfunion.club/projects?user_id=${this.userid} `,
              method: 'get',
              headers: {
                'Authorization':'JWT '+this.token,
                'Accept':"application/json; charset=utd-8"
              }
            }).then(res => {
              this.datalist = res.data
              for(var i = 0; i<res.data.length;i++){
                if(res.data[i].status == 0){
                  this.datalist[i].statusa = '未开始'
                  this.datalist[i].statusc = '编辑'
                }else if(res.data[i].status == 1){
                  this.datalist[i].statusa = '现场进行中'
                  this.datalist[i].statusc = '编辑'
                }else if(res.data[i].status == 2){
                  this.datalist[i].statusa = '筹款中'
                  this.datalist[i].statusc = '结束'
                }else if(res.data[i].status == 3){
                  this.datalist[i].statusa = '已结束'
                  this.datalist[i].statusc = '查看'
                }
              }
            }).catch(err => {
            });
          }
        },
        ganbian(index,id){
          if(index == 0){
            this.$router.push({
              name:'InformationScene',
              query:{
                id:id
              }
            })
          }else if(index == 2){
            this.$axios({
              url: `https://kungfunion.club/projects/endprojects/${id}`,
              method: 'delete',
              headers: {
                'Authorization':'JWT '+this.token,
                'Accept':"application/json; charset=utf-8",
              }
            }).then(res => {
              alert("成功结束此项目")
            }).catch(err => {
            });
          }
          //查看捐款名单
          else if(index == 3){
            if(!$(".lovelist-box").hasClass("activecs")){
              $(".lovelist-box").css("display","block")
              $(".lovelist-box").addClass("activecs")
            }

            this.$axios({
              url: `https://kungfunion.club/projects/donors/?project_id=${id}`,
              method: 'get',
              headers: {
                'Authorization':'JWT '+this.token,
                'Accept':"application/json; charset=utf-8",
              }
            }).then(res => {
              this.lovelistpro = res.data
            }).catch(err => {
            });
          }
          else{
            return false
          }
        },
        sendstate(){
          this.$axios({
            url: `https://kungfunion.club/projects/?start_time=${this.value2}&status=${this.value}&user_id=${this.userid} `,
            method: 'get',
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utd-8"
            }
          }).then(res => {
            this.datalist = res.data
            for(var i = 0; i<res.data.length;i++){
              if(res.data[i].status == 0){
                this.datalist[i].statusa = '未开始'
                this.datalist[i].statusc = '编辑'
              }else if(res.data[i].status == 1){
                this.datalist[i].statusa = '现场进行中'
                this.datalist[i].statusc = '编辑'
              }else if(res.data[i].status == 2){
                this.datalist[i].statusa = '筹款中'
                this.datalist[i].statusc = '结束'
              }else if(res.data[i].status == 3){
                this.datalist[i].statusa = '已结束'
                this.datalist[i].statusc = '查看'
              }
            }
          }).catch(err => {
          });

        },
        //重置按钮
        replacementpro(){
          this.productname="";
          this.value2 = "";
          this.value = "";
         this.datalist = this.zhongzhuanzhan;
        }
      }
    }
</script>

<style scoped>

  .main{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:.09rem .13rem;
    background:rgba(255,255,255,1);
    box-shadow:0px .03rem .07rem 0px rgba(0, 0, 0, 0.38);
    border-radius:4px;
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
    float: left;
  }
  .list-tit .list-tit-left p{
    font-size:.24rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    clear: both;
  }
  .add-product{
    height:.29rem;
    display: block;
    background:rgba(68,160,151,1);
    border-radius:.15rem;
    position: relative;
    margin:.21rem 0;
  }
  .add-product span{
    font-size:.14rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    position: absolute;
    top: .05rem;
    right: .11rem;
  }
  .add-product .addicon{
    left:.05rem;
    top:.05rem;
    font-size: .22rem;
  }
  .list-tit-right{
    float: right;
  }
  .search-list{

  }
  .search-words{
    width: 2.40rem;
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
  }
  .go-search span{
    display: block;
    color:#fff;
    font-size: .25rem;
    text-align: center;
    line-height: .4rem;
  }
  .select-state{
    width: 100%;
  }
  .make-timers{
    display: inline-block;
  }
  .make-state{
    display: inline-block;
    margin-left: .37rem;
  }
  .inp-time{
    width:1.98rem;
    height:.28rem;
    border:1px solid rgba(33,131,121,1);
    border-radius:2px;
  }
  .time-tit,.state-tit{
    font-size:.16rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:.30rem;
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
    border-radius:2px;
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
    height:.60rem;
    line-height: .60rem;
    font-size:.14rem;
    font-weight:400;
    text-align: center;
  }
  table tbody th{
    color:rgba(255,255,255,1);
    background:rgba(33,131,121,1);
  }
  table tbody tr a{
    text-decoration:underline;
  }
  td{
    color:rgba(51,51,51,1);
  }
  tbody tr:nth-child(2n){
    background:rgba(233,247,246,1);
  }
  tbody tr td:first-child{
    color:rgba(33,131,121,1);
  }
  .stop_click{
    color:rgba(153,153,153,1);
    cursor: no-drop;
  }
  .state-later{
    color:rgba(227,0,5,1);
  }
  .state-end{
    color:rgba(191,121,0,1);
  }
  .activitying{
    color:#0EA495;
  }
  .notstate{
      color:#E30005;
  }
  .chouing{
    color:black;
  }
  .activityend{
    color:#BF7900;
  }
  .operation{
    cursor: pointer;
    color:green;;
    text-decoration: underline;
  }
  .forbid{
    color:#999999;
    cursor: no-drop;
  }



  .proing{
    color:red;
    cursor: no-drop;
  }
  .wejinxing{
    color:green;
    cursor: pointer;
  }
  .choukuan{
    color:#E30005;
    cursor: pointer;
  }
  .proend{
    color:blue;
    cursor: pointer;
  }

  /*爱心名单*/
  .lovelist-box{
    width: 6rem;
    height:9rem;
    position: fixed;
    margin-top:-4.5rem;
    margin-left: -3rem;
    left: 50%;
    top:50%;
    z-index: 999999999999999;
    border-radius: 10px;
    overflow: hidden;
    display: none;
    background: #fff;
  }
  .lovelist-box .lovelist{
    width: 100%;
    height:100%;
    border-radius: 10px;
  }
  .lovelist-box .lovelist .list-tit{
    width: 100%;
    height:.6rem;
    background: #55b5ab;
    position: relative;
  }
  .list-tit p{
    font-size: .24rem;
    color:#fff;
    text-align: center;
    line-height: .6rem;
  }
  .close-list{
    font-size: .4rem;
    position: absolute;
    right: 0.2rem;
    top: 0rem;
    color:#fff;
    cursor: pointer;
  }
  .lovelist-box table tbody tr:nth-child(2n-1){
    background: #c4e8e5;
  }
  .list-table{
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    height:8.3rem;
  }
  .list-table table{
    width: 100%;
  }
</style>
