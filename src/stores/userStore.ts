import { defineStore } from 'pinia'
import { ref } from 'vue'


// 定义用户 Store，存储登录状态
export const useUserStore = defineStore('user', () => {
  // 登录状态：token 存在则视为已登录
  const token = ref(localStorage.getItem('token') || '')
  const showLogin = ref(false)
  const userInfo = ref({})
  const login = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }
  
  // 退出登录：清空 token
  const logout = () => {
    token.value = ''
    localStorage.removeItem('token')
  }
  const setUserinfo=(userinfo:any)=>{
    userInfo.value=userinfo
  }
  // 判断是否登录
  const isLogin = () => {
    return !!token.value
  }

  return { token, login, logout, isLogin,showLogin,userInfo,setUserinfo }
})