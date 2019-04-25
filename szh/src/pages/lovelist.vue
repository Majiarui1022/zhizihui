<template>
    <div class="love-box">
        <LovelistHeader :proda="prosb"></LovelistHeader>
        <LovelistSection :onsc="datalist" :onscc="prosb"></LovelistSection>
    </div>
</template>

<script>
    import LovelistHeader from "../components/Lovelist/LovelistHeader";
    import LovelistSection from "../components/Lovelist/LovelistSection";
    export default {
        name: "lovelist",
      components: {LovelistSection, LovelistHeader},
      data(){
          return{
            page:"",
            datalist:"",
            prosb:"",
            token:"",
            userproID:""
        }
      },
      created(){
        this.token = window.sessionStorage.getItem('tok')
        this.userproID = window.sessionStorage.getItem('id')
        this.page = window.sessionStorage.getItem('proid')


        this.$axios({
          url: `https://kungfunion.club/projects/enddonors?project_id=${this.page}`,
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utd-8"
          }
        }).then(res => {
          this.datalist = res.data
        }).catch(err => {
        });


        this.$axios({
          url: `https://kungfunion.club/projects/${this.page}/`,
          method: 'get',
          headers: {
            'Authorization':'JWT '+this.token,
            'Accept':"application/json; charset=utd-8"
          }
        }).then(res => {
          this.prosb = res.data
        }).catch(err => {
        });




      },
      methods: {
      }
    }
</script>

<style scoped lang="scss">
  .love-box{
    width:100% !;
    height:100%;
    background:linear-gradient(0deg,rgba(21,204,194,1) 0%,rgba(33,98,148,1) 100%);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
  }
</style>
