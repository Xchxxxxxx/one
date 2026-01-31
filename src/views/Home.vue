<template>
  <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">
    
    <!-- 进度条 -->
    <div class="fixed top-0 left-0 h-1 bg-indigo-600 z-[60] transition-all duration-300" :style="{ width: scrollProgress + '%' }"></div>

 <nav :class="['fixed top-0 w-full z-50 transition-all duration-500 px-8', isScrolled ? 'py-2 bg-white/80 backdrop-blur-lg border-b border-slate-100' : 'py-4 bg-transparent']">
  <div class="max-w-7xl mx-auto flex justify-between items-center">
    <!-- Logo区域 - 同步缩小 -->
    <div class="flex items-center gap-3 group cursor-pointer">
      
        <Logo />
      <h1 class="text-lg font-black tracking-tighter text-slate-900 uppercase">Boundless <span class="text-indigo-600">Mall</span></h1>
    </div>
    
    <div class="hidden md:flex gap-8 items-center">
      <router-link v-for="item in menuItems" :key="item.name" :to="item.path" 
        class="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors relative group">
        {{ item.name }}
        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
      </router-link>
      
      <!-- 语言切换下拉 -->
      <div class="relative group">
        <button class="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
          <span>{{ currentLang === 'zh' ? '简体中文' : 'English' }}</span>
          <ChevronDownIcon class="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
        </button>
        <div class="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
          <button @click="switchLang('zh')" class="w-full text-left px-4 py-2 text-sm font-medium hover:bg-indigo-50 transition-colors">
            简体中文
          </button>
          <button @click="switchLang('en')" class="w-full text-left px-4 py-2 text-sm font-medium hover:bg-indigo-50 transition-colors">
            English
          </button>
        </div>
      </div>
      
      <!-- 会员套餐按钮 - 同步缩小内边距 -->
      <button 
        @click="memberModal.openModal" 
        class="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-200 flex items-center gap-1.5 relative overflow-hidden">
        <!-- 自动循环反光折射光效层 -->
        <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent rotate-[-45deg] translate-x-[-150%] animate-light-reflection"></span>
        <CrownIcon class="w-4 h-4 relative z-10 text-white" />
        <span class="relative z-10 text-white font-bold">{{ $t('memberPackage') }}</span>
      </button>
      
      <!-- 未登录：显示「开始使用」按钮 - 同步缩小 -->
      <el-button 
        v-if="!userStore.isLogin()" 
        @click="userStore.showLogin = true"
        type="primary"
        size="default"
        class="!px-5 !py-1.5 !bg-slate-900 !hover:bg-indigo-600 !text-white !rounded-full !text-sm !font-bold !transition-all !transform !hover:scale-105 !active:scale-95 !shadow-xl !shadow-slate-200 !border-0">
        {{ $t('startUsing') }}
      </el-button>
      
      <!-- 已登录：Element Plus 下拉菜单 + 缩小版金色会员头像 -->
      <el-dropdown 
        v-else
        trigger="click"
        @command="handleDropdownCommand"
        class="user-dropdown">
        <template #dropdown>
          <el-dropdown-menu class="!w-48 !rounded-xl !shadow-xl !border !border-slate-100 !py-2">
            <el-dropdown-item command="user-center" class="!flex !items-center !gap-2 !px-4 !py-2.5 !text-sm">
              <el-icon class="!w-4 !h-4"><User /></el-icon>
              <span>{{ $t('userCenter') }}</span>
            </el-dropdown-item>
            <el-dropdown-item command="merchant-dashboard" class="!flex !items-center !gap-2 !px-4 !py-2.5 !text-sm">
              <el-icon class="!w-4 !h-4"><Shop /></el-icon>
              <span>{{ $t('merchantDashboard') }}</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided class="!flex !items-center !gap-2 !px-4 !py-2.5 !text-sm !text-red-600">
              <el-icon class="!w-4 !h-4"><SwitchButton /></el-icon>
              <span>{{ $t('logout') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
        
       <span class="el-dropdown-link flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-indigo-50/50 transition-all duration-500 group cursor-pointer relative">
  
  <div class="relative w-11 h-11 flex items-center justify-center">
    <!-- 1. 背景光晕 - 同步缩小 -->
    <div class="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

    <!-- 3. 金属拉丝外环 - 同步缩小 -->
    <div class="absolute inset-0 rounded-full p-[2px] z-10 bg-[conic-gradient(from_0deg,#B45309,#FDE68A,#B45309,#78350F,#FDE68A,#B45309)] shadow-[0_0_15px_rgba(217,119,6,0.3)] animate-slow-spin">
      <div class="w-full h-full rounded-full bg-white p-[1px]">
         <div class="w-full h-full rounded-full bg-slate-50"></div>
      </div>
    </div>

    <!-- 4. 头像主体 - 同步缩小 (原11→9) -->
    <div class="relative z-20 w-9 h-9 rounded-full overflow-hidden border border-amber-200/50">
      <el-avatar 
        :src="userStore.userInfo.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'"
        class="!w-full !h-full"
      />
      <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full animate-shine pointer-events-none"></div>
    </div>

    <!-- 5. 皇冠等级标 - 同步缩小 (原6→5) -->
    <div class="absolute -top-1 z-30 filter drop-shadow-md animate-bounce-subtle">
      <svg class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z" />
      </svg>
    </div>

    <!-- 6. V1 标识 - 同步缩小 -->
    <div class="absolute -bottom-1 z-30 px-1.5 py-0.25 rounded-md bg-gradient-to-b from-amber-300 to-amber-700 border border-amber-200 shadow-lg">
      <span class="text-[9px] font-black text-white leading-none italic">VIP 1</span>
    </div>
  </div>

  <!-- 用户信息 - 字体同步缩小 -->
  <div class="flex flex-col">
    <div class="flex items-center gap-1">
      <span class="text-xs font-black text-slate-800 tracking-tight">{{ userStore.userInfo.nickName || "至尊商户" }}</span>
      <el-icon class="text-amber-500 w-2.5 h-2.5"><CircleCheckFilled /></el-icon>
    </div>
    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Boundless Member</span>
  </div>
</span>
      </el-dropdown>
    </div>
  </div>
</nav>

    <!-- Hero Section: 增加浮动 UI 元素 -->
    <section class="relative min-h-screen flex items-center pt-20 px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div class="z-10">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-8 animate-fade-in-left">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            v3.0 {{ $t('newMerchantSystem') }}
          </div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-slate-900 animate-fade-in-left">
            {{ $t('heroTitle1') }}<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">{{ $t('heroTitle2') }}</span>
          </h1>
          <p class="text-lg text-slate-500 mb-10 max-w-lg font-medium leading-relaxed animate-fade-in-left" style="animation-delay: 0.2s">
            {{ $t('heroDesc') }}
          </p>
          <div class="flex flex-wrap gap-4 animate-fade-in-left" style="animation-delay: 0.4s">
            <button @click="router.push('/merchant')" class="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-200 flex items-center gap-2 group">
              {{ $t('freeEntry') }}
              <ArrowRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button @click="router.push('/appointment')" class="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              {{ $t('bookDemo') }}
            </button>
          </div>
          
          <!-- 新增：数字统计模块 -->
          <div class="grid grid-cols-3 gap-6 mt-16 animate-fade-in-left" style="animation-delay: 0.6s">
            <div class="text-center">
              <div class="text-4xl font-black text-indigo-600 mb-2 counter" data-target="150">0</div>
              <div class="text-xs text-slate-500 font-bold">{{ $t('currencyCount') }}</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-black text-indigo-600 mb-2 counter" data-target="10000">0</div>
              <div class="text-xs text-slate-500 font-bold">{{ $t('merchantCount') }}</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-black text-indigo-600 mb-2 counter" data-target="98">0</div>
              <div class="text-xs text-slate-500 font-bold">{{ $t('satisfactionRate') }}</div>
            </div>
          </div>
        </div>

        <!-- 右侧浮动 UI 装饰 -->
        <div class="relative hidden lg:block animate-fade-in-right">
          <!-- 主卡片 -->
          <div class="relative z-20 bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-100 p-8 animate-float">
            <div class="flex justify-between items-center mb-8">
              <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div class="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Revenue Dashboard</div>
            </div>
            <div class="space-y-6">
              <div class="h-40 w-full bg-slate-50 rounded-2xl relative overflow-hidden group">
                <!-- 模拟增长曲线 -->
                <svg viewBox="0 0 400 100" class="absolute bottom-0 left-0 w-full h-full">
                  <path d="M0,80 Q50,70 100,40 T200,30 T300,60 T400,10" fill="none" stroke="#4F46E5" stroke-width="4" class="animate-draw" />
                </svg>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-indigo-50 rounded-2xl">
                  <div class="text-xs text-indigo-400 font-bold mb-1">Total Sales</div>
                  <div class="text-2xl font-black text-indigo-600">$128.4k</div>
                </div>
                <div class="p-4 bg-slate-50 rounded-2xl">
                  <div class="text-xs text-slate-400 font-bold mb-1">Active Users</div>
                  <div class="text-2xl font-black text-slate-900">2,840</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 装饰小元素 -->
          <div class="absolute -top-10 -right-10 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 animate-float-delayed">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckIcon class="w-6 h-6" />
              </div>
              <div>
                <div class="text-xs font-bold">{{ $t('paymentSuccess') }}</div>
                <div class="text-[10px] text-slate-400">{{ $t('fromLondon') }}</div>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-6 -left-10 z-10 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <!-- 新增：悬浮特色服务卡片 -->
      <div class="absolute bottom-10 right-10 z-40 hidden lg:block">
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 w-64 animate-float-delayed" style="animation-duration: 8s">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <SparklesIcon class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-lg">{{ $t('featuredService') }}</h3>
          </div>
          <p class="text-sm text-slate-500 mb-4">{{ $t('featuredServiceDesc') }}</p>
          <button class="w-full py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors">
            {{ $t('learnMore') }}
          </button>
        </div>
      </div>
    </section>

    <!-- 合作伙伴跑马灯 -->
    <div class="py-12 border-y border-slate-50 bg-slate-50/30">
      <div class="flex overflow-hidden space-x-16 group">
        <div class="flex space-x-16 animate-marquee whitespace-nowrap py-4">
          <span v-for="i in 10" :key="i" class="text-2xl font-black text-slate-200 hover:text-indigo-200 transition-colors cursor-default uppercase tracking-tighter">
            {{ $t('partnerText') }}
          </span>
        </div>
        <div class="flex space-x-16 animate-marquee whitespace-nowrap py-4">
          <span v-for="i in 10" :key="i" class="text-2xl font-black text-slate-200 hover:text-indigo-200 transition-colors cursor-default uppercase tracking-tighter">
            {{ $t('partnerText') }}
          </span>
        </div>
      </div>
    </div>

    <!-- 核心能力：交互式卡片 -->
    <section class="py-32 px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-black mb-4">{{ $t('coreCapabilityTitle') }}</h2>
          <p class="text-slate-500">{{ $t('coreCapabilityDesc') }}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(item, index) in features" :key="index" 
            class="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.1)] transition-all duration-500 overflow-hidden">
            <div class="absolute top-0 left-0 w-2 h-0 bg-indigo-600 group-hover:h-full transition-all duration-500"></div>
            <div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:rotate-6 transition-all duration-500">
              <component :is="item.icon" class="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h3 class="text-2xl font-bold mb-4">{{ $t(`featureTitle${index+1}`) }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ $t(`featureDesc${index+1}`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增：用户评价轮播 -->
    <section class="py-24 px-8 bg-slate-50/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black mb-4">{{ $t('customerReviewsTitle') }}</h2>
          <p class="text-slate-500 max-w-2xl mx-auto">{{ $t('customerReviewsDesc') }}</p>
        </div>
        
        <div class="relative">
          <!-- 轮播容器 -->
          <div class="overflow-hidden" ref="reviewSlider">
            <div class="flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="(review, index) in reviews" :key="index" class="w-full flex-shrink-0 px-4">
                <div class="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 max-w-4xl mx-auto">
                  <div class="flex items-center mb-6">
                    <div class="flex text-amber-400">
                      <StarIcon class="w-5 h-5" v-for="i in 5" :key="i" />
                    </div>
                    <span class="ml-2 text-sm text-slate-500">★ {{ review.rating }}.0</span>
                  </div>
                  <p class="text-lg text-slate-800 italic mb-8">"{{ $t(`reviewContent${index+1}`) }}"</p>
                  <div class="flex items-center gap-4">
                    <el-avatar :src="review.avatar" class="!w-12 !h-12" />
                    <div>
                      <h4 class="font-bold">{{ review.name }}</h4>
                      <p class="text-sm text-slate-500">{{ review.company }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 轮播控制按钮 -->
          <button @click="prevSlide" class="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors z-10">
            <ChevronLeftIcon class="w-6 h-6" />
          </button>
          <button @click="nextSlide" class="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors z-10">
            <ChevronRightIcon class="w-6 h-6" />
          </button>
          
          <!-- 轮播指示器 -->
          <div class="flex justify-center gap-2 mt-8">
            <button v-for="(review, index) in reviews" :key="index" 
              @click="currentSlide = index"
              class="w-3 h-3 rounded-full transition-all"
              :class="currentSlide === index ? 'bg-indigo-600 w-6' : 'bg-slate-300'"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- 入驻流程：动态步骤 -->
    <section class="py-32 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 px-8 overflow-hidden relative">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4F46E5,transparent)]"></div>
      </div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 class="text-4xl md:text-5xl font-black mb-12 leading-tight">
              {{ $t('processTitle1') }}<br/>{{ $t('processTitle2') }}
            </h2>
            <div class="space-y-12">
              <div v-for="(step, idx) in steps" :key="idx" class="flex gap-6 group">
                <div class="text-5xl font-black text-white/10 group-hover:text-indigo-500 transition-colors duration-500">0{{ idx + 1 }}</div>
                <div>
                  <h4 class="text-xl font-bold mb-2">{{ $t(`stepTitle${idx+1}`) }}</h4>
                  <p class="text-slate-400 text-sm">{{ $t(`stepDesc${idx+1}`) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[3rem] p-1 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
              <div class="w-full h-full bg-slate-900 rounded-[2.8rem] flex items-center justify-center p-12">
                <div class="text-center">
                  <div class="text-6xl mb-4">🚀</div>
                  <div class="text-2xl font-bold mb-2">{{ $t('readyToStart') }}</div>
                  <p class="text-slate-400 mb-8">{{ $t('joinMerchants') }}</p>
                  <button class="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:scale-105 transition-transform">
                    {{ $t('submitApplication') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增：常见问题折叠面板 -->
    <section class="py-24 px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black mb-4">{{ $t('faqTitle') }}</h2>
          <p class="text-slate-500">{{ $t('faqDesc') }}</p>
        </div>
        
        <el-collapse class="!border-0" accordion>
          <el-collapse-item 
            v-for="(faq, index) in faqs" 
            :key="index"
            :title="$t(`faqQuestion${index+1}`)"
            class="!mb-4 !border !border-slate-100 !rounded-xl !overflow-hidden"
          >
            <div class="py-4 text-slate-600">
              {{ $t(`faqAnswer${index+1}`) }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </section>

    <!-- 页脚 -->
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
        © {{ new Date().getFullYear() }} Boundless Mall. {{ $t('allRightsReserved') }}
      </div>
    </footer>
    
    <!-- 新增：智能客服悬浮按钮 -->
    <div class="fixed bottom-8 right-8 z-50">
      <button class="w-16 h-16 bg-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-indigo-700 transition-colors group">
        <MessageSquareIcon class="w-8 h-8 group-hover:scale-110 transition-transform" />
        <div class="absolute -top-10 right-0 bg-white text-slate-900 rounded-xl px-4 py-2 shadow-lg text-sm font-bold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          {{ $t('onlineService') }}
        </div>
      </button>
    </div>
    
    <MemberModal ref="memberModal" />
    <Login v-model="userStore.showLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useUserStore } from '../stores/userStore';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import Logo from '../component/Logo.vue';
import Login from '../component/Login.vue';
import MemberModal from '../component/MemberModal.vue';
import { 
  Globe as GlobeIcon, 
  ArrowRight as ArrowRightIcon, 
  Check as CheckIcon,
  CreditCard as CreditCardIcon,
  Cpu as CpuIcon,
  BarChart3 as BarChart3Icon,
  Crown as CrownIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Sparkles as SparklesIcon,
  Star as StarIcon,
  MessageSquare as MessageSquareIcon
} from 'lucide-vue-next';


const memberModal:any = ref<InstanceType<typeof MemberModal>>();
const userStore:any = useUserStore();
const isUserDropdownOpen = ref(false);
const router = useRouter();

// 新增：语言切换功能
const currentLang = ref('zh');
const translations:any = {
  zh: {
    memberPackage: '会员套餐',
    startUsing: '开始使用',
    userCenter: '个人中心',
    merchantDashboard: '商户后台',
    logout: '退出登录',
    newMerchantSystem: '全新商户系统已上线',
    heroTitle1: '让全球贸易',
    heroTitle2: '触手可及',
    heroDesc: '无边商城为现代企业提供全链路数字化工具。从跨境支付到 AI 驱动的库存管理，我们助您突破增长边界。',
    freeEntry: '立即免费入驻',
    bookDemo: '预约演示',
    currencyCount: '支持货币种类',
    merchantCount: '入驻商户数量',
    satisfactionRate: '商户满意度',
    paymentSuccess: '支付成功',
    fromLondon: '来自 伦敦, 英国',
    featuredService: '专属定制服务',
    featuredServiceDesc: '为高净值商户提供一对一的定制化解决方案，满足您的个性化需求。',
    learnMore: '了解详情',
    partnerText: 'Global Partner • Boundless • Innovation • Digital Growth • ',
    coreCapabilityTitle: '全方位赋能商户',
    coreCapabilityDesc: '不仅仅是商城，更是您的数字化增长引擎',
    featureTitle1: '全球支付结算',
    featureDesc1: '支持150+主流货币，实时汇率换算，资金秒级到账。',
    featureTitle2: 'AI智能运营',
    featureDesc2: '大数据分析用户行为，自动化订单处理，降低50%运营成本。',
    featureTitle3: '全维度数据看板',
    featureDesc3: '实时监控营收与用户数据，可视化报表辅助商业决策。',
    customerReviewsTitle: '商户的真实评价',
    customerReviewsDesc: '来自全球各地商户的使用体验，见证我们的服务价值',
    reviewContent1: '使用Boundless Mall后，我们的跨境业务增长了200%，支付结算效率提升了80%，这是我们用过的最专业的跨境电商解决方案。',
    reviewContent2: 'AI智能运营功能帮我们节省了大量的人力成本，系统的数据分析能力让我们能精准把握市场趋势，非常推荐！',
    reviewContent3: '客服响应速度非常快，技术团队解决问题的能力很强，平台稳定性也远超我们之前使用的其他系统。',
    processTitle1: '三步开启',
    processTitle2: '您的全球生意',
    stepTitle1: '提交基本资料',
    stepDesc1: '只需 5 分钟，填写您的企业或个人基本信息。',
    stepTitle2: '资质快速审核',
    stepDesc2: '我们的 AI 审核系统将在 24 小时内完成资质验证。',
    stepTitle3: '开启全球贸易',
    stepDesc3: '配置您的店铺，立即开始接收来自全球的订单。',
    readyToStart: '准备好出发了吗？',
    joinMerchants: '加入 10,000+ 成功商户的行列',
    submitApplication: '立即提交申请',
    faqTitle: '常见问题',
    faqDesc: '解答您最关心的问题，让入驻更安心',
    faqQuestion1: '入驻需要哪些资质文件？',
    faqAnswer1: '个人商户需要提供身份证正反面照片，企业商户需要提供营业执照、法人身份证、银行对公账户信息。所有文件支持在线上传，审核过程全程线上完成。',
    faqQuestion2: '交易手续费如何收取？',
    faqQuestion3: '平台支持哪些物流配送方式？',
    faqQuestion4: '如何保障交易资金安全？',
    faqAnswer2: '我们采用阶梯式费率，基础费率为交易金额的1.5%，交易量越大费率越低。VIP会员可享受0.8%的超低费率，且无提现手续费。',
    faqAnswer3: '平台集成了DHL、FedEx、UPS、顺丰国际等全球主流物流服务商，支持智能物流匹配，系统会根据收货地址自动推荐最优物流方案。',
    faqAnswer4: '所有交易资金由第三方支付机构托管，严格遵守国际反洗钱法规，每笔交易都有区块链存证，资金提现支持T+1到账，全程可追溯。',
    onlineService: '在线客服',
    allRightsReserved: '保留所有权利'
  },
  en: {
    memberPackage: 'Member Package',
    startUsing: 'Get Started',
    userCenter: 'User Center',
    merchantDashboard: 'Merchant Dashboard',
    logout: 'Logout',
    newMerchantSystem: 'New Merchant System Launched',
    heroTitle1: 'Make Global Trade',
    heroTitle2: 'Boundless',
    heroDesc: 'Boundless Mall provides full-link digital tools for modern enterprises. From cross-border payments to AI-driven inventory management, we help you break through growth boundaries.',
    freeEntry: 'Join Free Now',
    bookDemo: 'Book a Demo',
    currencyCount: 'Supported Currencies',
    merchantCount: 'Merchants Joined',
    satisfactionRate: 'Satisfaction Rate',
    paymentSuccess: 'Payment Successful',
    fromLondon: 'From London, UK',
    featuredService: 'Customized Service',
    featuredServiceDesc: 'One-on-one customized solutions for high-net-worth merchants to meet your personalized needs.',
    learnMore: 'Learn More',
    partnerText: 'Global Partner • Boundless • Innovation • Digital Growth • ',
    coreCapabilityTitle: 'Empower Merchants Comprehensively',
    coreCapabilityDesc: 'More than just a mall, it\'s your digital growth engine',
    featureTitle1: 'Global Payment Settlement',
    featureDesc1: 'Supports 150+ major currencies, real-time exchange rate conversion, and instant fund arrival.',
    featureTitle2: 'AI Intelligent Operation',
    featureDesc2: 'Big data analyzes user behavior, automates order processing, and reduces operating costs by 50%.',
    featureTitle3: 'Comprehensive Data Dashboard',
    featureDesc3: 'Real-time monitoring of revenue and user data, visual reports to assist business decisions.',
    customerReviewsTitle: 'Genuine Reviews from Merchants',
    customerReviewsDesc: 'Usage experiences from merchants around the world, witnessing the value of our services',
    reviewContent1: 'After using Boundless Mall, our cross-border business has grown by 200%, and payment settlement efficiency has increased by 80%. This is the most professional cross-border e-commerce solution we have ever used.',
    reviewContent2: 'The AI intelligent operation function has saved us a lot of labor costs, and the system\'s data analysis capabilities allow us to accurately grasp market trends. Highly recommended!',
    reviewContent3: 'The customer service response speed is very fast, the technical team has strong problem-solving abilities, and the platform stability is far superior to other systems we have used before.',
    processTitle1: 'Start Your',
    processTitle2: 'Global Business in 3 Steps',
    stepTitle1: 'Submit Basic Information',
    stepDesc1: 'It only takes 5 minutes to fill in your personal or enterprise basic information.',
    stepTitle2: 'Fast Qualification Review',
    stepDesc2: 'Our AI review system will complete qualification verification within 24 hours.',
    stepTitle3: 'Start Global Trade',
    stepDesc3: 'Configure your store and start receiving orders from around the world immediately.',
    readyToStart: 'Ready to start?',
    joinMerchants: 'Join the ranks of 10,000+ successful merchants',
    submitApplication: 'Submit Application Now',
    faqTitle: 'Frequently Asked Questions',
    faqDesc: 'Answer your most concerned questions and make entry more secure',
    faqQuestion1: 'What qualification documents are required for entry?',
    faqAnswer1: 'Individual merchants need to provide photos of both sides of their ID cards, and enterprise merchants need to provide business licenses, legal person ID cards, and corporate bank account information. All documents support online upload, and the review process is completed online.',
    faqQuestion2: 'How are transaction fees charged?',
    faqAnswer2: 'We adopt a tiered rate system, with a basic rate of 1.5% of the transaction amount. The larger the transaction volume, the lower the rate. VIP members can enjoy an ultra-low rate of 0.8% with no withdrawal fees.',
    faqQuestion3: 'What logistics and distribution methods does the platform support?',
    faqAnswer3: 'The platform integrates major global logistics service providers such as DHL, FedEx, UPS, and SF International, supports intelligent logistics matching, and the system will automatically recommend the optimal logistics plan based on the delivery address.',
    faqQuestion4: 'How to ensure the security of transaction funds?',
    faqAnswer4: 'All transaction funds are hosted by third-party payment institutions, strictly complying with international anti-money laundering regulations. Each transaction is recorded on the blockchain, and fund withdrawals support T+1 arrival, which is fully traceable.',
    onlineService: 'Online Service',
    allRightsReserved: 'All Rights Reserved'
  }
};

// 翻译函数
const $t = (key: string) => {
  return translations[currentLang.value][key] || key;
};

// 切换语言
const switchLang = (lang: string) => {
  currentLang.value = lang;
  ElMessage.success(`Switched to ${lang === 'zh' ? '简体中文' : 'English'}`);
};

const handleDropdownCommand = (command: string) => {
  switch (command) {
    case 'user-center':
      router.push('/usercenter'); // 跳转到个人中心
      break;
    case 'merchant-dashboard':
      router.push('/merchantdashboard'); // 跳转到商户后台
      break;
    case 'logout':
      userStore.logout(); // 退出登录
      ElMessage.success($t('logout') + ' ' + $t('success'));
      break;
  }
};

const isScrolled = ref(false);
const scrollProgress = ref(0);

const menuItems:any = [
  { name: $t('heroTitle1').includes('全球贸易') ? '首页' : 'Home', path: '/' },
  { name: $t('heroTitle1').includes('全球贸易') ? '解决方案' : 'Solutions', path: '/solutions' },
  { name: $t('heroTitle1').includes('全球贸易') ? '商户入驻' : 'Merchant Entry', path: '/merchant' },
  { name: $t('heroTitle1').includes('全球贸易') ? '帮助中心' : 'Help Center', path: '/help' }
];

// 监听语言变化更新菜单
watch(currentLang, () => {
  menuItems[0].name = currentLang.value === 'zh' ? '首页' : 'Home';
  menuItems[1].name = currentLang.value === 'zh' ? '解决方案' : 'Solutions';
  menuItems[2].name = currentLang.value === 'zh' ? '商户入驻' : 'Merchant Entry';
  menuItems[3].name = currentLang.value === 'zh' ? '帮助中心' : 'Help Center';
});

const features = [
  { title: $t('featureTitle1'), desc: $t('featureDesc1'), icon: CreditCardIcon },
  { title: $t('featureTitle2'), desc: $t('featureDesc2'), icon: CpuIcon },
  { title: $t('featureTitle3'), desc: $t('featureDesc3'), icon: BarChart3Icon },
];

const steps = [
  { title: $t('stepTitle1'), desc: $t('stepDesc1') },
  { title: $t('stepTitle2'), desc: $t('stepDesc2') },
  { title: $t('stepTitle3'), desc: $t('stepDesc3') }
];

// 新增：用户评价数据
const reviews = [
  { name: '张明', company: '环球科技 CEO', avatar: 'https://picsum.photos/seed/user1/200/200', rating: 5 },
  { name: 'Lisa Wang', company: 'Fashion Nova COO', avatar: 'https://picsum.photos/seed/user2/200/200', rating: 5 },
  { name: '王建国', company: '东方贸易 创始人', avatar: 'https://picsum.photos/seed/user3/200/200', rating: 4.9 }
];

// 轮播控制
const currentSlide = ref(0);

const nextSlide = () => {
  if (currentSlide.value < reviews.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = reviews.length - 1;
  }
};

// 自动轮播
let slideInterval: number;
onMounted(() => {
  slideInterval = window.setInterval(nextSlide, 5000);
  
  // 数字计数动画
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target')!;
    const duration = 2000; // 动画时长
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current).toString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toString();
      }
    };
    
    updateCounter();
  });
});

onUnmounted(() => {
  window.clearInterval(slideInterval);
});

// 常见问题数据
const faqs = [
  { question: $t('faqQuestion1'), answer: $t('faqAnswer1') },
  { question: $t('faqQuestion2'), answer: $t('faqAnswer2') },
  { question: $t('faqQuestion3'), answer: $t('faqAnswer3') },
  { question: $t('faqQuestion4'), answer: $t('faqAnswer4') }
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = (window.scrollY / totalHeight) * 100;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped lang="scss">
/* 跑马灯动画 */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
.animate-marquee {
  animation: marquee 40s linear infinite;
}

/* 浮动动画 */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(3deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-delayed {
  animation: float 6s ease-in-out infinite 1s;
}

/* 路径绘制动画 */
@keyframes draw {
  from { stroke-dasharray: 0 1000; }
  to { stroke-dasharray: 1000 1000; }
}
.animate-draw {
  stroke-dasharray: 1000;
  animation: draw 3s ease-out forwards;
}

/* 进入动画 */
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-right {
  animation: fadeInRight 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-left {
  animation: fadeInLeft 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0px;
}
.animate-slide-up {
  animation: slideUp 0.2s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.user-dropdown) {
  /* 下拉触发按钮 hover 样式 */
  .el-dropdown-link {
    transition: all 0.2s ease;
  }
  
  /* 下拉菜单容器样式 */
  .el-dropdown-menu {
    border-radius: 12px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid #f1f5f9 !important;
    padding: 8px 0 !important;
    margin-top: 8px !important;
    animation: el-dropdown-fade-in 0.2s ease-out forwards !important;
  }
  
  /* 下拉菜单项样式 */
  .el-dropdown-item {
    height: auto !important;
    line-height: 1.2 !important;
    padding: 10px 16px !important;
    margin: 0 !important;
    color: #475569 !important;
    font-size: 14px !important;
    transition: all 0.2s ease !important;
    
    &:hover {
      background-color: #EEF2FF !important;
      color: #4F46E5 !important;
    }
    
    &.is-disabled {
      color: #94a3b8 !important;
    }
    
    /* 分割线样式 */
    &.el-dropdown-item--divided {
      border-top: 1px solid #f1f5f9 !important;
      margin-top: 4px !important;
      padding-top: 14px !important;
    }
  }
  
  /* 退出登录项样式 */
  .el-dropdown-item[command="logout"] {
    &:hover {
      background-color: #FEF2F2 !important;
      color: #EF4444 !important;
    }
  }
}

/* 修复 Element Plus 头像样式 */
:deep(.el-avatar) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-weight: bold !important;
}

/* 折叠面板样式优化 */
:deep(.el-collapse) {
  .el-collapse-item {
    border-radius: 16px !important;
    
    .el-collapse-item__header {
      padding: 20px 24px !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      border-bottom: none !important;
      
      .el-collapse-item__arrow {
        color: #4F46E5 !important;
        font-size: 16px !important;
      }
    }
    
    .el-collapse-item__content {
      padding: 0 24px !important;
      border-top: 1px solid #f1f5f9 !important;
    }
  }
}

/* 轮播指示器动画 */
button[class*="bg-indigo-600"] {
  transition: all 0.3s ease;
}
@keyframes lightReflection {
  0% {
    transform: rotate(-45deg) translateX(-150%);
  }
  100% {
    transform: rotate(-45deg) translateX(150%);
  }
}

:deep(.animate-light-reflection) {
  animation: lightReflection 3s ease-in-out infinite;
  will-change: transform;
  backface-visibility: hidden;
}

// 按钮基础样式增强（确保文字白色）
:deep(.text-white) {
  color: #ffffff !important;
}

// 按钮交互状态优化
:deep(button) {
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  // 点击时光效暂停，增强交互反馈
  &:active .animate-light-reflection {
    animation-play-state: paused;
  }
}

.animate-metal-shine {
  animation: metal-shine 4s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-metal-spin {
  animation: metal-spin 3s infinite ease-in-out;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.animate-slow-spin {
  animation: spin 8s linear infinite;
}
/* 扫光动效 */
.animate-shine {
  animation: shine 3s linear infinite;
}
@keyframes shine {
  to {
    transform: translateX(100%);
  }
}
/* 轻微弹跳 */
.animate-bounce-subtle {
  animation: bounce-subtle 3s ease-in-out infinite;
}
@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}
</style>