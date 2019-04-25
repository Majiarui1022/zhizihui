Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../assets/icons/1.png',
      '../assets/icons/1.png',
      '../assets/icons/1.png',
      '../assets/icons/1.png'
    ],
    indicatorDots: false,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 500,       //滑动动画时长
    inputShowed: false,
    currentSwiper: 0,
    autoplay: true,
    yuanshi:"#a6a7a9",
    zhihou:"#fff",
    array: [
      {
        id: 1,
        zhi: 1,
        zi: "单亲妈妈的孩子骨髓移植后并发症医药费告急",
        yichou: 28888,
        mb: 1000000,
        name: "进行中"
      },
      {
        id:2,
        zhi: 1,
        zi: "单亲妈妈的孩子骨髓移植后并发症医药费告急",
        yichou: 28888,
        mb: 1000000,
        name: "等待中"
      },
      {
        id: 3,
        zhi: 1,
        zi: "单亲妈妈的孩子骨髓移植后并发症医药费告急",
        yichou: 28888,
        mb: 1000000,
        name: "等待中"
      },
      {
        id: 4,
        zhi: 1,
        zi: "单亲妈妈的孩子骨髓移植后并发症医药费告急",
        yichou: 28888,
        mb: 1000000,
        name: "等待中"
      }
    ],
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  // onLoad: function (option){
  //   const url = "";
  //   var that = this;
  //   wx.request({
  //     url: url, // 仅为示例，并非真实的接口地址
  //     method:'post',
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       console.log(res)
  //     },
  //   })
  //     console.log(option.query)
  // },
  colmnys:function(){
    // var id = event.target.dataset.id
    // console.log(this.data.array)
    wx.navigateTo({
      url: "../colmny/colmny?id='+id+'"
    })
  }
})