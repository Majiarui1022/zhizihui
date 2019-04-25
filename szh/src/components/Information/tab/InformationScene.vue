<template>
  <div class="product-case">
    <p>编辑项目<router-link to="/informationBackstage">返回</router-link></p>

    <div class="add-product-contnet-box">
      <div class="add-product-content">
        <div class="pro-cont-left">
          <div style="overflow: hidden">
            <el-radio v-model="radio" style="float: left;margin-right: 1rem;margin-bottom:.1rem;" label="1" >仅限现场活动</el-radio>
            <el-radio v-model="radio" style="float: left;margin-bottom:.1rem;" label="2" checked>活动</el-radio>
          </div>
          <table>
            <tr>
              <td>
                <label>项目名称:</label>
                <input type="text" class="pro-name" v-model="proname">
                <label>目标金额:</label>
                <input type="text" class="tar-money" v-model="mbpric"><label>元</label>
              </td>
            </tr>
            <!--2是活动。-->
            <tr v-if="radio==2">
              <td>
                <label>开始时间:</label>
                <el-date-picker
                  v-model="value1"
                  align="right"
                  start=2019-10-20
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1">
                </el-date-picker>
                <label>筹备时间:</label>
                <el-date-picker
                  v-model="value2"
                  align="right"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
                <label>筹款时间:</label>
                <el-time-picker
                  arrow-control
                  v-model="value3"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>

              </td>
            </tr>
            <tr v-if="radio==1">
              <td>
                <label>筹备时间:</label>
                <el-date-picker
                  v-model="value2"
                  align="right"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="pickerOptions2"
                  style="width: 3.30rem !important;margin-right: .33rem;">
                </el-date-picker>
                <label>筹款时间:</label>
                <el-time-picker
                  arrow-control
                  v-model="value3"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>
                <label>小时</label>
              </td>
            </tr>
            <tr style="margin-bottom: .34rem">
              <td>
                <label>捐款金额:</label>
                <input type="text" class="num-one" v-model="priceOne">
                <label class="unit" style="width: auto">元</label>
                <input type="text" class="num-two" v-model="priceTwo">
                <label class="unit" style="width: auto">元</label>
                <input type="text" class="num-three" v-model="priceThree">
                <label class="unit" style="width: auto">元</label>
              </td>
            </tr>
            <tr style="margin-bottom: .16rem">
              <td>
                <label style="width: auto">上传发起的logo:</label>
                <ul class="logo-qi">
                  <li v-for="(val,inx) in logoURL" :key="inx">
                    <img :src="val" alt="">
                    <a href="javascript:void(0)" class="remove-logo" v-on:click="removephoto(inx)">-</a>
                  </li>
                </ul>
                <div class="upImage"  v-on:click="logoimg">
                  <div class="border-image">
                    <div class="row"></div>
                    <div class="col"></div>
                    <input v-on:change="logoFile($event)" id="logofile" type="file" name="fileTrans" ref="file" style="display:none;" accept="image/gif,image/jpeg,image/jpg,image/png" />
                  </div>
                </div>
                <span class="img-tit">上传750*288得图片</span>
              </td>
            </tr>
            <tr>
              <td style="position: relative;">
                <label>项目介绍:</label>
                <textarea maxlength="500" name=""  cols="50" rows="5"@input="descInput" v-model="productjis"></textarea>
                <span class="word-up" style="bottom: -1.75rem;"><i>{{remnant}}</i>/<i>500</i></span>
              </td>
            </tr>
            <tr>
              <td style="position: relative;">
                <label>寄语:</label>
                <textarea maxlength="100" name=""  @input="descInputs" v-model="productjy" style="width: 5.76rem;height:.8rem;"></textarea>
                <span class="word-up"><i>{{remants}}</i>/<i>100</i></span>
              </td>
            </tr>
            <tr style="margin-bottom: .19rem">
              <td style="position: relative;">
                <label>结束语:</label>
                <textarea maxlength="100" name=""  @input="endInputs" v-model="productjsy" style="width: 5.76rem;height:.8rem;"></textarea>
                <span class="word-up"><i>{{endnant}}</i>/<i>100</i></span>
              </td>
            </tr>
            <tr>
              <td>
                <label>项目视频:</label>
                <div class="void-box">
                  <div class="a">
                    <ul>
                      <li v-for="(viodVal,inx) in arrs" :key="inx">
                        <span>{{viodVal}}</span>
                        <a href="javascript:void(0)" v-on:click="removeVoid(inx)">删除</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="upImage" id="fileselect" v-on:click="openBrowse">
                  <div class="border-image">
                    <div class="row"></div>
                    <div class="col"></div>
                  </div>
                  <em style="font-size: .12rem;font-style: normal;color:red;float: left;margin-top: .1rem;" >上传视频不能超过10MB！</em>
                  <input v-on:change="uploadFile($event)" id="file" type="file" name="fileTrans" ref="file" style="display:none;" accept="video/*" />
                </div>
              </td>
            </tr>
          </table>


        </div>
        <div class="pro-cont-right">

          <!--<div class="pro-ewm" style="overflow:hidden;margin-bottom: .25rem">-->
            <!--<label style="margin-right: 0.25rem;float: left;">添加二维码:</label>-->
            <!--<div class="showewm">-->
              <!--<ul>-->
                <!--<li v-for="(val,index) in ewmprotho" :key="index" style="position: relative">-->
                  <!--<img :src="val" alt="">-->
                  <!--<a href="javascript:void(0)" class="removes" v-on:click="removeewm(index)">-</a>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->

            <!--<div class="upImage" style="float: left" v-on:click="uploadewm">-->
              <!--<div class="border-image">-->
                <!--<div class="row"></div>-->
                <!--<div class="col"></div>-->
                <!--<input v-on:change="ewpupload($event)" id="ewmpho" type="file" name="fileTrans" ref="file" style="display:none;" accept="image/gif,image/jpeg,image/jpg,image/png"/>-->
              <!--</div>-->
            <!--</div>-->



          <!--</div>-->

          <div class="pro-pho">
            <label style="margin-right: .25rem;float: left;">项目照片:</label>
            <div class="upImage" style="float: left" v-on:click="uploadphoto">
              <div class="border-image">
                <div class="row"></div>
                <div class="col"></div>
                <input v-on:change="uppropho($event)" id="propho" type="file" name="fileTrans" ref="file" style="display:none;" accept="image/gif,image/jpeg,image/jpg,image/png"/>
              </div>
            </div>
            <span class="img-tit">上传200*200得图片</span>
          </div>
          <div class="pro-php-image">
            <ul>
              <li v-for="(val,index) in productpho" :key="index" style="position: relative; background:transparent">
                <img :src="val" alt="">
                <a href="javascript:void(0)" class="removes" v-on:click="removeproductpohoto(index)">-</a>
              </li>
            </ul>
          </div>
          <a href="javascript:void(0)" class="remove-product" v-on:click="removeproduct">删除</a>
          <a href="javascript:void(0)" class="pro-zh" v-on:click="subs">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InformationAddproduct",
    data(){
      return{

        //插件
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },

        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '2019-10-20',
        value2: '',
        value3: new Date(),
        radio:1,
        //----------------------------------------
        remnant:0,
        remants:0,
        endnant:0,
        arrs:[],     //视频名字
        logoURL:[],   // logo地址
        logofile:[],    //上传后端文件
        profile:[],      //上传后端项目照片
        ewmfile:[],       //上传后端二维码
        voidURL:[],    //视频地址
        proname:"",     //项目名称
        mbpric:"",      //目标金额
        value2:"",      //筹备时间
        value3:"",     //筹款时间
        priceOne:"",     //第一个值
        priceTwo:"",    //第二个值
        priceThree:"",   //第三个值
        productpho:[],    //项目照片
        //ewmprotho:[],     //二维码展示路径
        productjis:"",       //项目介绍
        productjy:"",       //寄语
        productjsy:"",      //结束语




        zhongjie:"",         //此为中转站
        updatalogo:[],       //项目发起的logo
        updatavoid:[],       //发视频
        //updataem:[],         //二维码
        updatapropho:[],     //发起的项目照片
        token:"",
        userproID:"",


        removepohoto:[],      //删除照片ID
        //removema:[],           //删除二维码ID
        removevoidID:[],        //删除视频ID
        removeproductpho:[]      //删除项目照片ID
      }
    },
    created(){
      this.token = window.sessionStorage.getItem('tok')
      this.userproID = window.sessionStorage.getItem('id')
      this.$axios({
        url: `https://kungfunion.club/projects/${this.$route.query.id}/`,
        method: 'get',
        headers: {
          'Authorization':'JWT '+this.token,
          'Accept':"application/json; charset=utd-8"
        }
      }).then(res => {
        this.proname = res.data.pro_content.name;
        this.mbpric =  res.data.pro_content.targetamount
        this.value1 =  res.data.pro_content.start_time
        this.value2 =  res.data.pro_content.ac_time
        this.value3 =  res.data.pro_content.activity_time
        this.priceOne =  res.data.pro_content.money1
        this.priceTwo =  res.data.pro_content.money2
        this.priceThree =  res.data.pro_content.money3
        this.productjy =  res.data.pro_content.message
        this.productjsy =  res.data.pro_content.end_message
        this.productjis =  res.data.pro_content.projectintroduction
        this.radio =  res.data.pro_content.project_status
        for(var i = 0;i<res.data.pro_video.length;i++){
          this.updatavoid.push(
            {
              suffix:res.data.pro_video[i].vedio.slice(-4),
              content:res.data.pro_video[i].vedio,
              name:res.data.pro_video[i].name,
              id:res.data.pro_video[i].id
            })
          this.arrs.push(res.data.pro_video[i].name)
        }
        for(var i = 0;i<res.data.pro_image.length;i++){
          this.productpho.push(res.data.pro_image[i].name)
          this.updatapropho.push(
            {
              suffix:res.data.pro_image[i].name.slice(-4),
              content:res.data.pro_image[i].name,
              id:res.data.pro_image[i].id,
            })
        }

        // for(var i = 0;i<res.data.pro_qrcode.length;i++){
        //   this.updataem.push(
        //     {
        //       suffix:res.data.pro_qrcode[i].qr_code_url.slice(-4),
        //       content:res.data.pro_qrcode[i].qr_code_url,
        //       id:res.data.pro_qrcode[i].id
        //     })
        //   this.ewmprotho.push(res.data.pro_qrcode[i].qr_code_url)
        // }



        for(var i = 0;i<res.data.pro_logo.length;i++){
          this.updatalogo.push(
            {
              suffix:res.data.pro_logo[i].logo.slice(-4),
              content:res.data.pro_logo[i].logo,
              id:res.data.pro_logo[i].id
            })
          this.logoURL.push(res.data.pro_logo[i].logo)
        }






      }).catch(err => {
      });

    },
    methods: {
      descInput() {
        let textVal = this.productjis.length;
        this.remnant = textVal;
      },
      descInputs() {
        let textVal = this.productjy.length;
        this.remants = textVal;
      },
      endInputs() {
        let textVal = this.productjsy.length;
        this.endnant = textVal;
      },
      openBrowse() {
        $("#file").trigger("click");
      },//调用上传视频方法
      logoimg(){
        $("#logofile").trigger("click")
      },//调用上传logo方法
      uploadphoto(){
        $("#propho").trigger("click")
      },//调用上传项目照片方法
      // uploadewm(){
      //   if(this.ewmprotho == ""){
      //     $("#ewmpho").trigger("click")
      //   }
      // },//调用上传二维码的方法

      //上传视频
      uploadFile(e) {
        let Ofiles = e.target.files
        this.arrs.push(Ofiles[0].name)   //打印出上传文件名
        var file = e.target.files[0]
        let reader = new FileReader()
        let that = this
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          that.voidURL.push(this.result)
          that.zhongjie = this.result;
        }
        // let params = new FormData();
        // params.append('file', Ofiles[0])
        setTimeout(()=>{
          this.updatavoid.push(
            {
              suffix:Ofiles[0].name.slice(-4),
              content:this.zhongjie,
              name:Ofiles[0].name
            })
        },500)





      },
      // 上传项目照片
      uppropho(ev){
        let filea = ev.target.files[0]
        this.profile.push(filea)
        var reader = new FileReader()
        var that = this
        reader.readAsDataURL(filea)
        reader.onload = function(ev) {
          that.productpho.push(this.result)
          that.zhongjie = this.result;
        }

        setTimeout(()=>{
          this.updatapropho.push(
            {
              suffix:filea.name.slice(-4),
              content:this.zhongjie,
            })
        },10)



      },
      // 上传二维码
      // ewpupload(ev){
      //   let filea = ev.target.files[0]
      //   this.ewmfile.push(filea)
      //   var reader = new FileReader()
      //   var that = this
      //   reader.readAsDataURL(filea)
      //   reader.onload = function(ev) {
      //   //   that.ewmprotho.push(this.result)
      //   //   that.zhongjie = this.result;
      //   // }
      //
      //   // setTimeout(()=>{
      //   //   this.updataem.push(
      //   //     {
      //   //       suffix:filea.name.slice(-4),
      //   //       content:this.zhongjie,
      //   //     })
      //   // },10)
      //
      //
      // },
      //删除视频
      removeVoid(index){
        let ok = confirm("您确定要删除吗？")
        if(ok){
          this.arrs.splice(index,1)
          this.voidURL.splice(index,1)
          this.removevoidID.push({
            id:this.updatavoid[index].id
          })
          this.updatavoid.splice(index,1)
        }
      },//删除视频

      // 上传logo
      logoFile(ev){
        var file = ev.target.files[0]
        this.logofile.push(file)
        var reader = new FileReader()
        var that = this
        reader.readAsDataURL(file)
        reader.onload = function(ev) {
          that.logoURL.push(this.result)
          that.zhongjie = this.result
        }

        setTimeout(()=>{
          this.updatalogo.push(
            {
              suffix:file.name.slice(-4),
              content:this.zhongjie,
            })
        },10)

      },

        //删除logo
      removephoto(index){

        let ok = confirm("您确定要删除吗？");
        if(ok){
          this.logoURL.splice(index,1);
          this.removepohoto.push({
            id:this.updatalogo[index].id
          });
          this.updatalogo.splice(index,1)
        }

      },

      //删除（更换）二维码
      // removeewm(index){
      //   let kk = confirm("你确定删除当前二维码吗？")
      //   if(kk){
      //     this.ewmprotho.splice(index,1);
      //     this.removema.push({
      //       id:this.updataem[index].id
      //     })
      //     this.updataem.splice(index,1)
      //   }
      // },
      //删除更换项目照片
      removeproductpohoto(index){
        let kk = confirm("你确定删除吗？")
        if(kk){
          this.removeproductpho.push({
            id:this.updatapropho[index].id
          })
          this.productpho.splice(index,1)
          this.updatapropho.splice(index,1)
        }
      },
      subs(){

        if(this.updatavoid.length!="" && this.value3!="" && this.value2!="" && this.proname!="" && this.mbpric!=""  && this.priceOne!="" && this.priceTwo!="" && this.priceThree!="" && this.productjis!="" && this.productjy!="" && this.productjsy!="" && this.logoURL!=""){
          let products = {
            pro_content:{
              name:this.proname,
              targetamount:this.mbpric,
              start_time:this.value1,
              ac_time:this.value2,
              activity_time:this.value3,
              money1:this.priceOne,
              money2:this.priceTwo,
              money3:this.priceThree,
              message:this.productjy,
              end_message:this.productjsy,
              projectintroduction:this.productjis,
              create_user:this.userproID,
              project_status:this.radio,
              content_del:{
                image_del:this.removeproductpho,
                video_del:this.removevoidID,
                logo_del:this.removepohoto
              }
            },
            pro_logo:this.updatalogo,
            pro_image:this.updatapropho,
            pro_video:this.updatavoid,
          }


          this.$axios({
            url: `https://kungfunion.club/projects/${this.$route.query.id}/`,
            method: 'put',
            data:products,
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utd-8"
            }
          }).then(res => {
            alert("提交成功")
          }).catch(err => {
            alert("提交失败")
          });
        }else{
          alert("请输入完整信息")
          // alert(this.value3,this.value2);
          // console.log(this.updatavoid.length>=3,this.value3!="",this.value2!="",this.proname!="",this.mbpric!="",this.priceOne!="",this.priceTwo!="",this.priceThree!="" ,
          //   this.productjis!="",this.productjy!="" ,this.productjsy!="",this.logoURL!="")
          // console.log(this.logoURL)
          //   alert(this.updatavoid.length)
        }
      },
      removeproduct(){
        let removes = confirm("你确定删除当前项目吗？");
        if(removes){
          this.$axios({
            url: `https://kungfunion.club/projects/${this.$route.query.id}/`,
            method: 'delete',
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utd-8"
            }
          }).then(res => {
            alert("删除成功")
            this.$router.push('/informationBackstage')
          }).catch(err => {
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .el-input--suffix .el-input__inner{
    padding-right: 0 !important;
    width: 1.4rem;
  }
  .el-date-editor{
    width: 1.5rem !important;
  }

  .product-case{
    width:100%;
    height:auto;
    background:rgba(255,255,255,1);
    box-shadow:0rem .03rem .07rem 0rem rgba(0, 0, 0, 0.38);
    border-radius:.04rem;
    padding:.22rem 1.04rem .38rem .18rem;
    box-sizing: border-box;
    overflow-y: auto;
    p{
      font-size:.24rem;
      color:rgba(51,51,51,1);
      a{
        font-size:.14rem;
        text-decoration:underline;
        color:rgba(0,186,166,1);
        margin-left: .14rem;
      }
    }
  }
  .add-product-contnet-box{
    padding:.65rem 0 0 .28rem;
    box-sizing: border-box;
    width: 100%;
    height:100%;
    overflow: hidden;
  }
  .add-product-content{
    width: 100%;
    height:100%;
  }
  .pro-cont-left,.pro-cont-right{
    label{
      font-size:.18rem;
      color:rgba(102,102,102,1);
      width: .9rem;
      white-space: nowrap;
      line-height: .4rem;
    }
  }
  .add-product-contnet-box{
    .add-product-content{
      td{
        display: flex;
      }
    }
  }
  .pro-cont-left{
    float: left;
    width: 50%;
    input{
      height:.32rem;
      border:1px solid rgba(153,153,153,1);
      border-radius:.02rem;
    }
    .pro-name,.pro-time{
      width:3.30rem;
      margin-right: .33rem;
    }
    .tar-money,.time-money{
      width:1.30rem;
      margin-right: .13rem;
    }
    table{
      tr{
        margin-bottom: .22rem;
        display: block;
        td{
          .num-one,.num-two,.num-three{
            width:.97rem;
          }
          .unit{
            margin:0 .2rem 0 .08rem;
          }
          .logo-qi{
            float: left;
            li{
              float: left;
              width: .62rem;
              height:.59rem;
              margin-left: .13rem;
              margin-right: .08rem;
              margin-bottom: .05rem;
              position: relative;
              img{
                display: block;
                width: .62rem;
                height:.59rem;
              }
              .remove-logo{
                position: absolute;
                top: 0rem;
                right: .05rem;
                display: block;
                color: #fff;
                width: .2rem;
                height: .2rem;
                background: red;
                border-radius: 50%;
                font-size: .40rem;
                text-align: center;
                line-height: .13rem;
              }
            }
          }
          .upImage{
            display: inline-block;
            margin-right: .09rem;
            position: relative;
          }
          .border-image{
            width:.62rem;
            height:.62rem;
            border:1px dashed rgba(31,158,166,1);
            border-radius:.02rem;
            position: relative;
            cursor: pointer;
          }
          .row,.col{
            position: absolute;
          }
          .row{
            width: .44rem;
            height:.08rem;
            background:rgba(31,158,166,1);
            border-radius:.04rem;
            left: 50%;
            top: 50%;
            margin-top:-.04rem;
            margin-left: -.22rem;
          }
          .col{
            width: .08rem;
            height:.44rem;
            background:rgba(31,158,166,1);
            border-radius:.04rem;
            right: 0;
            left: 50%;
            top: 50%;
            margin-top:-.22rem;
            margin-left: -.04rem;
          }
          .img-tit {
            font-size: .12rem;
            font-weight: 400;
            color: rgba(31, 158, 166, 1);
            display: inline;
            white-space: nowrap;
          }
          textarea{
            width:5.76rem;
            height:2.04rem;
            border:1px solid rgba(153,153,153,1);
            border-radius:.02rem;
            font-size: .14rem;
          }
          .word-up{
            font-size:.12rem;
            font-weight:400;
            color:rgba(31,158,166,1);
            position: relative;
            bottom: -.55rem;
            right: 0.5rem;
          }
          .void-box{
            width:1.54rem;
            height:.97rem;
            border:1px solid rgba(31,158,166,1);
            border-radius:.02rem;
            float: left;
            margin-right: .09rem;
            overflow: hidden;
            .a{
              width: 1.48rem;
              height: .97rem;
              overflow-x: hidden;
              overflow-y: auto;
            }
            .a::-webkit-scrollbar{
              width:.08rem;
              height: .2rem;
              background:rgba(141,202,206,1);
              border-radius:.02rem;
            }
            ul{
              display: inline-block;
              margin-left: .07rem;
              margin-right: .11rem;
              float: left;
              li{
                line-height: .26rem;
                height:.26rem;
                overflow: hidden;
                span{
                  min-width:.76rem;
                  max-width: .86rem;
                  line-height: .26rem;
                  height:.26rem;
                  font-size:.12rem;
                  color:rgba(31,158,166,1);
                  overflow: hidden;
                  text-overflow: ellipsis;
                  float: left;
                  white-space: nowrap;
                }
                a{
                  font-size:.12rem;
                  text-decoration:underline;
                  color:rgba(232,8,8,1);
                  float: right;
                }
              }
            }
          }
        }
      }
    }
  }


  .pro-cont-right{
    float: right;
    width: 40%;
    height: 100%;
    position: relative;
    .upImage{
      display: inline-block;
      margin-right: .09rem;
      position: relative;
    }
    .border-image{
      width:.62rem;
      height:.62rem;
      border:1px dashed rgba(31,158,166,1);
      border-radius:.02rem;
      position: relative;
      cursor: pointer;
    }
    .row,.col{
      position: absolute;
    }
    .row{
      width: .44rem;
      height:.08rem;
      background:rgba(31,158,166,1);
      border-radius:.04rem;
      left: 50%;
      top: 50%;
      margin-top:-.04rem;
      margin-left: -.22rem;
    }
    .col{
      width: .08rem;
      height:.44rem;
      background:rgba(31,158,166,1);
      border-radius:.04rem;
      right: 0;
      left: 50%;
      top: 50%;
      margin-top:-.22rem;
      margin-left: -.04rem;
    }
    .img-tit {
      font-size: .12rem;
      font-weight: 400;
      color: rgba(31, 158, 166, 1);
      display: inline;
    }



    .showewm{
      float: left;
      ul{
        overflow: hidden;
        li{
          float: left;
          width: 1rem;
          height: 1rem;
          border-radius: .02rem;
          margin-right: .2rem;
          img{
            width: 100%;
            height:100%;
            display: block;
          }
        }
      }
    }
    .pro-php-image{
      width: 100%;
      margin-top: .34rem;
      ul{
        overflow: hidden;
        li{
          float: left;
          width: 1rem;
          height:1rem;
          border-radius:.02rem;
          margin-right: .15rem;
          margin-bottom: .14rem;
          img{
            width: 100%;
            height:100%;
            display: block;
          }
        }
        li:nth-child(5n){
          margin-right: 0;
        }
      }
    }
    .pro-zh{
      width:1.45rem;
      height:.42rem;
      background:rgba(14,132,120,1);
      border-radius:.05rem;
      position: fixed;
      right: .70rem;
      bottom: .7rem;
      text-align: center;
      line-height: .42rem;
      font-size:.18rem;
      color:rgba(255,255,255,1);
    }
    .remove-product{
      width:1.45rem;
      height:.42rem;
      background:#CA0909;
      border-radius:.05rem;
      position: fixed;
      right: 2.5rem;
      bottom: .7rem;
      text-align: center;
      line-height: .42rem;
      font-size:.18rem;
      color:rgba(255,255,255,1);
    }
  }
  .removes{
    position: absolute;
    top: 0rem;
    right: .05rem;
    display: block;
    color: #fff;
    width: .2rem;
    height: .2rem;
    background: red;
    border-radius: 50%;
    font-size: .40rem;
    text-align: center;
    line-height: .13rem;
  }
</style>
