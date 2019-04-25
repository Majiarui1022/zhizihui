<template>
    <section class="raise-right">
      <div class="rig-cont">
        <div>
          <div class="heart-list"></div>
          <div class="list-pro">
            <ul>
              <li v-for="(val,index) in keys" :key="index">
                <div class="pro-head"><img :src="val.image" alt=""></div>
                <div class="name-mny">
                  <span class="list-name">{{val.name}}</span>
                  <span class="list-price">{{val.sum}}</span>
                </div>
              </li>
              <!--<li>-->
                <!--<div class="pro-head"><img src="../../assets/images/开始.png" alt=""></div>-->
                <!--<div class="name-mny">-->
                  <!--<span class="list-name" v-if="keys">{{keys.text.name}}</span>-->
                  <!--<span class="list-price" v-if="keys">{{keys.text.sum}}</span>-->
                <!--</div>-->
              <!--</li>-->
              <!--<li>-->
                <!--<div class="pro-head"><img src="../../assets/images/开始.png" alt=""></div>-->
                <!--<div class="name-mny">-->
                  <!--<span class="list-name">奥巴马</span>-->
                  <!--<span class="list-price">￥999</span>-->
                <!--</div>-->
              <!--</li>-->
            </ul>
          </div>
        </div>
      </div>
    </section>

</template>

<script>
    export default {
        name: "RaisefundsRight",
      data(){
          return{
              keys:[]
          }

      },
      created(){
      },
     methods:{
     },
      mounted(){
      },
      watch:{
          'kets':function(x,y){
            this.keys.push(x.text)
            if(this.keys.length>9){
               this.keys.splice(0,1);
            }
            // this.keys.push({
            //   name:x.text.name,
            //   num:x.text.num,
            //   image:x.text.image
            // })
          }
      },
      props:["kets"]
    }
</script>

<style lang="scss">
  .raise-right{
    padding:.06rem .09rem;
    border-left:1px solid rgba(122,168,202,1);
    float: left;
    .rig-cont{
      width:4.89rem;
      height: 10.60rem;
      background:linear-gradient(38deg,rgba(21,204,194,1) 0%,rgba(33,98,148,1) 100%);
      box-shadow:0px .03rem .07rem 0px rgba(0, 0, 0, 0.35);
      box-sizing: border-box;
      padding:.34rem .44rem .34rem .34rem;
      .heart-list{
        width: 3.18rem;
        height:.8rem;
        margin:0 auto;
        background: url("../../assets/images/爱心名单.png") no-repeat;
        background-size: cover;
      }
      .list-pro{
        margin-top:.34rem;
        ul{
          li:last-child{
            margin-bottom: 0;
          }
          li{
            overflow: hidden;
            .pro-head{
              width: .78rem;
              height:.78rem;
              border-radius: 50%;
              float: left;
              margin-right: .35rem;
              display: flex;
              align-items: center;
              margin-bottom: .25rem;
              img{
                width: .78rem;
                height:.78rem;
                border-radius: 50%;
                display: block;
              }
            }
            .name-mny{
              float: left;
              overflow: hidden;
              width: 2.95rem;
              span{
                font-size: .28rem;
                font-family:MFShangHei_Noncommercial-Regular;
                color:rgba(255,255,255,1);
              }
              .list-name{
                float: left;
              }
              .list-price{
                float: right;
              }
            }
          }
        }
      }
    }
  }
</style>
