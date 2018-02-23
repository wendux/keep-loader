// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

var t=e=>{console.log(e)}

KEEP("dev",()=>{
  console.log("我是测试环境")
})
KEEP("qa",()=>{
  console.log("我是qa环境环境")
})
KEEP("!dev",()=>{
  console.log("我是非测试环境")
})
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
