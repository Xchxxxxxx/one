<template>
  <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">
    <!-- 进度条 - 和主页一致 -->
    <div class="fixed top-0 left-0 h-1 bg-indigo-600 z-[60] transition-all duration-300" :style="{ width: scrollProgress + '%' }"></div>

    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-blue-100 rounded-full blur-[100px]"></div>
    </div>

    <!-- 顶部导航（匹配首页风格） -->
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
    <!-- Hero Section - 延续主页视觉风格 -->
    <section class="relative min-h-[70vh] flex items-center pt-32 px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-8 animate-fade-in-left">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          为不同行业定制专属解决方案
        </div>
        <h1 class="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.85] text-slate-900 animate-fade-in-left">
          数字化增长<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">解决方案</span>
        </h1>
        <p class="text-lg text-slate-500 mb-10 max-w-2xl font-medium leading-relaxed animate-fade-in-left" style="animation-delay: 0.2s">
          针对跨境电商、本地零售、品牌商家、小微商户等不同场景，提供全链路数字化工具，助您突破业务增长边界。
        </p>
      </div>
    </section>

    <!-- 行业筛选 - 适配主页样式 -->
    <section class="py-16 px-8 border-y border-slate-100">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap justify-center gap-4 mb-16">
          <button 
            v-for="tag in tags" 
            :key="tag.key"
            @click="activeTag = tag.key"
            :class="[
              'px-8 py-3 rounded-full text-sm font-bold transition-all transform hover:scale-105',
              activeTag === tag.key 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            ]"
          >
            {{ tag.name }}
          </button>
        </div>

        <!-- 解决方案卡片 - 复用主页卡片样式逻辑 -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-show="activeTag === 'all' || activeTag === item.tag"
            v-for="(item, index) in solutions" 
            :key="index"
            class="group relative p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.1)] transition-all duration-500 overflow-hidden"
          >
            <div class="absolute top-0 left-0 w-2 h-0 bg-indigo-600 group-hover:h-full transition-all duration-500"></div>
            <div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:rotate-6 transition-all duration-500">
              <component :is="item.icon" class="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h3 class="text-2xl font-bold mb-4">{{ item.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">{{ item.desc }}</p>
            
            <!-- 核心优势标签 - 适配主页风格 -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span v-for="tag in item.tags" :key="tag" class="px-3 py-1 bg-indigo-50 rounded-lg text-xs text-indigo-600 font-bold">
                {{ tag }}
              </span>
            </div>

            <!-- 查看详情按钮 - 复用主页按钮样式 -->
            <router-link 
              :to="item.path" 
              class="inline-flex items-center gap-2 text-indigo-600 font-bold group-hover:text-indigo-700 transition-colors"
            >
              查看详情
              <ArrowRightIcon class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心优势 - 延续主页交互式卡片风格 -->
    <section class="py-32 px-8 bg-slate-50/30">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-black mb-4">为什么选择我们的解决方案</h2>
          <p class="text-slate-500">不止于工具，更是全链路的增长赋能</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(advantage, index) in advantages" :key="index" 
            class="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.1)] transition-all duration-500 overflow-hidden">
            <div class="absolute top-0 left-0 w-2 h-0 bg-indigo-600 group-hover:h-full transition-all duration-500"></div>
            <div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:rotate-6 transition-all duration-500">
              <component :is="advantage.icon" class="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h3 class="text-2xl font-bold mb-4">{{ advantage.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ advantage.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 转化区 - 复用主页深色卡片风格 -->
    <section class="py-32 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 px-8 overflow-hidden relative mb-20">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4F46E5,transparent)]"></div>
      </div>
      <div class="max-w-7xl mx-auto relative z-10 text-center">
        <h2 class="text-4xl md:text-5xl font-black mb-8 leading-tight">定制专属解决方案</h2>
        <p class="text-slate-400 max-w-2xl mx-auto mb-12">
          根据您的行业特点、商户规模和增长目标，一对一定制数字化解决方案，助力业务快速增长
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <button class="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-200 flex items-center gap-2 group">
            立即免费咨询
            <ArrowRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button class="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all">
            预约方案演示
          </button>
        </div>
      </div>
    </section>

    <!-- 页脚 - 完全复用主页页脚 -->
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
    </footer>

    <Login v-model="userStore.showLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import Logo from '../component/Logo.vue';
import { 
  Globe as GlobeIcon, 
  ArrowRight as ArrowRightIcon,
  Globe as GlobeAltIcon,
  Store as StoreIcon,
  Award as AwardIcon,
  User as UserIcon,
  Coffee as CoffeeIcon,
  Hotel as HotelIcon,
  CheckCircle2 as CheckCircle2Icon,
  Zap as ZapIcon,
  ShieldCheck as ShieldCheckIcon,
  Component
} from 'lucide-vue-next';

const userStore = useUserStore();

// 复用主页滚动逻辑
const isScrolled = ref(false);
const scrollProgress = ref(0);

// 导航菜单 - 和主页一致
const menuItems = [
  { name: '首页', path: '/' },
  { name: '解决方案', path: '/solutions' },
  { name: '商户入驻', path: '/merchant' },
  { name: '帮助中心', path: '/help' }
];

// 筛选标签
const activeTag = ref('all');
const tags = [
  { key: 'all', name: '全部方案' },
  { key: 'cross', name: '跨境电商' },
  { key: 'retail', name: '本地零售' },
  { key: 'brand', name: '品牌商家' },
  { key: 'small', name: '小微商户' },
  { key: 'food', name: '餐饮行业' },
  { key: 'hotel', name: '酒店民宿' }
];

// 解决方案列表
const solutions = [
  {
    title: '跨境电商解决方案',
    desc: '一站式跨境电商服务，覆盖选品、支付、物流、清关全流程，支持多语言、多币种，轻松开拓全球市场。',
    tag: 'cross',
    tags: ['多币种结算', '全球物流', '智能清关'],
    icon: GlobeAltIcon,
    path: '/solutions/cross-border'
  },
  {
    title: '本地零售解决方案',
    desc: '线上线下一体化运营，打通门店、小程序、APP数据，实现会员、库存、营销统一管理。',
    tag: 'retail',
    tags: ['门店数字化', '会员管理', '库存同步'],
    icon: StoreIcon,
    path: '/solutions/local-retail'
  },
  {
    title: '品牌商家解决方案',
    desc: '全渠道品牌运营，私域流量搭建，会员体系设计，精准营销触达，提升品牌复购率。',
    tag: 'brand',
    tags: ['私域运营', '精准营销', '品牌升级'],
    icon: AwardIcon,
    path: '/solutions/brand-merchant'
  },
  {
    title: '小微商户解决方案',
    desc: '轻量化运营工具，0成本搭建线上店铺，一键生成营销素材，快速获取本地客源。',
    tag: 'small',
    tags: ['0成本开店', '营销素材', '本地获客'],
    icon: UserIcon,
    path: '/solutions/small-merchant'
  },
  {
    title: '餐饮行业解决方案',
    desc: '扫码点单、外卖接单、会员储值、营销活动一站式管理，提升翻台率和客单价。',
    tag: 'food',
    tags: ['扫码点单', '外卖管理', '会员储值'],
    icon: CoffeeIcon,
    path: '/solutions/food-drink'
  },
  {
    title: '酒店民宿解决方案',
    desc: '在线预订、房态管理、智能入住、会员体系，降低运营成本，提升入住体验。',
    tag: 'hotel',
    tags: ['在线预订', '房态管理', '智能入住'],
    icon: HotelIcon,
    path: '/solutions/hotel'
  }
];

// 核心优势
const advantages = [
  {
    title: '全链路解决方案',
    desc: '从开店到运营，从获客到转化，提供完整闭环服务，无需对接多个服务商，降低管理成本。',
    icon: CheckCircle2Icon
  },
  {
    title: '极速部署上线',
    desc: '轻量化配置，无需复杂开发，最快1天完成部署，即刻开启数字化运营。',
    icon: ZapIcon
  },
  {
    title: '安全稳定保障',
    desc: '银行级数据加密，7×24小时技术监控，保障交易安全和系统稳定运行。',
    icon: ShieldCheckIcon
  }
];

// 复用主页滚动处理逻辑
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = (window.scrollY / totalHeight) * 100;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
/* 复用主页所有动画样式 */
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-left {
  animation: fadeInLeft 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

/* 隐藏滚动条 - 和主页一致 */
::-webkit-scrollbar {
  width: 0px;
}

</style>