<template>
    <div class="raise-left-content">

      <div class="danmu-box">
        <div class="danmu">
          <div class="userherad">
            <img :src="danmu.image" alt="">
          </div>
          <div class="useris">
            <span>{{danmu.name}}</span>
            <span>筹款{{danmu.sum}}元</span>
          </div>
        </div>
      </div>


      <div class="raiis-menu">
        <div class="menu-tit">
          <div class="start">
            <router-link tag="div" v-on:click.native="startmu"  to="/raisefundsIng" class="start-btn"  v-if="!timer">
              <p>开始</p>
            </router-link>
            <div class="tiemrss" v-if="timer">
              <span v-if="tiemrs">{{tiemrs}}</span>
            </div>
          </div>
          <div class="target-mny">
            <div class="tag-m">
              <div class="tag-left">
                <p v-if="product">{{product.pro_content.targetamount}}</p>
                <span>目标筹款</span>
              </div>
              <div class="tag-right">

              </div>
            </div>
          </div>
          <div class="alread-mny">
            <div class="tag-m">
              <div class="tag-left">
                <p class="initmoney"></p>
                <p v-if="keys">{{keys.all_money}}</p>
                <span>已筹资金</span>
              </div>
              <div class="tag-right">

              </div>
            </div>
          </div>
          <div class="help-num">
            <div class="tag-m">
              <div class="tag-left">
                <p class="initnum"></p>
                <p v-if="keys">{{keys.num}}</p>
                <span>帮助次数</span>
              </div>
              <div class="tag-right">

              </div>
            </div>
          </div>
        </div>
        <router-view  @letnav="test" @times="daojishi" @websodong="serverdata" :letNavData="product"></router-view>
        <footer style="display: flex;align-items: center">
          <ul style="display: flex;align-items: center;">
            <li>
              <img v-if="product" v-for="(val,index) in product.pro_logo" :key="index" :src="val.logo" alt="">
            </li>
          </ul>
        </footer>
      </div>
    </div>
</template>

<script>
    export default {
        name: "RaisefundsLeft",
      data(){
        return{
          timer:"",
          product:"",     //Start视图传值
          provoidurl:[],             //项目视频
          tiemrs:"",              //后台传的时间
          serdata:"",              //后台传的多数据
          keys:"",
          arrs:[],
          danmu:"",
          _timeOut:""
        }
      },

      mounted(){
          let liList = $("footer").children("ul").children("li");
        if(liList.length>20){
          $("footer").children("ul").css({
              "-webkit-animation":"scollLeft 20s linear 0s infinite"
          })
        }
        this._timeOut =  setInterval(()=>{
              if(this.arrs.length>0){
                this.danmu = this.arrs[0]
                this.arrs.splice(0,1)
                setTimeout(()=>{
                  this.danmu = ""
                  $(".danmu-box").css("left","23.4rem")
                },5200)
                $(".danmu-box").animate({
                  left:-7.93+"rem"
                },5000)
              }
            },6000)


      },
      methods: {
        test(param) {
          this.product = param;
          this.provoidurl = this.product.pro_video
          $(".initmoney").html(this.product.pro_content.preparationamount)
          $(".initnum").html(this.product.pro_content.num)
        },
        daojishi(param){
          this.tiemrs = param
        },
        serverdata(param){
          this.serdata = param;
          this.$emit('erji',this.serdata);
        },




        startmu(){
          this.$axios({
            method: 'get',
            url: "../../static/data/time.json",
          }).then((response) => {
            this.timer = response.data;
          }).catch(err => {
          })
        },



      },
      watch:{


        'kets':function(x,y){
          this.keys = x.text
          this.arrs.push(this.keys)
          $(".initmoney").css("display","none");
          $(".initnum").css("display","none")
          // this.keys.push({
          //   name:x.text.name,
          //   num:x.text.num,
          //   image:x.text.image
          // })
        },

      },
      beforeDestroy(){
          clearInterval(this._timeOut)
      },
      props:["kets"]
    }
</script>

<style lang="scss">
  .raise-left-content{
    width: 14.07rem;
    height:100%;
    padding:.21rem .4rem .13rem .43rem;
    box-sizing: border-box;
    float: left;
    .raiis-menu{
      width: 100%;
      height: 100%;
      .menu-tit{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .start,.target-mny,.alread-mny,.help-num{
          width: 3.15rem;
          height:2.05rem;
          background: #fff;
          background:rgba(235,244,246,1);
          box-shadow:0px 3px 10px 0px rgba(119,119,119,0.1);
          border-radius:10px;
          padding-left: .36rem;
          padding-right: .21rem;
          box-sizing: border-box;
        }
        .start-btn{
          margin:.35rem auto;
          width:.89rem;
          height:.89rem;
          border-radius: 50%;
          background: url("../../assets/images/开始.png") no-repeat;
          background-size: cover;
          cursor: pointer;
          position: relative;
          p{
            position: absolute;
            left: .14rem;
            top: 1.04rem;
            font-size:.30rem;
            color:rgba(243,91,101,1);
          }
        }
        .tiemrss{
          width: 100%;
          height:100%;
          span{
            font-size: .5rem;
            line-height: 2.05rem;
          }
        }
        .tag-m{
          width: 100%;
          height:100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .tag-left{
            p{
              font-size: .28rem;
              color:rgba(29,247,224,1);
              white-space: nowrap;
              line-height: .9rem;
            }
            span{
              font-size:.24rem;
              color:rgba(153,153,153,1);
              display: block;
            }
          }
          .tag-right{
            width:.84rem;
            height:.84rem;
            background:rgba(255,82,116,0);
            border-radius:50%;
          }
        }
        .target-mny{
          .tag-right{
            background: url("../../assets/images/目标.png") no-repeat;
            background-size: cover;
          }
        }
        .alread-mny{
          .tag-right{
            background: url("../../assets/images/已筹资金.png") no-repeat;
            background-size: cover;
          }
        }
        .help-num{
          .tag-right{
            background: url("../../assets/images/次数.png") no-repeat;
            background-size: cover;
          }
        }
      }
      footer{
        background:rgba(154,237,235,1);
        box-shadow:0px .03rem .07rem 0px rgba(41, 8, 8, 0.35);
        border-radius:.10rem;
        width: 100%;
        height:1.24rem;
        overflow: hidden;
        ul{
          padding:0 .38rem;
          position: relative;
          top: 0;
          display: flex;
          flex-wrap: nowrap;
          right: 0;
          li{
            margin-right: .14rem;
            img{
              width: .79rem;
              height:.75rem;
              margin-right: .1rem;
              display: block;
            }
          }
      }
      }
      @-webkit-keyframes scollLeft {
        from {
          left: 100%;
        }
        to {
          left: -220%;
        }
      }

      @keyframes scollLeft {
        from {
          left: 100%;
        }
        to {
          left: -220%;
        }
      }

      @-moz-keyframes scollLeft {
        from {
          left: 100%;
        }
        to {
          left: -220%;
        }
      }

      @-o-keyframes scollLeft {
        from {
          left: 100%;
        }
        to {
          left: -220%;
        }
      }
    }
  }
  .danmu-box{
    width: 6.4rem;
    height:.85rem;
    position: fixed;
    left: 23.4rem;
    top: 1rem;
    background: url("../../assets/images/漂浮.png") no-repeat;
    background-size: cover;
    z-index: 9999999;
  }
  .danmu{
    overflow: hidden;
    width: 100%;
    height:100%;
  }
  .userherad{
    width: .85rem;
    height:.85rem;
    border-radius: 50%;
    background: black;
    float: left;
  }
  .userherad img{
    border-radius: 50%;
    width: .85rem;
    height:.85rem;
    display: block;
  }
  .useris{
    float: left;
    overflow: hidden;
  }
  .useris span{
    float: left;
    font-size: .25rem;
    color: #fff;
    line-height: .85rem;
  }
  .useris span:first-child{
    margin-left: .33rem;
    margin-right: .8rem;
  }




</style>
