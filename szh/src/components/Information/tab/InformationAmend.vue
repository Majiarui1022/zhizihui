<template>
  <div class="product-case">
    <p>编辑项目<router-link to="/informationBackstage">返回</router-link></p>

    <div class="add-product-contnet-box">
      <div class="add-product-content">
        <div class="pro-cont-left">
          <table>
            <tr>
              <td>
                <label>项目名称:</label>
                <input type="text" class="pro-name" v-model="proname">
                <label>目标金额:</label>
                <input type="text" class="tar-money" v-model="mbpric"><label>元</label>
              </td>
            </tr>
            <tr>
              <td>
                <label>筹备时间:</label>
                <input type="text" class="pro-time" v-model="cktime">
                <label>筹款时间:</label>
                <input type="text" class="time-money" v-model="cbtime">
              </td>
            </tr>
            <tr style="margin-bottom: .34rem">
              <td>
                <label>捐款金额:</label>
                <input type="text" class="num-one" v-model="priceOne">
                <label class="unit">元</label>
                <input type="text" class="num-two" v-model="priceTwo">
                <label class="unit">元</label>
                <input type="text" class="num-three" v-model="priceThree">
                <label class="unit">元</label>
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
                  <input v-on:change="uploadFile($event)" id="file" type="file" name="fileTrans" ref="file" style="display:none;" accept="video/*" />
                </div>
              </td>
            </tr>
          </table>


        </div>
        <div class="pro-cont-right">
          <div class="pro-pho">
            <label style="margin-right: .25rem;float: left;">项目照片:</label>
            <div class="upImage" style="float: left">
              <div class="border-image">
                <div class="row"></div>
                <div class="col"></div>
              </div>
            </div>
            <span class="img-tit">上传200*200得图片</span>
          </div>
          <div class="pro-php-image">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <a href="javascript:void(0)" class="pro-zh" style="right: 2.5rem;background: red" v-on:click="subs">删除</a>
          <a href="javascript:void(0)" class="pro-zh" v-on:click="subs">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "InformationAmend",
      data(){
        return{
          remnant:0,
          remants:0,
          endnant:0,
          arrs:[],     //视频名字
          logoURL:[],   // logo地址
          voidURL:[],    //视频地址
          proname:"",     //项目名称
          mbpric:"",      //目标金额
          cbtime:"",      //筹备时间
          cktime:"",      //筹款时间
          priceOne:"",     //第一个值
          priceTwo:"",    //第二个值
          priceThree:"",   //第三个值
          // jkpric:[
          //   {
          //   }
          // ],
          productjis:"",       //项目介绍
          productjy:"",       //寄语
          productjsy:"",      //结束语
        }
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
        uploadFile(e) {
          let Ofiles = e.target.files
          this.arrs.push(Ofiles[0].name)   //打印出上传文件名
          var file = e.target.files[0]
          let reader = new FileReader()
          let that = this
          reader.readAsDataURL(file)
          reader.onload = function(e) {
            that.voidURL.push(this.result)
          }


          // let params = new FormData();
          // params.append('file', Ofiles[0])
          // console.log(params)
        },
        removeVoid(index){
          let ok = confirm("您确定要删除吗？")
          if(ok){
            this.arrs.splice(index,1)
            this.voidURL.splice(index,1)
          }
        },//删除视频
        removephoto(index){

          let ok = confirm("您确定要删除吗？");
          if(ok){
            this.logoURL.splice(index,1)
          }

        },   //删除图片
        logoFile(ev){
          var file = ev.target.files[0]
          var reader = new FileReader()
          var that = this;

          var data = new FormData();
          data.append('img', $("#logofile"));
          reader.readAsDataURL(file)
          reader.onload = function(ev) {
            that.logoURL.push(this.result)
          }
        },
        subs(){
          if(this.voidURL.length!="" && this.proname!="" && this.mbpric!="" && this.cbtime!="" && this.cktime!="" && this.priceOne!="" && this.priceTwo!="" && this.priceThree!="" && this.productjis!="" && this.productjy!="" && this.productjsy!="" && this.logoURL!=""){
            let products = {
              voidurls:this.voidURL,
              pronames:this.proname,
              mbprics:this.mbpric,
              cbtimes:this.cbtime,
              cktimes:this.cktime,
              priceOnes:this.priceOne,
              priceTwos:this.priceTwo,
              priceThrees:this.priceThree,
              productjiss:this.productjis,
              productjys:this.productjy,
              productjsys:this.productjsy,
              logoURLs:this.logoURL
            }
          }else{
            alert("请填写完整");
            // console.log(this.voidURL.length>=3,this.proname!="",this.mbpric!="",this.cbtime!="",
            //   this.cktime!="",this.priceOne!="",this.priceTwo!="",this.priceThree!="" ,
            //   this.productjis!="",this.productjy!="" ,this.productjsy!="",this.logoURL!="")

          }
        }
      }
    }
</script>

<style lang="scss">
  .product-case{
    width:100%;
    height: 100%;
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
    .pro-php-image{
      width: 100%;
      margin-top: .34rem;
      ul{
        overflow: hidden;
        li{
          float: left;
          width: 1rem;
          height:1rem;
          background:rgba(31,158,166,1);
          border-radius:.02rem;
          margin-right: .14rem;
          margin-bottom: .14rem;
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
  }
</style>
