<template>
  <div class="min-h-screen bg-[#FCFCFD] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">
    
    <!-- 顶部进度条 -->
    <div class="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 z-[100] transition-all duration-300" :style="{ width: scrollProgress + '%' }"></div>

    <!-- 动态背景：全息光影 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-50/50 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[5%] right-[-5%] w-[40%] h-[40%] bg-amber-50/40 rounded-full blur-[100px]"></div>
    </div>

   
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

    <!-- Hero Section: 沉浸式搜索 -->
    <section class="relative pt-44 pb-20 px-8 z-10">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6 animate-fade-in">
          Help Center 3.0
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight animate-fade-in">
          有什么可以<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">帮到您的？</span>
        </h1>
        
        <!-- 现代搜索框：带快捷键提示 -->
        <div class="relative max-w-2xl mx-auto group animate-fade-in" style="animation-delay: 0.2s">
          <div class="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <div class="relative flex items-center">
            <SearchIcon class="absolute left-6 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索文档、教程或 API..." 
              class="w-full bg-white border border-slate-200 rounded-2xl px-14 py-5 text-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
            <div class="absolute right-4 flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-md border border-slate-200 text-[10px] font-bold text-slate-400">
              <span class="text-xs">⌘</span> K
            </div>
          </div>
          <!-- 热门搜索 -->
          <div class="flex gap-4 mt-4 justify-center">
            <span class="text-xs font-bold text-slate-400">热门搜索:</span>
            <a v-for="tag in ['结算周期', 'API接入', '资质审核']" :key="tag" href="#" class="text-xs font-bold text-indigo-600/70 hover:text-indigo-600 transition-colors">{{ tag }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid: 核心分类布局 -->
    <section class="max-w-7xl mx-auto px-8 pb-32 z-10 relative">
      <div class="grid grid-cols-12 gap-6">
        
        <!-- 大卡片：入驻指南 -->
        <div class="col-span-12 md:col-span-8 group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden">
          <div class="relative z-10">
            <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
              <RocketIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-3xl font-black mb-4">快速入驻指南</h3>
            <p class="text-slate-500 max-w-md mb-8 font-medium">从零开始，仅需三步即可完成您的全球商铺配置，开启数字化贸易之旅。</p>
            <div class="grid grid-cols-2 gap-4">
              <a v-for="i in ['资质准备', '店铺装修', '商品上架', '开业检查']" :key="i" href="#" class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors group/item">
                <span class="font-bold text-sm text-slate-700">{{ i }}</span>
                <ArrowRightIcon class="w-4 h-4 text-slate-300 group-hover/item:text-indigo-600 group-hover/item:translate-x-1 transition-all" />
              </a>
            </div>
          </div>
          <!-- 背景装饰 -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        </div>

        <!-- 小卡片：技术文档 -->
        <div class="col-span-12 md:col-span-4 group p-10 rounded-[2.5rem] bg-slate-900 text-white hover:shadow-2xl hover:shadow-slate-900/20 transition-all duration-500 relative overflow-hidden">
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                <CodeIcon class="w-6 h-6 text-indigo-400" />
              </div>
              <h3 class="text-2xl font-black mb-2">开发者中心</h3>
              <p class="text-slate-400 text-sm font-medium">强大的 API 与 SDK 支持，实现无缝系统集成。</p>
            </div>
            <button class="mt-8 w-full py-4 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500 transition-colors">查看文档</button>
          </div>
          <!-- 动态流光 -->
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- 中卡片：支付结算 -->
        <div class="col-span-12 md:col-span-4 group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-2xl transition-all duration-500">
          <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
            <WalletIcon class="w-6 h-6 text-amber-600" />
          </div>
          <h3 class="text-xl font-black mb-4">支付与结算</h3>
          <ul class="space-y-4">
            <li v-for="item in ['结算周期说明', '费率标准', '提现流程']" :key="item">
              <a href="#" class="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div> {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <!-- 中卡片：安全中心 -->
        <div class="col-span-12 md:col-span-4 group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-2xl transition-all duration-500">
          <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
            <ShieldCheckIcon class="w-6 h-6 text-green-600" />
          </div>
          <h3 class="text-xl font-black mb-4">安全与合规</h3>
          <ul class="space-y-4">
            <li v-for="item in ['账号安全设置', '合规经营准则', '风控申诉']" :key="item">
              <a href="#" class="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div> {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <!-- 中卡片：营销工具 -->
        <div class="col-span-12 md:col-span-4 group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-2xl transition-all duration-500">
          <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
            <ZapIcon class="w-6 h-6 text-purple-600" />
          </div>
          <h3 class="text-xl font-black mb-4">增长与营销</h3>
          <ul class="space-y-4">
            <li v-for="item in ['优惠券配置', '会员体系搭建', '流量推广']" :key="item">
              <a href="#" class="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div> {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ Section: 侧边栏联动布局 -->
    <section class="bg-slate-50/50 py-32 px-8">
      <div class="max-w-7xl mx-auto grid md:grid-cols-12 gap-16">
        <div class="md:col-span-4">
          <h2 class="text-4xl font-black tracking-tighter mb-6">常见问题</h2>
          <p class="text-slate-500 font-medium mb-8">如果您没能找到答案，可以随时联系我们的在线专家。</p>
          <button class="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center gap-3">
            <MessageSquareIcon class="w-5 h-5 text-indigo-600" />
            联系在线客服
          </button>
        </div>
        <div class="md:col-span-8 space-y-4">
          <div v-for="(faq, idx) in faqs" :key="idx" 
            class="bg-white rounded-[2rem] border border-slate-100 overflow-hidden transition-all duration-500"
            :class="activeFAQ === idx ? 'shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/10' : ''">
            <button @click="activeFAQ = activeFAQ === idx ? -1 : idx" 
              class="w-full px-8 py-6 flex justify-between items-center text-left">
              <span class="font-bold text-slate-800">{{ faq.q }}</span>
              <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-500" :class="activeFAQ === idx ? 'rotate-180 bg-indigo-50' : ''">
                <ChevronDownIcon class="w-4 h-4 text-slate-400" :class="activeFAQ === idx ? 'text-indigo-600' : ''" />
              </div>
            </button>
            <div v-show="activeFAQ === idx" class="px-8 pb-8 text-slate-500 font-medium leading-relaxed animate-slide-down">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚：极简设计 -->
    <footer class="py-20 px-8 bg-white border-t border-slate-100">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <GlobeIcon class="w-4 h-4 text-slate-400" />
          </div>
          <span class="font-black tracking-tighter uppercase text-slate-900">Boundless</span>
        </div>
        <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 All Rights Reserved</p>
        <div class="flex gap-8">
          <a href="#" class="text-slate-400 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-widest">Privacy</a>
          <a href="#" class="text-slate-400 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-widest">Terms</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Logo from '../component/Logo.vue';


const scrollProgress = ref(0);
const activeFAQ = ref(0);

const faqs = [
  { q: '入驻无边商城需要哪些核心资质？', a: '企业商户需提供有效期内的营业执照、法人身份证件以及对公账户证明。针对特定行业（如食品、医疗），还需上传相应的行业许可证。' },
  { q: '结算周期是如何计算的？', a: '标准结算周期为 T+1（交易完成后的次个工作日）。VIP 1 及以上等级商户可申请 T+0 实时结算服务，资金秒级到账。' },
  { q: '平台佣金比例是多少？', a: '我们采取透明阶梯费率，基础类目佣金为 0.5% - 2%。新入驻商户可享受前 3 个月免佣金政策。' },
  { q: '如何集成 API 接口？', a: '您可以前往开发者中心下载最新的 SDK。我们支持 Webhook 回调和 RESTful API，提供详尽的 Postman 测试集。' }
];

const handleScroll = () => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = (window.scrollY / totalHeight) * 100;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-down {
  animation: slideDown 0.4s ease-out forwards;
}

/* 隐藏滚动条 */
::-webkit-scrollbar { width: 0px; }

/* 响应式调整 */
@media (max-width: 768px) {
  .text-7xl { font-size: 3.5rem; }
}
</style>