<template>
  <div class="min-h-screen bg-[#F8FAFC] pb-20 overflow-x-hidden selection:bg-indigo-100">
    
    <!-- 顶部沉浸式背景 -->
    <div class="relative h-80 w-full bg-slate-900 overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-40 scale-110 blur-sm"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8FAFC]"></div>
      
      <!-- ========== 新增：返回主页按钮 ========== -->
      <div class="absolute top-6 left-6 z-20">
        <button 
          @click="$router.push('/')"
          class="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-slate-700 font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-slate-200/30"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回主页
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 -mt-40 relative z-10">
      
      <!-- 第一行：身份核心卡片 (Bento 大块) -->
      <div class="grid grid-cols-12 gap-6 mb-6">
        
        <!-- 用户主信息卡片 (仅替换头像框) -->
        <div class="col-span-12 lg:col-span-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white flex flex-col md:flex-row items-center gap-8">
          <!-- 导航栏同款头像框 (金色系 + 等比例放大) -->
          <div class="relative group cursor-pointer">
             <div class="relative w-32 h-32 flex items-center justify-center">
                <!-- 1. 背景光晕 (保留金色) -->
                <div class="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <!-- 2. 金属拉丝外环 (导航栏同款金色渐变) -->
                <div class="absolute inset-0 rounded-full p-[6px] z-10 bg-[conic-gradient(from_0deg,#B45309,#FDE68A,#B45309,#78350F,#FDE68A,#B45309)] shadow-[0_0_20px_rgba(217,119,6,0.3)] animate-slow-spin">
                  <div class="w-full h-full rounded-full bg-white p-[2px]">
                     <div class="w-full h-full rounded-full bg-slate-50"></div>
                  </div>
                </div>

                <!-- 3. 头像主体 -->
                <div class="relative z-20 w-28 h-28 rounded-full overflow-hidden border border-amber-200/50">
                  <el-avatar 
                    :src="userInfo.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'"
                    class="!w-full !h-full"
                  />
                  <!-- 扫光层 -->
                  <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full animate-shine pointer-events-none"></div>
                  <!-- 更换头像提示 -->
                  <div class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">更换头像</div>
                </div>

                <!-- 4. 皇冠等级标 (等比例放大) -->
                <div class="absolute -top-2 z-30 filter drop-shadow-md animate-bounce-subtle">
                  <svg class="w-10 h-10 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z" />
                  </svg>
                </div>

                <!-- 5. V1 标识 (等比例放大) -->
                <div class="absolute -bottom-2 z-30 px-3 py-1 rounded-md bg-gradient-to-b from-amber-300 to-amber-700 border border-amber-200 shadow-lg">
                  <span class="text-[12px] font-black text-white leading-none italic">VIP 1</span>
                </div>
             </div>
          </div>

          <div class="flex-1 text-center md:text-left">
            <div class="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h2 class="text-3xl font-black text-slate-900 tracking-tighter">{{ userInfo.nickname || '至尊商户' }}</h2>
              <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">Pro Member</span>
            </div>
            <p class="text-slate-500 font-medium mb-6">探索无边边界，成就卓越贸易</p>
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <div class="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                <p class="text-[10px] text-slate-400 font-bold uppercase">账户余额</p>
                <p class="text-lg font-black text-slate-900">¥ 12,840.00</p>
              </div>
              <div class="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                <p class="text-[10px] text-slate-400 font-bold uppercase">信用分</p>
                <p class="text-lg font-black text-green-600">98 <span class="text-xs text-slate-400">/ 100</span></p>
              </div>
            </div>
          </div>
        </div>

        <!-- 安全等级卡片 (保持原样) -->
        <div class="col-span-12 lg:col-span-4 bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
          <div class="relative z-10">
            <h3 class="text-xl font-bold mb-2">账户安全等级</h3>
            <p class="text-indigo-100 text-sm mb-8">您的账户安全状况良好，建议定期更换密码。</p>
            <div class="flex items-end gap-2 mb-2">
              <span class="text-5xl font-black">高</span>
              <span class="text-indigo-200 text-sm pb-1">Security Level</span>
            </div>
            <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div class="w-[85%] h-full bg-white animate-pulse"></div>
            </div>
          </div>
          <!-- 装饰图标 -->
          <ShieldCheckIcon class="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>
      </div>

      <!-- 第二行：详细信息与设置 (保持原样) -->
      <div class="grid grid-cols-12 gap-6">
        
        <!-- 基本信息编辑 (左侧大块) -->
        <div class="col-span-12 lg:col-span-8 space-y-6">
          <div class="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between mb-10">
              <div>
                <h3 class="text-2xl font-black text-slate-900 tracking-tight">基本资料</h3>
                <p class="text-slate-400 text-sm">管理您的公开展示信息与联系方式</p>
              </div>
              <button @click="isEditing = !isEditing" 
                class="px-6 py-2.5 rounded-xl font-bold transition-all"
                :class="isEditing ? 'bg-slate-100 text-slate-600' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'">
                {{ isEditing ? '取消编辑' : '编辑资料' }}
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
              <div v-for="(val, key) in profileFields" :key="key" class="space-y-2">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{{ key }}</label>
                <div v-if="!isEditing" class="px-5 py-4 bg-slate-50 rounded-2xl text-slate-700 font-bold border border-transparent">
                  {{ val || '未填写' }}
                </div>
                <input v-else v-model="form[key]" 
                  class="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-bold"
                />
              </div>
            </div>

            <div v-if="isEditing" class="mt-10 flex justify-end">
              <button class="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                保存更改
              </button>
            </div>
          </div>

          <!-- 快捷操作 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button v-for="action in quickActions" :key="action.name" 
              class="p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group text-center">
              <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <component :is="action.icon" class="w-6 h-6" />
              </div>
              <span class="text-sm font-bold text-slate-600 group-hover:text-slate-900">{{ action.name }}</span>
            </button>
          </div>
        </div>

        <!-- 右侧侧边栏：商户状态 & 动态 -->
        <div class="col-span-12 lg:col-span-4 space-y-6">
          <!-- 商户状态卡片 -->
          <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
            <h3 class="text-xl font-black mb-6">商户权益</h3>
            <div class="space-y-4">
              <div v-for="benefit in benefits" :key="benefit.name" class="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-500 shadow-sm">
                  <CheckIcon class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">{{ benefit.name }}</p>
                  <p class="text-[10px] text-slate-400 font-medium">{{ benefit.desc }}</p>
                </div>
              </div>
            </div>
            <button class="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-colors">
              升级会员等级
            </button>
          </div>

          <!-- 最近活动 -->
          <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <h3 class="text-xl font-black mb-6">最近活动</h3>
            <div class="space-y-6">
              <div v-for="i in 3" :key="i" class="flex gap-4 relative">
                <div v-if="i !== 3" class="absolute left-[11px] top-8 w-[2px] h-10 bg-slate-100"></div>
                <div class="w-6 h-6 rounded-full bg-indigo-100 border-4 border-white shadow-sm z-10"></div>
                <div>
                  <p class="text-sm font-bold text-slate-800">成功登录系统</p>
                  <p class="text-[10px] text-slate-400 font-medium">2024-05-20 14:20:05</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Logo from '../component/Logo.vue';
import { 
  ShieldCheck as ShieldCheckIcon, 
  Check as CheckIcon,
  Lock as LockIcon,
  Bell as BellIcon,
  CreditCard as CreditCardIcon,
  Smartphone as SmartphoneIcon,
  Mail as MailIcon,
  User as UserIcon
} from 'lucide-vue-next';

const isEditing = ref(false);

const userInfo = reactive({
  nickname: '至尊商户 · 凌云',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
});

const profileFields = {
  '用户名': 'Boundless_User_01',
  '电子邮箱': 'service@boundless.com',
  '联系电话': '+86 138 **** 8888',
  '所属行业': '跨境电商 / 数码 3C',
};

const form = reactive({ ...profileFields });

const quickActions = [
  { name: '修改密码', icon: LockIcon },
  { name: '消息通知', icon: BellIcon },
  { name: '支付管理', icon: CreditCardIcon },
  { name: '实名认证', icon: UserIcon },
];

const benefits = [
  { name: 'T+0 极速结算', desc: '资金秒级到账，无需等待' },
  { name: '专属客户经理', desc: '一对一 7x24h 深度支持' },
  { name: '营销工具全开', desc: '解锁所有高级营销插件' },
];
</script>

<style scoped>
/* 隐藏滚动条 */
::-webkit-scrollbar { width: 0px; }

/* 原有脉冲动画 */
@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}
.animate-pulse {
  animation: pulse 4s ease-in-out infinite;
}

/* 头像框动效 (和导航栏保持一致) */
@keyframes slowSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-slow-spin {
  animation: slowSpin 8s linear infinite;
  background-size: 300% 300%;
}

@keyframes shine {
  to { transform: translateX(100%); }
}
.animate-shine {
  animation: shine 3s linear infinite;
}

@keyframes bounceSubtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
.animate-bounce-subtle {
  animation: bounceSubtle 3s ease-in-out infinite;
}

/* 头像样式修复 */
:deep(.el-avatar) {
  background: #fff;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>