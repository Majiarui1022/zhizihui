Page({

  data:{
    imgUrls: [
      '../assets/icons/1.png',
      '../assets/icons/1.png',
      '../assets/icons/1.png',
      '../assets/icons/1.png'
    ],
    items: [
      { name: 'USA', value: '9.9', checked: true },
      { name: 'CHN', value: '99', checked:false},
      { name: 'BRA', value: '999',checked:false }
    ],
    indicatorDots: false,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 500,       //滑动动画时长
    inputShowed: false,
    currentSwiper: 0,
    autoplay: true,
    yuanshi: "#a6a7a9",
    zhihou: "#fff",
    clsa:true
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  consad:function(){
    console.log(123)
  },

  onLoad: function (options) {
    console.log(options)
    // 赋值
    this.setData({
      newsid: options.id
    })
    console.log('onload')
  },
  /**
   * 页面的初始数据
   */
  change(e){
    console.log(e)
  }

  /**
   * 生命周期函数--监听页面加载
   */
 
})