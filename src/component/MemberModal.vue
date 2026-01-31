<template>
  <!-- 遮罩层 -->
  <div 
    v-if="showModal" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
    @click.self="closeModal"
  >
    <!-- 弹窗主体：缩小尺寸、最大高度限制、不占满屏幕 -->
    <div 
      class="w-full max-w-4xl bg-white rounded-[2rem] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] overflow-hidden transition-all duration-400 max-h-[90vh] overflow-y-auto"
      :class="modalAnimate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
    >
      <!-- 头部：精简内边距 -->
      <div class="relative px-6 py-5 border-b border-slate-100">
        <button 
          class="absolute top-4 right-4 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
          @click="closeModal"
        >
          <XIcon class="w-4 h-4" />
        </button>
        
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-2">
          <CrownIcon class="w-3.5 h-3.5" />
          会员专享权益
        </div>
        
        <h2 class="text-2xl font-black mb-1">无边商户会员体系</h2>
        <p class="text-sm text-slate-500">选择适合您的套餐，解锁增长能力</p>
      </div>

      <!-- 周期切换：紧凑布局 -->
      <div class="px-6 py-3 border-b border-slate-100">
        <div class="flex max-w-xs mx-auto gap-1 bg-slate-50 rounded-full p-0.5">
          <button
            v-for="(period, idx) in periods"
            :key="idx"
            @click="activePeriod = period.key"
            :class="[
              'flex-1 py-1.5 px-3 rounded-full text-sm font-bold transition-all',
              activePeriod === period.key 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            ]"
          >
            {{ period.name }}
            <span v-if="period.discount" class="ml-1 text-xs text-indigo-600">{{ period.discount }}</span>
          </button>
        </div>
      </div>

      <!-- 套餐卡片：缩小内边距、整体更紧凑 -->
      <div class="p-6">
        <div class="grid md:grid-cols-3 gap-4">
          <!-- 基础版 -->
          <div 
            class="group relative rounded-xl border border-slate-200 p-5 hover:border-indigo-200 hover:shadow-[0_15px_30px_-10px_rgba(79,70,229,0.1)] hover:-translate-y-1 transition-all duration-400"
          >
            <div class="absolute top-0 right-0 bg-slate-50 text-slate-600 text-[10px] font-bold px-3 py-0.5 rounded-bl-lg rounded-tr-xl">
              基础版
            </div>
            
            <div class="mb-4">
              <div class="text-3xl font-black mb-1">
                ¥{{ activePeriod === 'month' ? 299 : 2990 }}
                <span class="text-xs font-medium text-slate-500">/{{ activePeriod === 'month' ? '月' : '年' }}</span>
              </div>
              <p class="text-xs text-slate-400">适合初创小微商户</p>
            </div>
            
            <ul class="space-y-2 mb-5">
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">基础店铺搭建（100商品）</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">单币种支付结算</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">基础数据分析报表</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">7×8小时在线客服</span>
              </li>
              <li class="flex items-start gap-2 text-slate-400">
                <XIcon class="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span class="text-xs">营销工具与插件</span>
              </li>
              <li class="flex items-start gap-2 text-slate-400">
                <XIcon class="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span class="text-xs">API接口对接</span>
              </li>
            </ul>
            
            <button 
              class="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-bold hover:bg-slate-50 transition-all group-hover:border-indigo-600 group-hover:text-indigo-600"
            >
              选择基础版
            </button>
          </div>

          <!-- 专业版 - 主推 -->
          <div 
            class="group relative rounded-xl border-2 border-indigo-600 bg-indigo-50/50 p-5 hover:shadow-[0_15px_30px_-10px_rgba(79,70,229,0.15)] hover:-translate-y-1 transition-all duration-400"
          >
            <div class="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-lg rounded-tr-xl">
              最受欢迎
            </div>
            
            <div class="mb-4">
              <div class="text-3xl font-black mb-1">
                ¥{{ activePeriod === 'month' ? 899 : 8990 }}
                <span class="text-xs font-medium text-slate-500">/{{ activePeriod === 'month' ? '月' : '年' }}</span>
              </div>
              <p class="text-xs text-slate-400">适合成长型企业商户</p>
            </div>
            
            <ul class="space-y-2 mb-5">
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">高级店铺搭建（不限商品）</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">多币种支付结算（150+）</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">AI智能数据分析</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">7×24小时专属客服</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">10+营销工具插件</span>
              </li>
              <li class="flex items-start gap-2 text-slate-400">
                <XIcon class="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span class="text-xs">定制化API接口</span>
              </li>
            </ul>
            
            <button 
              class="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all hover:shadow-md hover:shadow-indigo-200"
            >
              选择专业版
            </button>
          </div>

          <!-- 企业版 -->
          <div 
            class="group relative rounded-xl border border-slate-200 p-5 hover:border-indigo-200 hover:shadow-[0_15px_30px_-10px_rgba(79,70,229,0.1)] hover:-translate-y-1 transition-all duration-400"
          >
            <div class="absolute top-0 right-0 bg-slate-50 text-slate-600 text-[10px] font-bold px-3 py-0.5 rounded-bl-lg rounded-tr-xl">
              企业版
            </div>
            
            <div class="mb-4">
              <div class="text-3xl font-black mb-1">
                ¥{{ activePeriod === 'month' ? 2999 : 29990 }}
                <span class="text-xs font-medium text-slate-500">/{{ activePeriod === 'month' ? '月' : '年' }}</span>
              </div>
              <p class="text-xs text-slate-400">适合中大型品牌企业</p>
            </div>
            
            <ul class="space-y-2 mb-5">
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">定制化店铺搭建</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">全球支付结算（全币种）</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">企业级数据中台</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">专属客户经理服务</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">全量营销工具插件</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-xs text-slate-700">定制化API接口对接</span>
              </li>
            </ul>
            
            <button 
              class="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-bold hover:bg-slate-50 transition-all group-hover:border-indigo-600 group-hover:text-indigo-600"
            >
              选择企业版
            </button>
          </div>
        </div>
      </div>

      <!-- 额外权益：紧凑小卡片 -->
      <div class="px-6 pb-6">
        <h3 class="text-lg font-bold mb-4 text-center">会员专享额外权益</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-slate-50 rounded-lg p-3 text-center">
            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <GiftIcon class="w-4 h-4 text-indigo-600" />
            </div>
            <h4 class="text-sm font-bold mb-0.5">新客礼包</h4>
            <p class="text-[10px] text-slate-500">首年享额外3个月</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3 text-center">
            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpenIcon class="w-4 h-4 text-indigo-600" />
            </div>
            <h4 class="text-sm font-bold mb-0.5">免费课程</h4>
            <p class="text-[10px] text-slate-500">100+运营增长课</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3 text-center">
            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <UsersIcon class="w-4 h-4 text-indigo-600" />
            </div>
            <h4 class="text-sm font-bold mb-0.5">商户社群</h4>
            <p class="text-[10px] text-slate-500">高端商户交流圈</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3 text-center">
            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ShieldIcon class="w-4 h-4 text-indigo-600" />
            </div>
            <h4 class="text-sm font-bold mb-0.5">安全保障</h4>
            <p class="text-[10px] text-slate-500">交易安全全额承保</p>
          </div>
        </div>
      </div>

      <!-- 底部：精简 -->
      <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-[2rem]">
        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
          <div class="text-xs text-slate-500">
            <span class="font-bold text-slate-900">提示：</span> 所有套餐支持7天无理由退款，可按需升级
          </div>
          <button 
            class="px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md shadow-indigo-200"
            @click="closeModal"
          >
            立即开通会员
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MemberModal' 
});
</script>
<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  X as XIcon,
  Crown as CrownIcon,
  Check as CheckIcon,
  Gift as GiftIcon,
  BookOpen as BookOpenIcon,
  Users as UsersIcon,
  Shield as ShieldIcon
} from 'lucide-vue-next';

const showModal = ref(false);
const modalAnimate = ref(false);

const activePeriod = ref('month');
const periods = [
  { key: 'month', name: '月付', discount: '' },
  { key: 'year', name: '年付', discount: '省588' }
];

const openModal = () => {
  showModal.value = true;
  setTimeout(() => modalAnimate.value = true, 50);
};

const closeModal = () => {
  modalAnimate.value = false;
  setTimeout(() => showModal.value = false, 300);
};

defineExpose({ openModal, closeModal });
</script>

<style scoped>
.flex-shrink-0 { flex-shrink: 0; }

/* 滚动条精简 */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
</style>