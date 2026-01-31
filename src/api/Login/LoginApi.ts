import createRequest from "@/utils/request";
import { anchorEmits, ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from "@/stores/userStore";


const { request } = createRequest();

export const LoginApi={
    Login : (dto:{userName:string,phone:string,code:string,password:string},router:any)=>{
       return request.post(`/User/Login?login_name=client`,dto).then(res=>{
           if(res.status==200){
            const userStore = useUserStore();
            ElMessage.success(`登录成功！欢迎你`)
            userStore.login(res.data.token)
            router.push('/')
           } else {
        ElMessage.error(res.data.msg || '登录失败，请检查账号密码')
            }
        }).catch(error=>{
             // 3. 网络/系统异常处理
      let errorMsg = '登录失败，请稍后重试'
      
      // 区分不同异常类型
      if (error.response) {
        const status = error.response.status
        switch (status) {
          case 401:
            errorMsg = '账号未授权，请重新登录'
            break
          case 403:
            errorMsg = '账号被禁用，请联系管理员'
            break
          case 404:
            errorMsg = '登录接口不存在，请检查接口地址'
            break
          case 500:
            errorMsg = '服务器内部错误，请联系管理员'
            break
          default:
            errorMsg = error.response.data?.msg || `请求失败（${status}）`
        }
    }
        })
     
  },
   GetVerificationCode:(phone:string)=>{
        return request.get(`/User/GetVerificationCode?phone=${phone}`);
    },
    GetUserInformation:()=>{
      return request.get(`/User/GetUserInformation`)
    }
}