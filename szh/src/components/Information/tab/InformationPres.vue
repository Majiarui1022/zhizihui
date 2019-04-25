<template>
    <div class="pre-right">
      <p class="pre-tit">狮子会介绍</p>
      <div class="updata">
        <div style="overflow: hidden">
          <span class="up-word">上传轮播图:</span>
          <div class="slider-wx">
            <ul v-if="wxURL">
              <li v-for="(val,index) in wxURL" :key="index">
                <img :src="val.content" alt="">
                <a href="javascript:void(0)" class="remove-wxImg" v-on:click="removephoto(index)">-</a>
              </li>
            </ul>
          </div>
          <div class="Images">
            <div class="upImage">
              <div class="border-image" v-on:click="uploadPhoto">
                <div class="row"></div>
                <div class="col"></div>
                <input v-on:change="erweima($event)" id="filepho" type="file" name="filePhoto" ref="file" style="display:none;" accept="image/gif,image/jpeg,image/jpg,image/png" />
              </div>
            </div>
            <span class="img-tit">上传750*288得图片</span>
          </div>
        </div>
        <p class="hine">提示：轮播图不得少于三张</p>
        <div style="margin-top:16px;position: relative;display: inline-block">
          <span class="jigo">机构介绍:</span>
          <textarea maxlength="500" name="" id="" cols="50" rows="5"@input="descInput" v-model="desc"></textarea>
          <span class="word-up"><i>{{remnant}}</i>/<i>500</i></span>
        </div>
        <a href="javascript:void(0)" class="positive" v-on:click="sendWX">确定</a>
      </div>
    </div>
</template>

<script>
    export default {
      name: "InformationPres",
      data() {
        return {
          remnant: 0,
          desc: "",  //介绍机构
          wxURL: [],   //小程序图片
          jigou:"",
          token:"",    //密码
          fuwdID:"",    //服务队ID
          sliderImg:[],
          zhong:""         //中介
        }
      },
      created(){
        this.token = window.sessionStorage.getItem('tok');
        this.fuwdID = window.sessionStorage.getItem('serviceteam_id');
        this.$axios({
          url: `https://kungfunion.club/manage/informations/${this.fuwdID}/ `,
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utd-8"
          }
        }).then(res => {
          // console.log(res);
        }).catch(err => {
          // console.log(err.response.data.non_field_errors);
        });
      },
      mounted(){
      },
      methods: {
        descInput() {
          let textVal = this.desc.length;
          this.remnant = textVal;
        },
        uploadPhoto() {
          $("#filepho").trigger("click");
        }, //调用上传视频方法
        erweima(e) {
          // var files = document.getElementById("filepho").files[0]
          // console.log(files)
          var file = e.target.files[0];
          //
          // let formData = new FormData();
          // formData.append("file",file)
          // this.sliderImg.push(file)
          // console.log(formData)
          // console.log(this.sliderImg)
          let reader = new FileReader()
          let that = this
          reader.readAsDataURL(file)
          reader.onload = function (e) {
            console.log(1)
            that.wxURL.push({
              content:this.result,
            })
            that.zhong = this.result
            // console.log(that.zhong)
          }
          setTimeout(()=>{
            this.sliderImg.push(
              {
                suffix:file.name.slice(-4),
                content:this.zhong,
              })
            console.log(that.sliderImg)
          },10)


        },

        sendWX(){
          // if(this.wxURL.length<3){
          //   alert("请至少传入三张图片")
          // }
          // if(this.desc!="" && this.wxURL!="" && this.wxURL.length>=3){
          if(this.sliderImg.length>=3){
            this.$axios({
              url: `https://kungfunion.club/manage/informations/${this.fuwdID}/ `,
              method: 'put',
              data:{
                introduce:{
                  info:this.desc,
                },
                team_image:this.sliderImg,
              },
              headers: {
                'Authorization':'JWT '+this.token,
                'Accept':"application/json; charset=utd-8",
                // 'Content-Type': 'multipart/form-data'
              }
            }).then(res => {
              alert("提交成功")
              this.$router.push('/informationBackstage')
            }).catch(err => {
            });
          }else{
            alert("请填写完整再提交")
          }
        },
        removephoto(index){
          let ok = confirm("您确定要删除吗？");
          if(ok){
            this.wxURL.splice(index,1)
          }

        }
      }
    }
</script>

<style scoped>
  .pre-right{
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.38);
    border-radius:4px;
    box-sizing: border-box;
    padding:22px 18px 38px 18px;
  }
.pre-tit{
  font-size:24px;
  font-weight:400;
  color:rgba(51,51,51,1);
}
  .updata{
    margin-top: 73px;
    margin-left: 28px;
  }
  .up-word{
    float: left;
    margin-right: 13px;
    font-size:18px;
    color:rgba(102,102,102,1);
  }
  .slider-wx{
    float: left;
  }
  .slider-wx ul{
    overflow: hidden;
  }
  .slider-wx ul li{
    float: left;
    width: 1.5rem;
    height:.576rem;
    margin-right: .4rem;
    position: relative;
  }
  .slider-wx ul li img{
    display: block;
    width: 1.5rem;
    height:.576rem;
  }
  .remove-wxImg{
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
  .upImage{
    display: inline-block;
    margin-right: 12px;
    position: relative;
  }
  .border-image{
    width:62px;
    height:62px;
    border:1px dashed rgba(31,158,166,1);
    border-radius:2px;
    position: relative;
    cursor: pointer;
  }
  .row,.col{
    position: absolute;
  }
  .row{
    width: 44px;
    height:8px;
    background:rgba(31,158,166,1);
    border-radius:4px;
    left: 50%;
    top: 50%;
    margin-top:-4px;
    margin-left: -22px;
  }
  .col{
    width: 8px;
    height:44px;
    background:rgba(31,158,166,1);
    border-radius:4px;
    right: 0;
    left: 50%;
    top: 50%;
    margin-top:-22px;
    margin-left: -4px;
  }
  .img-tit {
    font-size: 12px;
    font-weight: 400;
    color: rgba(31, 158, 166, 1);
    display: inline;
  }
  .Images{
    float: left;
  }
  .hine{
    font-size:12px;
    font-weight:400;
    color:rgba(235,3,25,1);
    margin-top:13px;
    text-indent: 110px;
  }
  .jigo{
    font-size:18px;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin-right: 16px;
    float: left;
  }
  textarea{
    width:576px;
    height:204px;
    border:1px solid rgba(153,153,153,1);
    border-radius:2px;
    font-size: 14px;
  }
  .word-up{
    font-size:12px;
    font-weight:400;
    color:rgba(31,158,166,1);
    position: absolute;
    bottom: .35rem;
    right: .2rem;
  }
  .positive{
    position: absolute;
    right: 93px;
    bottom: 38px;
    width:145px;
    height:42px;
    background:rgba(14,132,120,1);
    border-radius:5px;
    font-size:18px;
    line-height: 42px;
    text-align: center;
    color:rgba(255,255,255,1);
  }
</style>
