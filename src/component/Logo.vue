<template>
  <!-- 3D 品牌 Logo 独立组件（仅优化环形，适配无边商城风格） -->
  <div class="logo-wrapper" :class="{ 'active': isActive }">
    <div class="void-ring">
      <div class="ring-core"></div>
      <div class="ring-glow"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Logo' // 组件名，可选
});
</script>
<script setup lang="ts">
    
// 定义属性：控制 Logo 是否激活（显示动画）
const props = defineProps({
  isActive: {
    type: Boolean,
    default: true
  }
});

// 可选：定义事件（如需对外暴露交互）
const emit = defineEmits(['logoClick']);
</script>

<style scoped>
/* --- 仅优化环形，保留原始结构 --- */
.logo-wrapper {
  opacity: 0;
  transform: scale(0.5);
  transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-bottom: 0;
  display: inline-block;
  cursor: pointer;
}

.logo-wrapper.active { 
  opacity: 1; 
  transform: scale(1); 
}

/* 环形容器：优化透视+悬浮动效 */
.void-ring {
  width: 50px;
  height: 50px;
  position: relative;
  perspective: 1000px; /* 增强3D立体感 */
  display: flex;
  align-items: center;
  justify-content: center;
  /* 页面同款悬浮动效，更柔和 */
  animation: float 6s ease-in-out infinite;
}

/* 核心环形：仅优化配色+质感，无额外元素 */
.ring-core {
  width: 100%;
  height: 100%;
  border: 4px solid transparent; /* 透明底，突出渐变 */
  border-radius: 50%;
  /* 页面主色渐变：靛蓝→浅蓝，模拟金属质感 */
  border-top: 4px solid #4F46E5; /* 页面主靛蓝 */
  border-bottom: 4px solid #38BDF8; /* 页面辅助浅蓝 */
  border-left: 4px solid #6366F1; /* 过渡色，更自然 */
  border-right: 4px solid #818CF8; /* 过渡色 */
  /* 优化旋转：更顺滑，3D感更强 */
  animation: rotate3d 8s infinite linear;
  /* 内阴影增强质感，不添加额外元素 */
  box-shadow: inset 0 0 8px rgba(79, 70, 229, 0.15);
  /* 轻微渐变背景，提升高级感 */
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.03), rgba(56, 189, 248, 0.03));
}

/* 光晕层：仅优化配色+柔和度 */
.ring-glow {
  position: absolute;
  top: -4px; 
  left: -4px; 
  width: calc(100% + 8px); 
  height: calc(100% + 8px);
  border-radius: 50%;
  /* 页面同款光晕，更自然不刺眼 */
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.2), 
              0 0 10px rgba(56, 189, 248, 0.1),
              inset 0 0 8px rgba(79, 70, 229, 0.08);
  /* 呼吸动画，增强层次感 */
  animation: glow-pulse 4s ease-in-out infinite;
}

/* 3D旋转动画：优化节奏，更高级 */
@keyframes rotate3d {
  0% { transform: rotateY(0deg) rotateX(0deg); }
  100% { transform: rotateY(360deg) rotateX(360deg); }
}

/* 悬浮动画：和页面元素统一 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}

/* 光晕呼吸：柔和不突兀 */
@keyframes glow-pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

/* 交互效果：和页面按钮一致 */
.logo-wrapper:hover .void-ring {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.logo-wrapper:active .void-ring {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}
</style>