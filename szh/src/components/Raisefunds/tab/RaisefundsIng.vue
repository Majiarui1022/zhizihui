<template>
    <div class="start-cen">
      <div class="void-b">
        <video id="vopods" src="" style="width: 100%;height:100%;object-fit:fill" controls="controls" autoplay="autoplay"></video>
      </div>
      <div class="wx-ewm">
        <div class="sy-m">
          <img :src="this.letNavData.pro_content.qrcode" alt="">
        </div>
        <p v-if="this.letNavData">
          {{this.letNavData.pro_content.message}}
        </p>
      </div>
    </div>
</template>

<script>
    export default {
      props:['letNavData'],
        name: "RaisefundsIng",
      data(){
          return{
            voidurl:"",
            photo:"",
            token:"",        //身份验证
            proid:"",       //项目ID
            productinfos:"",
            timer:"",         //子传夫的时间
            rid:"",            //webscorkt地址
            productsb:"",        //接受后台值
            num:0
          }
      },
      created(){
        this.rid = window.sessionStorage.getItem('home')
        this.token = window.sessionStorage.getItem('tok')
        this.proid = window.sessionStorage.getItem('proid')
        this.$axios({
          url: `https://kungfunion.club/start/screes/${this.proid}/`,
          method: 'put',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utd-8"
          }
        }).then(res => {
          this.initWebSocket();
          this.initWebSockets();
        }).catch(err => {
        });

      },
      destroyed() {
        this.websock.close() //离开路由之后断开websocket连接
      },
      mounted(){

        setTimeout(()=>{
          $("#vopods").attr("src",this.letNavData.pro_video[0].vedio)

          document.getElementById("vopods").addEventListener('ended',() =>{
            this.num++;
            if(this.num>=this.letNavData.pro_video.length){
              this.num = 0;
            }
            $("#vopods").attr("src",this.letNavData.pro_video[this.num].vedio)
          });
        },10000)


        this.$axios({
          method: 'get',
          url: "../../static/data/void.json",
        }).then((response) => {
         this.voidurl = response.data[0].void;
         this.photo = response.data[1].photos;
        }).catch(err => {
        })
      },
      methods:{
        //初始化websocket
        initWebSocket() {
          const wsuri = `wss://kungfunion.club/ws/project/${this.rid}/`;
          this.websock = new WebSocket(wsuri);//这里面的this都指向vue
          this.websock.onopen = this.websocketopen;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
          this.websock.onerror = this.websocketerror;
        },
        websocketopen() {//打开
          console.log("WebSocket连接成功")
        },
        websocketonmessage(e) { //数据接收
          this.productinfos = JSON.parse(e.data);
          // console.log(this.productinfos.text.left_time)
          this.$emit('times',this.productinfos.text.left_time);
          this.$emit('websodong',this.rid);
          if(this.productinfos.text.left_time == 0){
            this.$router.push({
              name:'Lovelist',
              query:{
                id:this.proid
              }
            })
          }
        },
        websocketclose() {  //关闭
          console.log("WebSocket关闭");

        },
        websocketerror() {  //失败
          console.log("WebSocket连接失败");
        },





      }
    }
</script>

<style lang="scss">
  .start-cen{
    width: 13.22rem;
    height:6.78rem;
    margin:.2rem 0;
    background:rgba(248,248,248,1);
    box-shadow:0px 3px 7px 0px rgba(41, 8, 8, 0.35);
    border-radius:8px;
    position: relative;
    .void-b{
      width:9.51rem;
      height:5.33rem;
      border-radius:.10rem;
      position: absolute;
      top:.51rem;
      left: .33rem;
    }
    .wx-ewm{
      position: absolute;
      top:.6rem;
      right: .5rem;
      .sy-m{
        width: 2.27rem;
        height:2.31rem;
        img{
          width: 2.27rem;
          height:2.31rem;
          display: block;
        }
      }
      p{
        width:2.45rem;
        font-size:18px;
        font-weight:bold;
        color:rgba(0,0,0,1);
        line-height:26px;
        background:linear-gradient(-41deg,rgba(29,143,247,1) 0%, rgba(209,32,74,1) 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        margin-top:.3rem;
      }
    }

  }
</style>
