<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light"
    style="margin-bottom: 20px;"
  >
    <div class="container">
      <!-- 用routerlink包裹实现路由跳转而非href -->
      <router-link
        to="/"
        class="navbar-brand"
      >
       <div id="main"  :style="{width:'250px',height:'40px'}"></div>
      </router-link>
      <!-- navbar-toggler是切换触发器，进行移动端适配 
      下面这个div里的内容都是#navbarSupportedContent-->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- collapse作为折叠面板属性 -->
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <!-- mr-auto 和 ml-auto 用于强制隔离两边的距离，实现类水平隔离效果 -->
        <!-- 使用xs的{property}{sides}-{size} 和sm, md, lg,和 xl的 {property}{sides}-{breakpoint}-{size}格式命名 -->
        <!-- mt-2:用于间距处理, margin-top设置为 $spacer * .5  -1 *.25 -3 *1 -4 * 1.5 -5 *3 -->
        <!-- x - 对于同时设置*-left和*-right的类  y - 对于同时设置*-top和*-bottom的类 blank - 用于在元素的所有4个边上设置margin或padding的类-->
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link
              to="/"
              class="nav-link"
            >Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link disabled"
              href="#"
            >Explore</a>
          </li>
        </ul>
        <form v-if="sharedState.is_authenticated" class="form-inline navbar-left mr-auto">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
          >
          <!-- 暂时先禁止提交，后续实现搜索再改回 type="submit"
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            type="button"
          >Search</button> -->
        </form>
        <!-- 已经通过身份认证了才能展示message和profile等信息,才可以logout -->
        <ul
          v-if="sharedState.is_authenticated"
          class="nav navbar-nav navbar-right"
        >
          <li class="nav-item">
            <a
              class="nav-link disabled"
              href="#"
            >Messages</a>
          </li>
          <li class="nav-item">
            <router-link
              :to="{name:'Profile',params:{id : sharedState.user_id}}"
              class="nav-link"
            >Profile</router-link>
          </li>
          <li class="nav-item">
            <a
              @click="handlerLogout"
              class="nav-link"
              href="#"
            >Logout</a>
          </li>
        </ul>
        <ul
          v-else
          class="nav navbar-nav navbar-right"
        >
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link"
            >Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import store from '../store.js'
export default {
  
  name: "Navbar",
  data() {
    return {
      sharedState: store.state
    };
  },
  methods: {
    handlerLogout() {
      store.logoutAction();
      this.$router.push("/login");
    },
    drawLogo(){
      let myChart = this.$echarts.init(document.getElementById("main"))
      let option = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'B   ',
          fontSize: 40,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: 'rgba(0,0,0,0.5)',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 3000,
          //loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0],
                color : '#000'
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: 'rgba(0,0,0,0.75)'
              }
            }
          ]
        }
      },
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: ' O  ',
          fontSize: 40,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: 'rgba(0,0,0,0.3)',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 4000,
          //loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: 'rgba(0,0,0,0.4)'
              }
            }
          ]
        }
      },
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '  SE',
          fontSize: 40,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: 'rgba(0,0,0,0.5)',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 5000,
          //loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: 'rgba(0,0,0,0.75)'
              }
            }
          ]
        }
      }
    ]
  }
};
      myChart.setOption(option);
    }
  },
   mounted(){
    this.drawLogo();
  }


};








</script>