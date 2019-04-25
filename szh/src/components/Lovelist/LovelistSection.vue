<template>
  <div class="list-section-box">
    <div class="s-list-tit">
      <img src="../../assets/images/爱心名单.png" alt="">
    </div>
    <div class="thank-tit">
      <p v-if="prods">{{prods.pro_content.end_message}}</p>
    </div>
    <div class="s-list-mny">
      <ul>
        <li v-for="(val,index) in prolists" :key="index"><span>{{val.pid}}</span></li>

      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LovelistSection",
    data(){
      return{
        prods:"",
        prolists:""
      }
    },
    created(){
      console.log(this.onsc)
    },
    watch:{
      'onsc':function(x,y){
        console.log(x,y)
        this.prolists = x
      },
      'onscc':function(x,y){
        console.log(x,y)
        this.prods = x;
        console.log(this.prods)
      }
    },
    props:['onsc','onscc']
  }
</script>

<style lang="scss">
  $width : 17.55rem;
  .list-section-box{
    width: $width;
    margin:0 auto;
    padding-top:.85rem;
    .s-list-tit{
      width: 100%;
      img{
        display: block;
        margin:0 auto;
        width: 3.18rem;
        height:auto;
      }
    }
    .thank-tit{
      width: 100%;
      margin-bottom:1.07rem;
      margin-top:.17rem;
      p{
        margin:0 auto;
        text-align: center;
        max-width:9.06rem;
        font-size:.32rem;
        color:rgba(255,255,255,1);
        line-height:.46rem;
        max-height: 1.7rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .s-list-mny{
      width: 100%;
      position: relative;
      height: 4.5rem;
      overflow: hidden;
      ul{
        width: 5.8rem;
        overflow: hidden;
        height:4.5rem;
        position: absolute;
        left: 50%;
        margin-left: -2.6rem;
        /*-webkit-animation: anim1 3s linear infinite;*/
        animation: scrollChild 20s linear infinite;
        top:-100%;
        li{
          width: 1.45rem;
          float: left;
          text-align: center;
          span{
            display: block;
            font-size:.28rem;
            color:rgba(255,255,255,1);
            line-height:.63rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    @keyframes scrollChild {
      0% {
        transform: translateY(200%);
      }
      to {
        transform: translateY(0);
      }
    }
  }
</style>
