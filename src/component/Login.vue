<template>
  <!-- 遮罩层 -->
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    
    <!-- 外围关闭按钮 -->
    <button 
      @click="close" 
      class="absolute top-8 right-8 text-white/50 hover:text-white transition-colors group"
    >
      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span class="block text-xs text-center mt-1 group-hover:opacity-100 opacity-0 transition-opacity">关闭</span>
    </button>

    <!-- 登录主卡片 -->
    <div class="w-[880px] h-[520px] rounded-3xl shadow-2xl flex overflow-hidden bg-white animate-in fade-in zoom-in duration-300">
      
      <!-- 左侧：品牌展示区 -->
      <div class="w-[340px] bg-[#4F46E5] relative overflow-hidden p-10 flex flex-col justify-between text-white">
        <!-- 背景装饰球 -->
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>

        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-12">
            <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span class="text-xl font-black tracking-tight">无边商城</span>
          </div>
          
          <h2 class="text-3xl font-bold leading-tight mb-6">助力企业<br/>突破数字化边界</h2>
          
          <ul class="space-y-4">
            <li v-for="item in features" :key="item" class="flex items-center gap-3 text-indigo-100 text-sm">
              <div class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✓</div>
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="relative z-10 flex items-center gap-3 opacity-60 text-xs">
          <span>© 2026 Boundless Mall</span>
          <span class="w-1 h-1 bg-white rounded-full"></span>
          <span>数字化增长平台</span>
        </div>
      </div>

      <!-- 右侧：表单区 -->
      <div class="flex-1 bg-white p-12 relative flex flex-col">
        
        <!-- 右上角切换图标 (二维码/电脑) -->
        <div class="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div 
            @click="loginMode = loginMode === 'qr' ? 'sms' : 'qr'"
            class="absolute top-0 right-0 w-[100px] h-[100px] bg-indigo-50 rotate-45 translate-x-12 -translate-y-12 cursor-pointer hover:bg-indigo-100 transition-colors"
          ></div>
          <div @click="loginMode = loginMode === 'qr' ? 'sms' : 'qr'" class="absolute top-3 right-3 cursor-pointer text-indigo-600">
            <svg v-if="loginMode !== 'qr'" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v3h-2v-3zm3 3h3v2h-3v-2zm-3 2h2v3h-2v-3zm3 1h3v2h-3v-2zm-3 2h3v2h-3v-2z"/>
            </svg>
            <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <!-- 扫码登录界面 -->
        <div v-if="loginMode === 'qr'" class="flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-right-4">
          <h3 class="text-xl font-bold text-gray-800 mb-8">扫码登录</h3>
          <div class="p-4 border border-gray-100 rounded-2xl shadow-sm mb-6 relative group">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BoundlessMall" alt="QR" class="w-40 h-40 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div v-if="qrExpired" class="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-2xl">
              <p class="text-xs text-gray-500 mb-2">二维码已失效</p>
              <button @click="qrExpired = false" class="text-sm font-bold text-indigo-600">点击刷新</button>
            </div>
          </div>
          <p class="text-sm text-gray-500">请使用 <span class="text-indigo-600 font-medium">无边商城APP</span> 扫码登录</p>
        </div>

        <!-- 表单登录界面 -->
        <div v-else class="flex-1 flex flex-col animate-in fade-in slide-in-from-left-4">
          <!-- Tab 切换 -->
          <div class="flex gap-8 mb-10 border-b border-gray-100">
            <button 
              v-for="m in ['sms', 'pwd']" :key="m"
              @click="switchLoginType(m === 'sms' ? 'code' : 'pwd')"
              class="pb-4 text-sm font-bold transition-all relative"
              :class="loginType === (m === 'sms' ? 'code' : 'pwd') ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'"
            >
              {{ m === 'sms' ? '验证码登录' : '账号密码登录' }}
              <div v-if="loginType === (m === 'sms' ? 'code' : 'pwd')" class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></div>
            </button>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- 账号/手机号 -->
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                {{ loginType === 'code' ? '手机号码' : '登录账号' }}
              </label>
              <div class="relative">
                <input 
                  v-model="currentLoginField"
                  :type="loginType === 'code' ? 'tel' : 'text'"
                  :placeholder="loginType === 'code' ? '请输入手机号' : '用户名 / 邮箱'"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                  @blur="loginType === 'code' && checkMobileFormat()"
                />
              </div>
            </div>

            <!-- 验证码/密码 -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center ml-1">
                <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {{ loginType === 'code' ? '短信验证码' : '登录密码' }}
                </label>
                <button v-if="loginType === 'pwd'" type="button" @click="gotoForgetPwd" class="text-[11px] text-indigo-500 font-bold hover:underline">忘记密码？</button>
              </div>
              <div class="relative">
                <input 
                  v-model="currentLoginValue"
                  :type="loginType === 'pwd' && !showPwd ? 'password' : 'text'"
                  :placeholder="loginType === 'code' ? '6位验证码' : '请输入密码'"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                />
                <div v-if="loginType === 'code'" class="absolute right-2 top-1/2 -translate-y-1/2">
                  <button 
                    type="button"
                    @click="handleGetCode"
                    :disabled="!canGetCode"
                    class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    :class="countdown > 0 ? 'text-gray-400 bg-gray-100' : 'text-indigo-600 hover:bg-indigo-50'"
                  >
                    {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                  </button>
                </div>
                <button 
                  v-if="loginType === 'pwd'"
                  type="button"
                  @click="showPwd = !showPwd"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="!showPwd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878l3.29-3.29m7.532 7.532l3.29-3.29" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- 协议同意 -->
            <div class="flex items-center gap-2 mt-2">
              <input 
                type="checkbox" 
                v-model="agreeProtocol" 
                id="protocol"
                class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              >
              <label for="protocol" class="text-xs text-gray-500 cursor-pointer">
                同意<a href="javascript:;" @click="openProtocol('service')" class="text-indigo-600 hover:underline">服务协议</a>和<a href="javascript:;" @click="openProtocol('privacy')" class="text-indigo-600 hover:underline">隐私政策</a>
              </label>
            </div>

            <button 
              type="submit"
              :disabled="loading || !canLogin"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
              :class="!canLogin && 'opacity-70 cursor-not-allowed'"
            >
              <div v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {{ loading ? '安全登录中...' : '立即登录' }}
            </button>
          </form>

          <div class="mt-auto pt-6 flex justify-between items-center">
            <p class="text-xs text-gray-400">
              登录即同意 <span class="text-gray-600 hover:underline cursor-pointer">用户协议</span>
            </p>
            <button @click="gotoRegister" class="text-xs font-bold text-indigo-600 hover:text-indigo-700">免费注册账号</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 滑动验证弹窗 -->
    <div v-if="showSliderVerify" class="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div class="bg-white rounded-2xl p-6 w-[300px] shadow-2xl">
        <h3 class="text-lg font-bold text-gray-800 mb-4 text-center">安全验证</h3>
        <div class="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
          <div class="absolute left-0 top-0 h-full bg-indigo-600 transition-all" :style="{ width: sliderWidth + 'px' }"></div>
          <div 
            class="absolute left-0 top-0 h-full w-12 bg-white shadow-md rounded-lg flex items-center justify-center cursor-grab select-none"
            :style="{ left: sliderWidth + 'px' }"
            @mousedown="handleDragStart"
            @touchstart="handleDragStart"
          >
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-4 text-center">请滑动滑块完成验证</p>
      </div>
    </div>

    <!-- Toast 提示 -->
    <div v-if="toast.visible" class="fixed top-8 left-1/2 -translate-x-1/2 z-70 flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg animate-fade-up" :class="toast.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
      <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { LoginApi } from '../api/Login/LoginApi';

// Props 支持 v-model 双向绑定
interface Props {
  modelValue: boolean;
}
const userStore = useUserStore();
const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const router = useRouter();

// 品牌数据（原页面保留）
const features = [
  '一站式数字化增长解决方案',
  '全球优质分销资源对接',
  '智能供应链与库存管理',
  '多维度数据分析决策支持'
];

// 核心响应式数据（整合后的逻辑）
const form = ref({ 
  userName: '', 
  mobile: '', 
  code: '', 
  pwd: '' 
});
const loginType = ref<'code' | 'pwd'>('code'); // 替换原loginMode，保持逻辑统一
const loginMode = ref<'sms' | 'pwd' | 'qr'>('sms'); // 保留原变量适配模板
const showPwd = ref(false);
const countdown = ref(0);
const agreeProtocol = ref(true);
const loading = ref(false);
const showSliderVerify = ref(false);
const sliderWidth = ref(0);
const startX = ref(0);
const isVerified = ref(false);
const qrExpired = ref(false); // 原页面保留
let timer: NodeJS.Timeout | null = null;

// Toast 提示
const toast = ref({
  visible: false,
  message: '',
  type: 'success' as 'success' | 'error'
});

// 显示 Toast
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.value = { visible: true, message, type };
  setTimeout(() => hideToast(), 3000);
};

// 隐藏 Toast
const hideToast = () => {
  toast.value.visible = false;
};

// 修复 v-model 的计算属性
const currentLoginField = computed({
  get() {
    return loginType.value === 'code' ? form.value.mobile : form.value.userName;
  },
  set(val) {
    if (loginType.value === 'code') {
      form.value.mobile = val;
    } else {
      form.value.userName = val;
    }
  }
});

const currentLoginValue = computed({
  get() {
    return loginType.value === 'code' ? form.value.code : form.value.pwd;
  },
  set(val) {
    if (loginType.value === 'code') {
      form.value.code = val;
    } else {
      form.value.pwd = val;
    }
  }
});

// 是否可获取验证码
const canGetCode = computed(() => {
  const mobileReg = /^1[3-9]\d{9}$/;
  return mobileReg.test(form.value.mobile) && agreeProtocol.value && countdown.value === 0;
});

// 是否可登录
const canLogin = computed(() => {
  if (!agreeProtocol.value) return false;
  
  if (loginType.value === 'code') {
    const mobileReg = /^1[3-9]\d{9}$/;
    return mobileReg.test(form.value.mobile) && form.value.code.length === 6 && isVerified.value;
  }
  
  return form.value.userName.trim() !== '' && form.value.pwd.length >= 6 && isVerified.value;
});

// 检查手机号格式
const checkMobileFormat = () => {
  const mobileReg = /^1[3-9]\d{9}$/;
  if (form.value.mobile.length === 11 && !mobileReg.test(form.value.mobile)) {
    showToast('请输入正确的手机号格式', 'error');
  }
};

// 切换登录类型（适配原页面的tab切换）
const switchLoginType = (type: 'code' | 'pwd') => {
  loginType.value = type;
  loginMode.value = type === 'code' ? 'sms' : 'pwd'; // 同步原loginMode变量
  isVerified.value = false;
  
  if (type === 'code') {
    form.value.userName = '';
    form.value.pwd = '';
  } else {
    form.value.mobile = '';
    form.value.code = '';
  }
};

// 打开协议详情
const openProtocol = (type: 'service' | 'privacy') => {
  showToast(`已打开${type === 'service' ? '服务协议' : '隐私政策'}`, 'success');
};

// 获取验证码
const handleGetCode = () => {
  if (!canGetCode.value || countdown.value > 0) return;
  
  if (!isVerified.value) {
    showSliderVerify.value = true;
    return;
  }
  
  getVerificationCode();
};

// 调用获取验证码接口
const getVerificationCode = () => {
  LoginApi.GetVerificationCode(form.value.mobile).then(res=>{
    if(res.status === 200){
      showToast('验证码发送成功', 'success');
    } else {
      showToast('验证码发送失败，请稍后重试', 'error');
    }
  }).catch(() => {
    showToast('网络异常，验证码发送失败', 'error');
  });
  startCountdown();
};

// 开始倒计时
const startCountdown = () => {
  countdown.value = 60;
  if (timer) clearInterval(timer);
  
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer!);
      timer = null;
    }
  }, 1000);
};

// 滑动验证
const handleDragStart = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  startX.value = 'touches' in e ? e.touches[0].clientX : e.clientX;
  
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('touchmove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchend', handleDragEnd);
};

const handleDragMove = (e: MouseEvent | TouchEvent) => {
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const moveX = clientX - startX.value;
  
  const trackWidth = 260;
  sliderWidth.value = Math.max(0, Math.min(moveX, trackWidth));
};

const handleDragEnd = () => {
  document.removeEventListener('mousemove', handleDragMove);
  document.removeEventListener('touchmove', handleDragMove);
  document.removeEventListener('mouseup', handleDragEnd);
  document.removeEventListener('touchend', handleDragEnd);
  
  const trackWidth = 260;
  if (sliderWidth.value / trackWidth >= 0.95) {
    isVerified.value = true;
    showSliderVerify.value = false;
    sliderWidth.value = 0;
    
    if (loginType.value === 'code' && canGetCode.value && countdown.value === 0) {
      getVerificationCode();
    }
    
    showToast('验证成功', 'success');
  } else {
    sliderWidth.value = 0;
    showToast('验证失败，请重新滑动', 'error');
  }
};

// 登录逻辑（整合后）
const handleLogin = () => {
  if (!canLogin.value) {
    if (!agreeProtocol.value) {
      showToast('请先同意服务协议和隐私政策', 'error');
    } else if (!isVerified.value) {
      showSliderVerify.value = true;
    } else if (loginType.value === 'code') {
      showToast('请输入正确的手机号和6位验证码', 'error');
    } else {
      showToast('请输入正确的账号和密码（密码至少6位）', 'error');
    }
    return;
  }

  loading.value = true;
  
  const loginParams = {
    userName: form.value.userName,
    phone: form.value.mobile,
    code: form.value.code,
    password: form.value.pwd
  };
  
  LoginApi.Login(loginParams, router).then((res: any) => {
    loading.value = false;
    LoginApi.GetUserInformation().then((res) => {
        userStore.setUserinfo(res.data.userProfile);
     close();
    });
    
  });
};

// 页面跳转
const gotoRegister = () => {
  router.push('/pages/index/Register');
  close(); // 关闭登录弹窗
};

const gotoForgetPwd = () => {
  router.push('/pages/index/ForgetPwd');
  close(); // 关闭登录弹窗
};

// 关闭弹窗（原页面保留）
const close = () => {
  emit('update:modelValue', false);
  // 重置状态
  form.value = { userName: '', mobile: '', code: '', pwd: '' };
  countdown.value = 0;
  isVerified.value = false;
  agreeProtocol.value = true;
  loginType.value = 'code';
  loginMode.value = 'sms';
};

// 清理定时器
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
/* 基础动画（原页面保留） */
.animate-in {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 淡入 */
.fade-in {
  animation-name: fadeIn;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 缩放进入 */
.zoom-in {
  animation-name: zoomIn;
}
@keyframes zoomIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* 从右侧滑入 */
.slide-in-from-right-4 {
  animation-name: slideInRight;
}
/* 从左侧滑入 */
.slide-in-from-left-4 {
  animation-name: slideInLeft;
}
@keyframes slideInRight {
  from { transform: translateX(16px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes slideInLeft {
  from { transform: translateX(-16px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* 加载旋转 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* 清除自动填充背景 */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #f9fafb inset !important;
}

/* Toast 动画 */
.animate-fade-up {
  animation: fadeUp 0.3s ease forwards;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
</style>