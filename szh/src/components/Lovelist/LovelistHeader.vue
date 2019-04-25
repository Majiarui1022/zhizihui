<template>
  <header>
    <div class="head-cen">
      <div class="list-logo">
        <ul>
          <li v-for="(val,index) in pro.pro_logo" :key="index">
            <img :src="val.logo" alt="">
          </li>
          <!--<li>-->
          <!--<img src="../../assets/images/开始.png" alt="">-->
          <!--</li>-->
          <!--<li>-->
          <!--<img src="../../assets/images/开始.png" alt="">-->
          <!--</li>-->
          <!--<li>-->
          <!--<img src="../../assets/images/开始.png" alt="">-->
          <!--</li>-->
        </ul>
      </div>
      <div class="list-tit">狮子会公益基金</div>
      <div class="list-mny">
        <ul>
          <li>
            <div class="mny-img">
              <img src="../../assets/images/资金拷贝.png" alt="">
            </div>
            <div class="mny-news">
              <p class="mb-mny" v-if="pro">{{pro.pro_content.targetamount}}</p>
              <p class="mb-words">目标存款</p>
            </div>
          </li>
          <li>
            <div class="mny-img">
              <img src="../../assets/images/资金.png" alt="">
            </div>
            <div class="mny-news">
              <p class="yc-mny"v-if="pro">{{pro.pro_content.preparationamount}}</p>
              <p class="mb-words">已筹资金</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "LovelistHeader",
    data(){
      return{
        page:"",
        pro:""
      }
    },
    created(){
      this.page = this.$route.query.id
      console.log(this.page)
    },
    mounted(){
      let logoList = $(".list-logo").children("ul").children("li");
      if(logoList.length>7){
        $(".list-logo").children("ul").css({
          "animation":"scrollChildS 10s linear infinite"
        })
      }
    },
    methods:{

    },
    watch:{
      'proda':function(x,y){
        this.pro = x;
        console.log(this.pro)
      }
    },
    props:['proda']
  }
</script>

<style lang="scss">
  $width : 17.55rem;
  header{
    width: 100%;
    height:1.48rem;
    border-bottom: 1px solid  rgba(99,162,205,1);
    .head-cen{
      width: $width;
      height:1.48rem;
      margin:0 auto;
      box-sizing: border-box;
      position: relative;
      .list-logo{
        position: absolute;
        left: 0;
        top:.47rem;
        overflow: hidden;
        ul{
          max-width: 7rem;
          display: flex;
          /*overflow-x: auto;*/
          /*overflow-y: hidden;*/
          li{
            float: left;
            width: .79rem;
            height:.75rem;
            margin-right: .19rem;
            img{
              display: block;
              width: .79rem;
              height:.75rem;
            }
          }
        }
      }
      .list-tit{
        font-size:.36rem;
        font-weight:bold;
        color:rgba(255,255,255,1);
        text-align:center;
        line-height: 1.48rem;
      }
      .list-mny{
        position: absolute;
        right: 0;
        top: .47rem;
        ul{
          overflow: hidden;
          li:last-child{
            margin-right: 0;
          }
          li{
            overflow: hidden;
            float: left;
            margin-right: .5rem;
            .mny-img{
              width: .6rem;
              height:.71rem;
              float: left;
              margin-right: .19rem;
              img{
                width: .6rem;
                height:.71rem;
                display: block;
              }
            }
            .mny-news{
              float: left;
              .mb-mny{
                font-size:.35rem;
                font-family:MFShangHei_Noncommercial-Regular;
                color:rgba(29,247,224,1);
                margin-bottom: .1rem;
              }
              .yc-mny{
                font-size:.36rem;
                font-family:MFShangHei_Noncommercial-Regular;
                color:rgba(48,189,255,1);
                margin-bottom: .1rem;

              }
              .mb-words{
                font-size:.18rem;
                font-family:SimHei;
                color:rgba(254,254,254,1);
              }
            }
          }
        }
      }
      @keyframes scrollChildS {
        0% {
          transform: translateX(100%);
        }
        to {
          transform: translateX(-200%);
        }
      }
    }
  }
</style>
