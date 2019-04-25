<template>
  <div class="rais-word-cont">
    <div class="word-menu">
      <div class="word-left">
        <div>
          <div class="left-void">
            <video id="provoid"   src="" style="width: 100%;height:100%;object-fit:fill" controls="controls"></video>
          </div>
          <div class="left-shao">
            <p>狮子会简介</p>
            <span>{{szhjs}}</span>
          </div>
        </div>
      </div>
      <div class="word-right">
        <div class="wor-r-con">
          <p>筹款说明</p>
          <span v-if="productxc">{{productxc.pro_content.projectintroduction}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RaisefundsStart",
      data(){
          return{
            page:"",                 //路由参数
            token:"",                 //密码
            productxc:"",              //项目内容
            szhjs:"",
            num:0
          }
      },
      created(){
          this.token = window.sessionStorage.getItem('tok')
        this.getRouterDatas();
        this.$axios({
          url: `https://kungfunion.club/manage/informations/1`,
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utd-8"
          }
        }).then(res => {
          this.szhjs = res.data.introduce.info;
        }).catch(err => {
        });
      },
      mounted(){
        setTimeout(()=>{
          $("#provoid").attr("src",this.productxc.pro_video[0].vedio)

          document.getElementById("provoid").addEventListener('ended',  () =>{
            this.num++;
            if(this.num>=this.productxc.pro_video.length){
              this.num = 0;
            }
            $("#provoid").attr("src",this.productxc.pro_video[this.num].vedio)
            $("#provoid").attr("autoplay","autoplay")
          });
        },8000)
      },
      methods:{
        //接受路由参数
        getRouterDatas(){
          this.page = this.$route.query.id
          sessionStorage.setItem('proid',this.page);
          this.$axios({
            url: `https://kungfunion.club/projects/${this.page} `,
            method: 'get',
            headers: {
              'Authorization':'JWT '+this.token,
              'Accept':"application/json; charset=utd-8"
            }
          }).then(res => {

            sessionStorage.setItem('home',res.data.pro_content.rid)
            this.productxc = res.data
            this.$emit('letnav',this.productxc);
          }).catch(err => {
          });
        },
      }
    }
</script>

<style lang="scss">

  .rais-word-cont{
    margin:.19rem 0;
    width: 100%;
  .word-menu{
    width: 100%;
    overflow: hidden;
  .word-left{
    width: 50%;
    box-sizing: border-box;
    padding-right: .11rem;
    float: left;
  .left-void{
    width:6.51rem;
    height:3.65rem;
    border-radius:.1rem;
    margin-bottom: .19rem;
    background: black;
  }
  .left-shao {
    width:6.50rem;
    height:2.95rem;
    box-shadow:0px .03rem .07rem 0px rgba(0, 0, 0, 0.35);
    border-radius:.10rem;
    background: url("../../../assets/images/bgF..png") no-repeat;
    background-size: cover;
    box-sizing: border-box;
    padding:.31rem .51rem .31rem .21rem;
  p{
    font-size:.24rem;
    font-family:MFShangHei_Noncommercial-Regular;
    font-weight:400;
    color:rgba(28,156,100,1);
    margin-bottom: .21rem;
  }
  span{
    color:rgba(102,102,102,1);
    line-height:28px;
    font-size: .14rem;
    display: block;
  }
  }

  }
  .word-right{
    width: 50%;
    box-sizing: border-box;
    padding-left: .11rem;
    float: left;
    background: url("../../../assets/images/bgTpng.png") no-repeat;
    background-size: cover;
  .wor-r-con{
    padding:.32rem .44rem .32rem .33rem;
    box-sizing: border-box;
    width: 6.51rem;
    height: 6.78rem;
  p{
    font-size:24px;
    font-family:MFShangHei_Noncommercial-Regular;
    color:rgba(28,156,100,1);
    margin-bottom: .26rem;
  }
  span{
    font-size:14px;
    color:rgba(102,102,102,1);
    line-height:28px;
    display: block;
  }
  }
  }
  }
  }
</style>
