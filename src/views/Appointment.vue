<template>
  <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">
    <!-- 进度条 - 完全复用 -->
    <div class="fixed top-0 left-0 h-1 bg-indigo-600 z-[60] transition-all duration-300" :style="{ width: scrollProgress + '%' }"></div>

    <!-- 背景装饰 - 完全复用 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-blue-100 rounded-full blur-[100px]"></div>
    </div>

    <!-- 极简顶部导航 - 只保留Logo和返回首页 -->
    <nav class="relative z-20 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
      <div class="flex items-center gap-3 group cursor-pointer">
        <div class="flex items-center gap-3 group cursor-pointer">
      
        <Logo />
      <h1 class="text-lg font-black tracking-tighter text-slate-900 uppercase">Boundless <span class="text-indigo-600">Mall</span></h1>
    </div>
      </div>
      <router-link to="/" class="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors relative group">
        返回首页
        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
      </router-link>
    </nav>

    <!-- Hero Section - 延续同款视觉风格 -->
    <section class="relative min-h-[60vh] flex items-center pt-20 px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-8 animate-fade-in-left">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          一对一专属演示 · 定制化解决方案
        </div>
        <h1 class="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.85] text-slate-900 animate-fade-in-left">
          预约<span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">产品演示</span>
        </h1>
        <p class="text-lg text-slate-500 mb-10 max-w-2xl font-medium leading-relaxed animate-fade-in-left" style="animation-delay: 0.2s">
          专业顾问一对一演示系统全功能，根据您的行业和业务需求定制解决方案，解答您的所有疑问。
        </p>
      </div>
    </section>

    <!-- 预约表单区域 - 适配页面风格 -->
    <section class="py-16 px-8 border-y border-slate-100">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-5 gap-12">
          <!-- 左侧表单 (3/5) -->
          <div class="lg:col-span-3 bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <h2 class="text-2xl font-bold mb-8">填写预约信息</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- 基础信息 -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-bold text-slate-700">联系人姓名</label>
                  <input 
                    v-model="form.name"
                    type="text"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-bold text-slate-700">联系电话</label>
                  <input 
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
                    placeholder="请输入您的手机号"
                    required
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">电子邮箱</label>
                <input 
                  v-model="form.email"
                  type="email"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
                  placeholder="请输入您的常用邮箱"
                  required
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">公司/商户名称</label>
                <input 
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
                  placeholder="请输入公司或店铺名称"
                  required
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">所属行业</label>
                <select 
                  v-model="form.industry"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
                  required
                >
                  <option value="">请选择您的行业</option>
                  <option value="跨境电商">跨境电商</option>
                  <option value="本地零售">本地零售</option>
                  <option value="品牌商家">品牌商家</option>
                  <option value="小微商户">小微商户</option>
                  <option value="餐饮行业">餐饮行业</option>
                  <option value="酒店民宿">酒店民宿</option>
                  <option value="其他">其他行业</option>
                </select>
              </div>

              <!-- 时间选择 -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-bold text-slate-700">期望演示日期</label>
                  <input 
                    v-model="form.date"
                    type="date"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-bold text-slate-700">期望演示时段</label>
                  <select 
                    v-model="form.timeSlot"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">请选择时段</option>
                    <option value="09:00-11:00">09:00-11:00</option>
                    <option value="14:00-16:00">14:00-16:00</option>
                    <option value="16:00-18:00">16:00-18:00</option>
                    <option value="19:00-21:00">19:00-21:00</option>
                  </select>
                </div>
              </div>

              <!-- 需求说明 -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">演示需求说明</label>
                <textarea 
                  v-model="form.demand"
                  rows="4"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                  placeholder="请说明您希望了解的功能、问题或其他需求"
                ></textarea>
              </div>

              <!-- 提交按钮 -->
              <button 
                type="submit"
                :disabled="submitting"
                class="w-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                <span v-if="!submitting">提交预约申请</span>
                <span v-else>提交中...</span>
                <ArrowRightIcon v-if="!submitting" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <!-- 右侧演示说明 (2/5) -->
          <div class="lg:col-span-2 space-y-8">
            <!-- 演示内容卡片 -->
            <div class="group relative p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.1)] transition-all duration-500 overflow-hidden">
              <div class="absolute top-0 left-0 w-2 h-0 bg-indigo-600 group-hover:h-full transition-all duration-500"></div>
              <h3 class="text-2xl font-bold mb-6">演示内容</h3>
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0 mt-1">
                    <MonitorIcon class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">系统全功能演示</p>
                    <p class="text-xs text-slate-500">商品、订单、支付、结算、权限管理</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0 mt-1">
                    <CpuIcon class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">AI智能运营</p>
                    <p class="text-xs text-slate-500">大数据分析、自动化订单处理</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0 mt-1">
                    <AwardIcon class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">商户专属权益</p>
                    <p class="text-xs text-slate-500">极速结算、专属客服、费率优惠</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 演示优势卡片 -->
            <div class="p-8 rounded-[2rem] bg-indigo-600 text-white">
              <h3 class="text-2xl font-bold mb-6">预约演示优势</h3>
              <ul class="space-y-3 text-indigo-100 text-sm">
                <li class="flex items-center gap-2">
                  <CheckIcon class="w-4 h-4 text-white" />
                  一对一专业顾问讲解
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="w-4 h-4 text-white" />
                  按需定制演示内容
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="w-4 h-4 text-white" />
                  远程在线，无需到场
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="w-4 h-4 text-white" />
                  演示后赠送专属资料
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 转化区 - 复用同款深色卡片 -->
    <section class="py-32 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 px-8 overflow-hidden relative mb-20">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4F46E5,transparent)]"></div>
      </div>
      <div class="max-w-7xl mx-auto relative z-10 text-center">
        <h2 class="text-4xl md:text-5xl font-black mb-8 leading-tight">还有其他疑问？</h2>
        <p class="text-slate-400 max-w-2xl mx-auto mb-12">
          我们的专业顾问随时为您解答，无论您是想了解系统功能、费用明细还是入驻流程
        </p>
        <button class="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-200 flex items-center justify-center gap-2 mx-auto">
          立即在线咨询
          <MessageSquareIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>

    <!-- 页脚 - 完全复用 -->
    <footer class="py-20 px-8">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-slate-100 pt-12">
        <div class="flex items-center gap-3 mb-4 md:mb-0">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <GlobeIcon class="w-4 h-4 text-white" />
          </div>
          <span class="font-black tracking-tighter uppercase">Boundless</span>
        </div>
        <div class="flex gap-8 text-sm font-bold text-slate-400">
          <a href="#" class="hover:text-indigo-600 transition-colors">Twitter</a>
          <a href="#" class="hover:text-indigo-600 transition-colors">LinkedIn</a>
          <a href="#" class="hover:text-indigo-600 transition-colors">WeChat</a>
        </div>
      </div>
      <div class="max-w-7xl mx-auto mt-8 text-center text-sm text-slate-400">
        © {{ new Date().getFullYear() }} Boundless Mall. 保留所有权利
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '../component/Logo.vue';
import { ElMessage } from 'element-plus';
import { 
  Globe as GlobeIcon, 
  ArrowRight as ArrowRightIcon,
  Monitor as MonitorIcon,
  Cpu as CpuIcon,
  Award as AwardIcon,
  Check as CheckIcon,
  MessageSquare as MessageSquareIcon
} from 'lucide-vue-next';

const router = useRouter();

// 滚动逻辑 - 完全复用
const isScrolled = ref(false);
const scrollProgress = ref(0);
const submitting = ref(false);

// 表单数据
const form = ref({
  name: '',
  phone: '',
  email: '',
  company: '',
  industry: '',
  date: '',
  timeSlot: '',
  demand: ''
});

// 提交处理
const handleSubmit = async () => {
  submitting.value = true;
  
  // 模拟接口请求
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    ElMessage.success('预约申请提交成功！我们将尽快与您联系');
    form.value = {
      name: '',
      phone: '',
      email: '',
      company: '',
      industry: '',
      date: '',
      timeSlot: '',
      demand: ''
    };
  } catch (error) {
    ElMessage.error('提交失败，请稍后重试');
  } finally {
    submitting.value = false;
  }
};

// 滚动处理 - 完全复用
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = (window.scrollY / totalHeight) * 100;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
/* 复用所有动画样式 */
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-left {
  animation: fadeInLeft 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

@keyframes ping {
  0% { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2); opacity: 0; }
}
.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0px;
}
</style>