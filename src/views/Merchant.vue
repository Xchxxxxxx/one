<template>
  <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">
    <!-- 进度条（匹配首页） -->
    <div class="fixed top-0 left-0 h-1 bg-indigo-600 z-[60] transition-all duration-300" :style="{ width: scrollProgress + '%' }"></div>

    <!-- 背景装饰（适配浅色风格） -->
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

    <div class="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-8">
      <!-- 头部标题（匹配首页排版） -->
      <div class="text-center mb-10 animate-fade-in-left">
        <h1 class="text-4xl md:text-5xl font-black mb-4 tracking-tighter">商户入驻申请</h1>
        <p class="text-slate-500 max-w-2xl mx-auto font-medium">填写以下信息，开启您的全球数字化贸易之旅</p>
        
        <!-- 新增：资质审核提示栏 -->
        <div class="mt-8 max-w-3xl mx-auto bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3">
          <InfoIcon class="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <div class="text-left">
            <p class="text-sm font-bold text-indigo-800">审核时效提示</p>
            <p class="text-xs text-slate-600">提交完整资料后，我们将在1-3个工作日完成审核，结果将通过短信/邮件通知</p>
          </div>
        </div>
      </div>

      <!-- 新增：入驻优势卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-left" style="animation-delay: 0.3s">
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <ShopIcon class="w-6 h-6 text-indigo-600" />
          </div>
          <h3 class="font-bold text-lg mb-2">全球流量曝光</h3>
          <p class="text-slate-500 text-sm">入驻后获得平台亿级流量扶持，覆盖全球20+国家和地区用户</p>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <ShieldIcon class="w-6 h-6 text-indigo-600" />
          </div>
          <h3 class="font-bold text-lg mb-2">资金安全保障</h3>
          <p class="text-slate-500 text-sm">第三方资金托管，交易资金T+1结算，全程银行级安全防护</p>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <GiftIcon class="w-6 h-6 text-indigo-600" />
          </div>
          <h3 class="font-bold text-lg mb-2">专属运营支持</h3>
          <p class="text-slate-500 text-sm">一对一运营顾问，免费提供店铺装修、营销方案、数据分析服务</p>
        </div>
      </div>

      <!-- 现代步骤条（增强交互） -->
      <div class="flex items-center justify-between mb-12 px-4 lg:px-20">
        <div v-for="(step, index) in ['基本信息', '资质上传', '财务信息']" :key="index" class="flex flex-col items-center relative flex-1 group">
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 z-10 shadow-lg hover:shadow-indigo-200 cursor-pointer"
            :class="currentStep >= index ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-slate-50 text-slate-400 border border-slate-200'"
            @click="jumpToStep(index)"
          >
            <component :is="currentStep > index ? 'CheckIcon' : ''" v-if="currentStep > index" class="w-6 h-6" />
            <span v-else class="font-bold text-sm">{{ index + 1 }}</span>
          </div>
          <span class="mt-3 text-xs font-bold tracking-widest uppercase" :class="currentStep >= index ? 'text-indigo-600' : 'text-slate-400'">{{ step }}</span>
          <!-- 连接线（增强动效） -->
          <div v-if="index < 2" class="absolute top-6 left-[60%] w-[80%] h-[2px] bg-slate-100 -z-0">
            <div class="h-full bg-indigo-600 transition-all duration-700 ease-out" :style="{ width: currentStep > index ? '100%' : '0%' }"></div>
          </div>
        </div>
      </div>

      <!-- 表单容器（匹配首页卡片风格） -->
      <div class="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_30px_60px_-15px_rgba(79,70,229,0.08)] border border-slate-100 animate-fade-in-left" style="animation-delay: 0.2s">
        <!-- 新增：会员权益悬浮提示 -->
        <div class="absolute top-8 right-8 group">
          <button class="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all">
            <CrownIcon class="w-5 h-5 text-indigo-600" />
          </button>
          <div class="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <h4 class="font-bold text-sm mb-2 text-indigo-800">商户会员权益</h4>
            <ul class="text-xs text-slate-600 space-y-1">
              <li class="flex items-center gap-2"><CheckIcon class="w-3 h-3 text-green-500" /> 交易手续费低至0.6%</li>
              <li class="flex items-center gap-2"><CheckIcon class="w-3 h-3 text-green-500" /> 优先参与平台营销活动</li>
              <li class="flex items-center gap-2"><CheckIcon class="w-3 h-3 text-green-500" /> 专属数据看板分析</li>
              <li class="flex items-center gap-2"><CheckIcon class="w-3 h-3 text-green-500" /> 7×24小时专属客服</li>
            </ul>
          </div>
        </div>

        <el-form 
          ref="merchantFormRef"
          :model="form" 
          :rules="rules" 
          label-position="top"
          class="custom-light-form"
        >
          <!-- 步骤1：基本信息（增强动效） -->
          <div v-if="currentStep === 0" class="animate-slide-up duration-500">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <el-form-item label="商家全称" prop="merchantName" class="form-item">
                <el-input 
                  v-model="form.merchantName" 
                  placeholder="例如：无边科技有限责任公司" 
                  class="form-input"
                />
              </el-form-item>

              <el-form-item label="商家类型" prop="merchantType" class="form-item">
                <el-select 
                  v-model="form.merchantType" 
                  placeholder="请选择" 
                  class="form-select"
                  @change="onMerchantTypeChange"
                >
                  <el-option label="个体工商户" :value="1" />
                  <el-option label="企业商户" :value="2" />
                  <el-option label="品牌旗舰店" :value="3" />
                </el-select>
              </el-form-item>

              <el-form-item label="法人姓名" prop="legalPerson" class="form-item">
                <el-input 
                  v-model="form.legalPerson" 
                  placeholder="身份证上的姓名" 
                  class="form-input"
                />
              </el-form-item>

              <el-form-item label="身份证号" prop="idCardNo" class="form-item">
                <el-input 
                  v-model="form.idCardNo" 
                  placeholder="18位二代身份证号" 
                  class="form-input"
                />
              </el-form-item>

              <el-form-item label="联系电话" prop="contactPhone" class="form-item">
                <el-input 
                  v-model="form.contactPhone" 
                  placeholder="常用手机号码" 
                  class="form-input"
                />
              </el-form-item>

              <el-form-item label="电子邮箱" prop="contactEmail" class="form-item">
                <el-input 
                  v-model="form.contactEmail" 
                  placeholder="用于接收审核结果" 
                  class="form-input"
                />
              </el-form-item>

              <!-- 新增字段：经营范围 -->
              <el-form-item label="经营范围" prop="businessScope" class="form-item md:col-span-2">
                <el-input 
                  v-model="form.businessScope" 
                  type="textarea" 
                  rows="3" 
                  placeholder="请填写商户的经营范围，例如：电子产品销售、服装零售等" 
                  class="form-textarea"
                />
              </el-form-item>

              <!-- 新增字段：行业类型 -->
              <el-form-item label="行业类型" prop="industryType" class="form-item">
                <el-select 
                  v-model="form.industryType" 
                  placeholder="请选择所属行业" 
                  class="form-select"
                >
                  <el-option label="零售电商" value="retail" />
                  <el-option label="餐饮服务" value="catering" />
                  <el-option label="生活服务" value="lifeService" />
                  <el-option label="数码家电" value="digital" />
                  <el-option label="服装鞋帽" value="clothing" />
                  <el-option label="其他行业" value="other" />
                </el-select>
              </el-form-item>

              <!-- 新增字段：保证金金额(元) - 默认10000 -->
              <el-form-item label="保证金金额(元)" prop="depositAmount" class="form-item">
                <el-input 
                  v-model="form.depositAmount" 
                  type="number" 
                  placeholder="请输入应缴纳的保证金金额" 
                  step="0.01"
                  precision="2"
                  class="form-input"
                />
              </el-form-item>
            </div>
          </div>

          <!-- 步骤2：资质信息（增强动效） -->
          <div v-if="currentStep === 1" class="animate-slide-up duration-500">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
              <el-form-item label="营业执照号" prop="businessLicenseNo" class="form-item md:col-span-2 max-w-md">
                <el-input 
                  v-model="form.businessLicenseNo" 
                  placeholder="统一社会信用代码" 
                  class="form-input"
                />
              </el-form-item>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- 身份证正面上传 -->
              <el-form-item label="身份证正面" prop="idCardFrontUrl" class="form-item">
                <div class="upload-card group">
                  <el-upload
                    action="#"
                    :show-file-list="false"
                    :on-change="uploadWithField('idCardFrontUrl')"
                    :before-upload="beforeUpload"
                    accept="image/*"
                    class="w-full h-full"
                  >
                    <img v-if="form.idCardFrontUrl" :src="form.idCardFrontUrl" class="upload-img" />
                    <div v-else class="upload-trigger">
                      <PlusIcon class="w-8 h-8 mb-3 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      <span class="text-sm text-slate-500 font-medium">点击上传</span>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>

              <!-- 身份证反面上传 -->
              <el-form-item label="身份证反面" prop="idCardBackUrl" class="form-item">
                <div class="upload-card group">
                  <el-upload 
                    action="#" 
                    :show-file-list="false" 
                    :on-change="uploadWithField('idCardBackUrl')"
                    :before-upload="beforeUpload"
                    accept="image/*"
                  >
                    <img v-if="form.idCardBackUrl" :src="form.idCardBackUrl" class="upload-img" />
                    <div v-else class="upload-trigger">
                      <PlusIcon class="w-8 h-8 mb-3 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      <span class="text-sm text-slate-500 font-medium">点击上传</span>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>

              <!-- 营业执照上传 -->
              <el-form-item label="营业执照" prop="businessLicenseUrl" class="form-item">
                <div class="upload-card group">
                  <el-upload 
                    action="#" 
                    :show-file-list="false" 
                    :on-change="uploadWithField('businessLicenseUrl')"
                    :before-upload="beforeUpload"
                    accept="image/*"
                  >
                    <img v-if="form.businessLicenseUrl" :src="form.businessLicenseUrl" class="upload-img" />
                    <div v-else class="upload-trigger">
                      <PlusIcon class="w-8 h-8 mb-3 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      <span class="text-sm text-slate-500 font-medium">点击上传</span>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>
            </div>
          </div>

          <!-- 步骤3：银行信息（增强动效） -->
          <div v-if="currentStep === 2" class="animate-slide-up duration-500">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <el-form-item label="开户银行" prop="bankName" class="form-item">
                <el-input 
                  v-model="form.bankName" 
                  placeholder="例如：中国工商银行" 
                  class="form-input"
                />
              </el-form-item>
              <el-form-item label="银行账号" prop="bankAccountNo" class="form-item">
                <el-input 
                  v-model="form.bankAccountNo" 
                  placeholder="请输入银行卡号" 
                  class="form-input"
                />
              </el-form-item>
              <el-form-item label="账户名" prop="bankAccountName" class="form-item md:col-span-2 max-w-md">
                <el-input 
                  v-model="form.bankAccountName" 
                  placeholder="须与法人或公司名称一致" 
                  class="form-input"
                />
              </el-form-item>
            </div>

            <!-- 协议勾选（增强样式） -->
            <div class="mt-10 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl animate-pulse-once">
              <el-checkbox v-model="form.agree" class="custom-checkbox" prop="agree">
                <span class="text-sm text-slate-600 font-medium">我已阅读并同意 <span class="text-indigo-600 hover:underline cursor-pointer font-bold">《商户服务协议》</span> 与 <span class="text-indigo-600 hover:underline cursor-pointer font-bold">《隐私政策》</span></span>
              </el-checkbox>
            </div>
          </div>

          <!-- 底部按钮（增强交互） -->
          <div class="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
            <el-button 
              v-if="currentStep > 0" 
              @click="prevStep"
              class="prev-btn group"
            >
              <ArrowLeftIcon class="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              返回上一步
            </el-button>
            <div v-else></div>

            <el-button 
              type="primary" 
              @click="currentStep === 2 ? handleSubmit() : nextStep()"
              class="next-btn group"
              :loading="loading"
            >
              {{ currentStep === 2 ? '提交入驻申请' : '继续下一步' }}
              <ArrowRightIcon v-if="currentStep < 2" class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </el-button>
          </div>
        </el-form>
      </div>

      <!-- 新增：提交成功引导提示（默认隐藏） -->
      <div v-if="submitSuccess" class="mt-8 bg-green-50 border border-green-100 rounded-2xl p-6 animate-slide-up">
        <div class="flex items-center gap-3 mb-3">
          <CheckIcon class="w-6 h-6 text-green-600" />
          <h3 class="font-bold text-lg text-green-800">入驻申请提交成功！</h3>
        </div>
        <div class="pl-9 text-sm text-slate-600 space-y-2">
          <p>✅ 您的商户编号：<span class="font-bold text-indigo-600">{{ merchantId }}</span></p>
          <p>✅ 保证金支付完成后，审核将在1-3个工作日内完成</p>
          <p>✅ 审核结果将发送至您填写的邮箱和手机号</p>
          <p>✅ 如有疑问可联系客服：400-888-9999（工作日 9:00-18:00）</p>
        </div>
      </div>
    </div>

    <!-- 高级版支付弹窗 -->
    <el-dialog 
  v-model="showPayModal" 
  title="" 
  width="580px"
  center
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  class="pay-modal"
  :modal-class="['pay-modal-overlay']"
>
  <!-- 弹窗头部 -->
  <div class="pay-header text-center mb-6 relative">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full"></div>
    <h3 class="text-2xl font-black text-slate-900 mb-2">商户入驻保证金支付</h3>
    <p class="text-slate-500 text-sm">Payment of merchant entry margin</p>
    
    <!-- 保证金说明 -->
    <div class="mt-4 inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
      <InfoIcon class="w-4 h-4 text-indigo-600" />
      <span class="text-xs text-indigo-700 font-medium">保证金可退，退出平台时无违规将全额返还</span>
    </div>
  </div>

  <!-- 金额展示 -->
  <div class="pay-amount text-center mb-8">
    <div class="inline-block bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent py-2">
      <span class="text-5xl md:text-6xl font-black">¥{{ form.depositAmount.toFixed(2) }}</span>
    </div>
    <p class="text-slate-500 mt-2">
      {{ form.merchantType === 1 ? '个体工商户保证金' : form.merchantType === 2 ? '企业商户保证金' : '品牌旗舰店保证金' }}
    </p>
  </div>

  <!-- 保留支付方式选择卡片（核心） -->
  <div class="pay-methods grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
    <div 
      class="pay-method-item relative border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      :class="{ 
        'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100 ring-2 ring-indigo-200': selectedPayType === 'wechat',
        'border-slate-200 bg-white': selectedPayType !== 'wechat'
      }"
      @click="selectedPayType = 'wechat'"
    >
      <!-- 选中标识 -->
      <div v-if="selectedPayType === 'wechat'" class="absolute top-3 right-3 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
        <CheckIcon class="w-3 h-3 text-white" />
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 mx-auto bg-green-50 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09c-2.27-.59-3-1.2-3-2.11 0-1.09 1.01-1.87 2.78-1.87 1.49 0 2.31.64 2.63 1.23.47.84.08 1.61-.67 1.87-.42.14-.92.2-1.74.2-.67 0-1.26-.09-1.7-.25zM12 5.83c-2.49 0-4.51 1.79-4.98 4.08-.24 1.32.23 2.14 1.06 2.82.47.39 1.02.64 1.6.79.84.21 1.76.32 2.72.32 1.48 0 2.73-.22 3.68-.61.39-.16.85-.01 1.01.39.16.39-.01.85-.39 1.01-.81.34-1.87.53-3.02.53-2.76 0-5.03-1.93-5.03-4.37 0-2.07 1.62-3.49 3.98-3.91.79-.14 1.43.48 1.43 1.22 0 .66-.49 1.21-1.14 1.21-.61 0-1.09-.43-1.22-1.01C9.82 7.19 8.61 8.06 8 9.34c0 1.09 1.01 1.87 2.78 1.87 1.49 0 2.31-.64 2.63-1.23.47-.84.08-1.61-.67-1.87-.58-.2-1.28-.3-2.05-.3-.91 0-1.79.16-2.57.46-.17.07-.37.02-.49-.14-.12-.17-.02-.37.14-.49.9-.38 1.94-.59 3.08-.59 2.76 0 5.03 1.93 5.03 4.37 0 2.07-1.62 3.49-3.98 3.91-.79.14-1.43-.48-1.43-1.22 0-.66.49-1.21 1.14-1.21.61 0 1.09.43 1.22 1.01.23.85 1.44 1.72 3 1.72 2.22 0 4.03-1.57 4.03-3.53 0-1.83-1.59-3.22-3.64-3.46-.85-.11-1.48.65-1.48 1.47z"/>
          </svg>
        </div>
        <span class="text-slate-900 font-bold text-lg">微信支付</span>
        <p class="text-xs text-slate-500 mt-1">推荐 | 到账快 | 手续费低</p>
      </div>
    </div>

    <div 
      class="pay-method-item relative border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      :class="{ 
        'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100 ring-2 ring-indigo-200': selectedPayType === 'alipay',
        'border-slate-200 bg-white': selectedPayType !== 'alipay'
      }"
      @click="selectedPayType = 'alipay'"
    >
      <!-- 选中标识 -->
      <div v-if="selectedPayType === 'alipay'" class="absolute top-3 right-3 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
        <CheckIcon class="w-3 h-3 text-white" />
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 mx-auto bg-blue-50 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <span class="text-slate-900 font-bold text-lg">支付宝</span>
        <p class="text-xs text-slate-500 mt-1">便捷 | 支持信用卡支付</p>
      </div>
    </div>
  </div>

  <!-- 动态支付说明（根据选中的支付方式展示） -->
  <div class="mb-8 max-w-md mx-auto bg-indigo-50 border border-indigo-100 rounded-xl p-4">
    <p class="text-sm text-slate-700">
      <span class="text-indigo-600 font-bold">支付说明：</span> 
      请通过{{ selectedPayType === 'wechat' ? '微信转账' : '支付宝转账' }}完成保证金支付，支付完成后点击下方「确认支付」按钮完成入驻。
    </p>
    <p class="text-xs text-slate-500 mt-2">
      {{ selectedPayType === 'wechat' ? 
        '微信收款码：长按保存图片 → 微信扫码支付' : 
        '支付宝收款码：长按保存图片 → 支付宝扫码支付' 
      }}
    </p>
  </div>

  <!-- 按钮区域（仅保留手动确认支付） -->
  <div class="flex justify-center gap-6 pt-4 border-t border-slate-100">
    <!-- 支付成功状态：只显示完成按钮 -->
    <el-button 
      v-if="paySuccess"
      type="success"
      @click="showPayModal = false; paySuccess = false"
      class="next-btn min-w-[120px]"
    >
      完成
    </el-button>

    <!-- 未支付成功，显示放弃+确认支付 -->
    <template v-else>
      <el-button @click="cancelPay" class="prev-btn min-w-[120px]">
        <ArrowLeftIcon class="mr-1 w-4 h-4" />
        放弃支付
      </el-button>

      <el-button 
        type="primary" 
        @click="confirmPay()" 
        class="next-btn min-w-[120px]" 
        :loading="payLoading"
      >
        确认支付
        <ArrowRightIcon class="ml-1 w-4 h-4" />
      </el-button>
    </template>
  </div>
</el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import Logo from '../component/Logo.vue';
import { MerchantApi } from '../api/Merchant/MerchantApi';
import type { FormInstance, FormRules, UploadFile } from 'element-plus';
import { UploadApi } from '../api/Upload/UploadApi';

// 新增：提交成功标识
const submitSuccess = ref(false);


// 滚动进度（匹配首页）
const scrollProgress = ref(0);

// 定义表单类型接口
interface MerchantForm {
  userId: number;
  merchantName: string;
  merchantType: number;
  legalPerson: string;
  idCardNo: string;
  idCardFrontUrl: string;
  idCardBackUrl: string;
  businessLicenseUrl: string;
  businessLicenseNo: string;
  contactPhone: string;
  contactEmail: string;
  bankName: string;
  bankAccountNo: string;
  bankAccountName: string;
  contactName: string;
  agree: boolean;
  businessScope: string;
  industryType: string;
  depositAmount: number;
  idCardFrontFile?: File;
  idCardBackFile?: File;
  businessLicenseFile?: File;
}

// 响应式数据
const currentStep = ref(0);
const loading = ref(false);
const merchantFormRef = ref<FormInstance>();
const showPayModal = ref(false);
const selectedPayType = ref('wechat');
const payLoading = ref(false);
const merchantId = ref('');
const showQrCode = ref(false);

// 表单数据初始化
const form:any = reactive<MerchantForm>({
  userId: 1,
  merchantName: '',
  merchantType: 0,
  legalPerson: '',
  idCardNo: '',
  idCardFrontUrl: '',
  idCardBackUrl: '',
  businessLicenseUrl: '',
  businessLicenseNo: '',
  contactPhone: '',
  contactEmail: '',
  bankName: 'xxx',
  bankAccountNo: '',
  bankAccountName: '',
  agree: false,
  businessScope: '',
  industryType: '',
  contactName: 'xxx',
  depositAmount: 10000.00,
  idCardFrontFile: undefined,
  idCardBackFile: undefined,
  businessLicenseFile: undefined
});

// 表单验证规则
const rules = reactive<FormRules>({
  merchantName: [
    { required: true, message: '请输入商家全称', trigger: 'blur' },
    { min: 2, max: 100, message: '商家名称长度应在2-100个字符之间', trigger: 'blur' }
  ],
  merchantType: [
    { required: true, message: '请选择商家类型', trigger: 'change' },
    { type: 'number', message: '商家类型必须为数字', trigger: 'change' }
  ],
  legalPerson: [
    { required: true, message: '请输入法人姓名', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5]{2,4}$/, message: '请输入真实的法人姓名（2-4个中文字符）', trigger: 'blur' }
  ],
  idCardNo: [
    { required: true, message: '请输入身份证号码', trigger: 'blur' },
    { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的18位身份证号码', trigger: 'blur' }
  ],
  contactPhone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  contactEmail: [
    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  businessScope: [
    { required: true, message: '请填写经营范围', trigger: 'blur' },
    { min: 5, max: 500, message: '经营范围长度应在5-500个字符之间', trigger: 'blur' }
  ],
  industryType: [
    { required: true, message: '请选择行业类型', trigger: 'change' }
  ],
  depositAmount: [
    { required: true, message: '请输入保证金金额', trigger: 'blur' },
    { type: 'number', message: '保证金金额必须为数字', trigger: 'blur' }
  ],
  businessLicenseNo: [
    { required: true, message: '请输入营业执照号/统一社会信用代码', trigger: 'blur' },
    { pattern: /^[0-9A-Z]{18}$/, message: '统一社会信用代码应为18位字符', trigger: 'blur' }
  ],
  idCardFrontUrl: [
    { required: true, message: '请上传身份证正面照片', trigger: 'change' }
  ],
  idCardBackUrl: [
    { required: true, message: '请上传身份证反面照片', trigger: 'change' }
  ],
  businessLicenseUrl: [
    { required: true, message: '请上传营业执照照片', trigger: 'change' }
  ],
  bankName: [
    { required: true, message: '请输入开户银行', trigger: 'blur' }
  ],
  bankAccountNo: [
    { required: true, message: '请输入银行账号', trigger: 'blur' },
    { pattern: /^\d{16,19}$/, message: '银行卡号应为16-19位数字', trigger: 'blur' }
  ],
  bankAccountName: [
    { required: true, message: '请输入账户名', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '账户名只能包含中文和字母', trigger: 'blur' }
  ],
  agree: [
    { required: true, message: '请同意商户服务协议和隐私政策', trigger: 'change' }
  ]
});

// 滚动处理（匹配首页）
const handleScroll = () => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = (window.scrollY / totalHeight) * 100;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // 页面加载完成后给表单添加入场动画
  setTimeout(() => {
    document.querySelectorAll('.form-item').forEach((item, index) => {
      (item as HTMLElement).style.animation = `fadeInUp 0.5s ease-out ${0.1 * index}s forwards`;
    });
  }, 300);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});



// 图片上传前置校验
const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('只能上传图片格式文件！');
    return false;
  }

  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    ElMessage.error('上传图片大小不能超过5MB！');
    return false;
  }

  return false;
};

// 文件上传处理
const handleFileUpload = (file: UploadFile,fieldName: string) => {
  if (file.raw) {
    // 保存文件对象
    if (fieldName === 'idCardFrontUrl') {
      form.idCardFrontFile = file.raw;
    } else if (fieldName === 'idCardBackUrl') {
      form.idCardBackFile = file.raw;
    } else if (fieldName === 'businessLicenseUrl') {
      form.businessLicenseFile = file.raw;
    }

    // 转换为base64用于预览
    const reader = new FileReader();
    reader.onload = (e) => {
      form[fieldName] = e.target?.result as string;
      // 上传成功提示
      ElMessage.success('图片上传成功！');
    };
    reader.readAsDataURL(file.raw);
  }
};
const uploadWithField = (fieldName: string) => {
  return (file: UploadFile) => {
    handleFileUpload(file, fieldName);
  };
};

// 商家类型变更处理（增强交互）
const onMerchantTypeChange = (value: number) => {
  // 根据商家类型自动调整保证金金额
  if (value === 1) { // 个体工商户
    form.depositAmount = 5000.00;
  } else if (value === 2) { // 企业商户
    form.depositAmount = 10000.00;
  } else if (value === 3) { // 品牌旗舰店
    form.depositAmount = 20000.00;
  }
  ElMessage.info(`已切换为${value === 1 ? '个体工商户' : value === 2 ? '企业商户' : '品牌旗舰店'}，保证金已自动调整为¥${form.depositAmount}`);
};

// 跳转到指定步骤（增强交互）
const jumpToStep = (index: number) => {
  if (index > currentStep.value) {
    ElMessage.warning('请按步骤完成表单填写');
    return;
  }
  currentStep.value = index;
};

// 步骤切换 - 下一步
const nextStep = async () => {
  let isValid = true;
  const formRef = merchantFormRef.value;
  
  if (!formRef) return;

  try {
    if (currentStep.value === 0) {
      await formRef.validateField([
        'merchantName', 'merchantType', 'legalPerson', 
        'idCardNo', 'contactPhone', 'contactEmail',
        'businessScope', 'industryType', 'depositAmount'
      ]);
    } else if (currentStep.value === 1) {
      await formRef.validateField([
        'businessLicenseNo', 'idCardFrontUrl', 
        'idCardBackUrl', 'businessLicenseUrl'
      ]);
    }

    // 步骤切换动画
    currentStep.value++;
    ElMessage.success('已完成当前步骤，进入下一步');
  } catch (error) {
    isValid = false;
    ElMessage.warning('请先完成当前步骤的必填项');
  }
};

// 步骤切换 - 上一步
const prevStep = () => {
  currentStep.value--;
};

// 提交表单
const handleSubmit = async () => {
  const formRef = merchantFormRef.value;
  if (!formRef) return;

  try {
    await formRef.validate();
    loading.value = true;

    // 上传图片
    let idCardFrontPath = '';
    let idCardBackPath = '';
    let businessLicensePath = '';

    try {
      if (form.idCardFrontFile && form.idCardBackFile) {
        const idCardFormData = new FormData();
        idCardFormData.append('files', form.idCardFrontFile);
        idCardFormData.append('files', form.idCardBackFile);
        
        const idCardUploadRes = await UploadApi.Uploads('productImgs', idCardFormData);
        if (idCardUploadRes.data && idCardUploadRes.data.length >= 2) {
          idCardFrontPath = idCardUploadRes.data[0];
          idCardBackPath = idCardUploadRes.data[1];
        }
      }

      if (form.businessLicenseFile) {
        const licenseFormData = new FormData();
        licenseFormData.append('file', form.businessLicenseFile);
        
        const licenseUploadRes = await UploadApi.Upload('productImg', licenseFormData);
        businessLicensePath = licenseUploadRes.data;
      }

      // 构建提交数据
      const merchantDto = {
        userId: form.userId,
        merchantName: form.merchantName,
        merchantType: form.merchantType,
        legalPerson: form.legalPerson,
        idCardNo: form.idCardNo,
        idCardFrontUrl: idCardFrontPath,
        idCardBackUrl: idCardBackPath,
        businessLicenseUrl: businessLicensePath,
        businessLicenseNo: form.businessLicenseNo,
        contactPhone: form.contactPhone,
        contactEmail: form.contactEmail,
        bankName: form.bankName,
        contactName: form.contactName,
        bankAccountNo: form.bankAccountNo,
        bankAccountName: form.bankAccountName,
        businessScope: form.businessScope,
        industryType: form.industryType,
        depositAmount: Number(form.depositAmount)
      };

      // 提交表单
      const registerRes = await MerchantApi.RegisterMerchant(merchantDto);
      merchantId.value = registerRes.data?.merchantId || '';
      submitSuccess.value = true; // 新增：标记提交成功

      loading.value = false;
      showPayModal.value = true;
      ElMessage.success('表单提交成功，请完成保证金支付');

    } catch (uploadError) {
      loading.value = false;
      ElMessage.error('图片上传失败，请稍后重试');
      console.error('图片上传错误：', uploadError);
    }

  } catch (validateError) {
    loading.value = false;
    ElMessage.error('表单填写有误，请检查后重新提交');
    console.error('表单验证错误：', validateError);
  }
};
const paySuccess = ref(false); // 支付成功标记
const payedMerchantId = ref(''); // 支付成功的商户编号
// 取消支付
const cancelPay = () => {
  ElMessageBox.confirm(
    '确定要放弃支付吗？放弃后您的入驻申请将暂停处理',
    '提示',
    {
      confirmButtonText: '确认放弃',
      cancelButtonText: '继续支付',
      type: 'warning'
    }
  ).then(() => {
    showPayModal.value = false;
    paySuccess.value = false; // 重置支付状态
    ElMessage.info('您已放弃支付，可在商户中心继续完成支付');
  }).catch(() => {});
};


const confirmPay = async () => {
  payLoading.value = true;
  try {
    // 调用后端确认支付接口（携带支付方式）
    // 替换为你的真实接口
    const payData = {
      merchantId: merchantId.value,
      amount: form.depositAmount,
      payType: selectedPayType.value // 携带选中的支付方式（wechat/alipay）
    };
    
    await MerchantApi.PayDeposit(form.depositAmount);

    paySuccess.value = true;
    payedMerchantId.value = merchantId.value;
    ElMessage.success(`已确认${selectedPayType.value === 'wechat' ? '微信' : '支付宝'}支付完成，入驻流程完成！`);
    
    // 延时关闭弹窗
    setTimeout(() => {
      showPayModal.value = false;
      paySuccess.value = false; // 重置状态
    }, 1500);

  } catch (error) {
    ElMessage.error('支付确认失败，请重试或联系客服');
    console.error('手动确认支付错误：', error);
  } finally {
    payLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
/* ========== 基础动画定义 ========== */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-left {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes pulse-once {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.animate-fade-in-left { animation: fade-in-left 0.6s ease-out forwards; }
.animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
.animate-pulse-once { animation: pulse-once 1.5s ease-out; }

/* ========== 第一步：基础可见性保障（优先级最高） ========== */
/* 重置盒模型，避免尺寸塌陷 */
:deep(*) {
  box-sizing: border-box !important;
}

/* 表单容器 */
.el-form {
  width: 100%;
}

/* 输入框/下拉框容器 - 基础可见（必保留） */
:deep(.el-input__wrapper) {
  background: #ffffff !important; /* 纯白背景，绝对可见 */
  border: 1px solid #e0e0e0 !important; /* 浅灰边框，清晰轮廓 */
  border-radius: 12px !important;
  height: 50px !important; /* 固定高度，不塌陷 */
  width: 100% !important; /* 宽度100%，占满容器 */
  padding: 0 16px !important;
  margin-bottom: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; /* 顺滑过渡 */
}

/* 文本域单独适配 */
:deep(.el-textarea__wrapper) {
  background: #ffffff !important;
  border: 1px solid #e0e0e0 !important;
  border-radius: 12px !important;
  min-height: 120px !important;
  width: 100% !important;
  padding: 12px 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* 输入框文字 - 高对比度 */
:deep(.el-input__inner),
:deep(.el-textarea__inner) {
  color: #1a1a1a !important; /* 深黑文字，清晰可读 */
  font-size: 15px !important;
  line-height: 48px !important;
  background: transparent !important;
}

/* 占位符文字 */
:deep(.el-input__inner::placeholder),
:deep(.el-textarea__inner::placeholder) {
  color: #999999 !important; /* 浅灰占位符，不刺眼 */
  font-size: 14px !important;
}

/* 表单标签 */
:deep(.el-form-item__label) {
  color: #1a1a1a !important; /* 黑色标签 */
  font-size: 14px !important;
  font-weight: 600 !important;
  margin-bottom: 8px !important;
  display: block !important;
}

/* ========== 第二步：优雅交互效果（叠加在可见基础上） ========== */
/* 1. 输入框hover效果 */
:deep(.el-input__wrapper:hover) {
  border-color: #93c5fd !important; /* 浅蓝边框，反馈明显 */
  box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.2) !important; /* 微光效 */
  transform: translateY(-1px) !important; /* 轻微上浮 */
}

/* 2. 输入框聚焦效果（核心交互） */
:deep(.el-input__wrapper.is-focus) {
  border-color: #4f46e5 !important; /* 主色边框 */
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15) !important; /* 主色光晕 */
  background: #fefeff !important; /* 极浅白，区分hover */
  transform: translateY(-2px) !important; /* 明显上浮 */
}

/* 3. 文本域hover/focus同步交互 */
:deep(.el-textarea__wrapper:hover) {
  border-color: #93c5fd !important;
  box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.2) !important;
}
:deep(.el-textarea__wrapper.is-focus) {
  border-color: #4f46e5 !important;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15) !important;
}

/* 4. 按钮交互（可见+动效） */
:deep(.el-button) {
  height: 50px !important;
  padding: 0 24px !important;
  border-radius: 12px !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  margin: 8px 4px !important;
}

/* 下一步主按钮 */
.next-btn {
  background: #4f46e5 !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2) !important;
}
.next-btn:hover {
  background: #4338ca !important; /* 深一点的主色 */
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3) !important; /* 更大阴影 */
  transform: translateY(-2px) !important; /* 上浮 */
}
.next-btn:active {
  transform: translateY(0) scale(0.98) !important; /* 点击收缩 */
}

/* 上一步次要按钮 */
.prev-btn {
  background: #f5f5f5 !important;
  color: #333 !important;
  border: 1px solid #e0e0e0 !important;
}
.prev-btn:hover {
  background: #f0f0f0 !important;
  border-color: #93c5fd !important;
  transform: translateY(-2px) !important;
}
.prev-btn:active {
  transform: translateY(0) scale(0.98) !important;
}

/* 5. 上传卡片交互（可见+动效） */
.upload-card {
  width: 100%;
  height: 200px !important; /* 固定高度，可见 */
  border: 2px dashed #e0e0e0 !important; /* 虚线边框，清晰 */
  background: white !important;
  border-radius: 12px !important;
  margin-bottom: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: hidden;
}
.upload-card:hover {
  border-color: #4f46e5 !important; /* 主色边框 */
  background: #f8f9ff !important; /* 极浅主色背景 */
  transform: translateY(-4px) !important; /* 明显上浮 */
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.1) !important; /* 阴影 */
}
.upload-trigger {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666 !important;
  font-size: 14px;
}
.upload-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease !important;
}
.upload-img:hover {
  transform: scale(1.03) !important; /* 图片hover放大 */
}

/* 6. 步骤条交互 */
div[class*="w-12 h-12 rounded-xl"] {
  transition: all 0.3s ease !important;
  cursor: pointer;
}
div[class*="w-12 h-12 rounded-xl"]:hover {
  transform: scale(1.1) !important; /* 步骤节点hover放大 */
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
}

/* ========== 新增：高级样式 ========== */
/* 支付弹窗样式 */
:deep(.pay-modal) {
  .el-dialog {
    border-radius: 20px !important;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1) !important;
    border: 1px solid #f0f0f0 !important;
    overflow: hidden;
  }
  
  .el-dialog__body {
    padding: 0 30px 30px !important;
  }
  
  .el-dialog__header {
    display: none !important;
  }
}

:deep(.pay-modal-overlay) {
  background: rgba(0,0,0,0.5) !important;
  backdrop-filter: blur(8px) !important;
}

/* 入驻优势卡片 */
.bg-indigo-50 { background-color: #EEF2FF !important; }
.bg-green-50 { background-color: #F0FDF4 !important; }
.bg-blue-50 { background-color: #EFF6FF !important; }
.text-indigo-600 { color: #4F46E5 !important; }
.text-green-500 { color: #22C55E !important; }
.text-blue-500 { color: #3B82F6 !important; }
.text-indigo-800 { color: #3730A3 !important; }
.text-green-600 { color: #16A34A !important; }

/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>