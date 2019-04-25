import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login'
import Register from '../pages/register'
import Findpwd from '../pages/findpwd'
import Information from  '../pages/information'
import InformationBackstage from '../components/Information/tab/InformationBackstage'
import InformationPres from '../components/Information/tab/InformationPres'
import InformationAddproduct from '../components/Information/tab/InformationAddproduct'
import InformationDmend from  '../components/Information/tab/InformationAmend'
import InformationScene from '../components/Information/tab/InformationScene'
import Select from '../pages/select'
import Super from '../pages/super'
import SuperPersonlist from '../components/Super/tab/SuperPersonlist'
import SuperAdministration from '../components/Super/tab/SuperAdministration'
import Raisefunds from '../pages/raisefunds'
import RaisefundsStart from  '../components/Raisefunds/tab/RaisefundsStart'
import RaisefundsIng from  '../components/Raisefunds/tab/RaisefundsIng'
import Lovelist from '../pages/lovelist'
import cs from '../pages/cs'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cs',
      name: 'cs',
      component: cs
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/findpwd',
      name: 'Findpwd',
      component: Findpwd
    },
    {
      path: '/select',
      name: 'Select',
      component: Select,
    },
    {
      path: '/lovelist',
      name: 'Lovelist',
      component: Lovelist,
    },
    {
      path: '/raisefunds',
      name: 'Raisefunds',
      component: Raisefunds,
      children:[
        {
          path: '/raisefundsStart',
          name: 'RaisefundsStart',
          component: RaisefundsStart,
        },
        {
          path: '/raisefundsIng',
          name: 'RaisefundsIng',
          component: RaisefundsIng,
        }
      ]
    },
    {
      path:'/super',
      name: 'Super',
      component: Super,
      children:[
        {
          path:'/superPersonlist',
          name: 'SuperPersonlist',
          component: SuperPersonlist,
        },
        {
          path:'/superAdministration',
          name: 'SuperAdministration',
          component: SuperAdministration,
        }
      ]
    },
    {
      path: '/information',
      name: 'Information',
      component: Information,
      children:[
        {
          path: '/informationBackstage',
          name: 'InformationBackstage',
          component: InformationBackstage,
        },
        {
          path: '/informationPres',
          name: 'InformationPres',
          component: InformationPres,
        },
        {
          path: '/informationAddproduct',
          name: 'InformationAddproduct',
          component: InformationAddproduct,
        },
        {
          path: '/informationDmend',
          name: 'InformationDmend',
          component: InformationDmend,

        },
        {
          path: '/informationScene',
          name: 'InformationScene',
          component: InformationScene,

        }
      ]
    }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/findpwd') {
    next();
  }else{
    let token = sessionStorage.getItem('tok');
    if (token === null || token === '') {
      next('/login');
      return;
    } else {
      next()
    }
  }

});


  // else {
  //   let token = sessionStorage.getItem('tok');
  //   if (token === 'null' || token === '') {
  //     next('/login');
  //     return;
  //   } else {
  //     // router.push({
  //     //   name: 'UserLogIn',
  //     //   params: {redirect: to.fullPath}
  //     // })
  //   }
  // }
// });

export default router;
