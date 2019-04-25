<template>
  <div class="whole-box">
    <div class="whole-cen">
      <RaisefundsLeft @erji="prodata" :kets="productsb"></RaisefundsLeft>
      <RaisefundsRight :kets="productsb"></RaisefundsRight>
    </div>
  </div>
</template>

<script>
    import RaisefundsRight from "../components/Raisefunds/RaisefundsRight";
    import RaisefundsLeft from "../components/Raisefunds/RaisefundsLeft";
    export default {
        name: "raisefunds",
      components: {RaisefundsLeft, RaisefundsRight},
      data(){
        return{
          cons:"",
          num:0,
          productsb:""
        }
      },
      created(){
          setTimeout(()=>{
          },3000)
      },
      destroyed() {
        this.websock.close() //离开路由之后断开websocket连接
      },
      methods:{

        prodata(param){
          this.cons = param;
          this.num++;
          if(this.num <= 1){
            this.initWebSockets()
          }
        },


        initWebSockets() {
          const wsuri = `wss://kungfunion.club/ws/pro/${this.cons}/`;
          this.websock = new WebSocket(wsuri);//这里面的this都指向vue
          this.websock.onopen = this.websocketopens;
          this.websock.onmessage = this.websocketonmessages;
          this.websock.onclose = this.websocketcloses;
          this.websock.onerror = this.websocketerrors;
        },
        websocketopens() {//打开
          console.log("WebSocket连接成功")
        },
        websocketonmessages(e) { //数据接收
          console.log(e.data)
          this.productsb = JSON.parse(e.data);
          console.log(this.productsb.text)
          // console.log(this.productinfos.text.left_time)

        },
        websocketcloses() {  //关闭
          console.log("WebSocket关闭");

        },
        websocketerrors() {  //失败
          console.log("WebSocket连接失败");
        },
      },
    }
</script>

<style scoped lang="scss">
  .whole-box{
    width: 100%;
    height:100%;
    overflow: hidden;
    background:linear-gradient(38deg,rgba(21,204,194,1) 0%,rgba(33,98,148,1) 100%);
    .whole-cen{
      width: 19.2rem;
      margin:0 auto;
    }
  }
</style>
<!--1407   513-->
