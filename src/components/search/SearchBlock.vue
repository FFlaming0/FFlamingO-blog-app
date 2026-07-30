<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

// 双向绑定搜索关键词
const keyword = defineModel<string>()

// 覆盖层显示状态
const showOverlay = ref(false)

// 打开搜索覆盖层
function openSearch() {
  showOverlay.value = true
  nextTick(() => {
    const input = document.querySelector('.search-input') as HTMLInputElement
    input?.focus()
  })
}

// 关闭覆盖层
function closeSearch() {
  showOverlay.value = false
}

// 清除关键词
function clearKeyword() {
  keyword.value = ''
}

// 键盘事件：按 ESC 关闭
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && showOverlay.value) {
    closeSearch()
  }
}

// 监听覆盖层状态，动态添加/移除键盘监听，并锁定滚动
watch(showOverlay, (val) => {
  if (val) {
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <!-- 触发按钮 -->
  <button class="search-trigger" @click="openSearch" aria-label="搜索">
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  </button>

  <!-- 覆盖层 + 扩散动画 -->
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="showOverlay" class="overlay">
        <!-- 关闭按钮 -->
        <button class="close-btn" @click="closeSearch">✕</button>
        <div class="search-container">
          <!-- 搜索框 -->
          <div class="search-bar">
            <span class="search-icon">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="#999"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </span>
            <input
              v-model="keyword"
              type="text"
              placeholder="想要找点什么呢？"
              class="search-input"
            />
            <span v-if="keyword" class="clear-btn" @click="clearKeyword">✕</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ===== 触发按钮 ===== */
.search-trigger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}
.search-trigger:hover {
  color: var(--secondary);
}

/* ===== 覆盖层 ===== */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fffaffb3;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* ===== Transition 动画：中心扩散 ===== */
/* 进入动画：从中心向外放大并淡入 */
.overlay-enter-active {
  animation: overlayIn 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
/* 离开动画：向中心收缩并淡出 */
/* .overlay-leave-active {
  animation: overlayOut 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
} */

@keyframes overlayIn {
  0% {
    opacity: 0;
    transform: scale(0.7); /* 从较小开始，中心扩散 */
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes overlayOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

/* ===== 搜索容器 ===== */
.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin-top: 10%;
  /* 如需上移，可在此添加 margin-top: -10vh; */
}

/* ===== 搜索框 ===== */
.search-bar {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 16px 50px 16px 50px;
  border: none;
  border-radius: 60px;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  outline: none;
  transition:
    box-shadow 0.3s,
    background 0.3s;
}
.search-input:focus {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
}
.search-input::placeholder {
  color: #aaa;
  font-weight: 300;
}

.clear-btn {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #aaa;
  font-size: 22px;
  user-select: none;
  transition: color 0.2s;
}
.clear-btn:hover {
  color: #333;
}

/* ===== 关闭按钮 ===== */
.close-btn {
  position: absolute;
  top: -60px;
  right: 0;
  background: none;
  border: none;
  color: rgba(0, 0, 0, 0.5);
  font-size: 32px;
  cursor: pointer;
  padding: 4px 8px;
  transition:
    color 0.2s,
    transform 0.2s;
}
.close-btn:hover {
  color: #000;
  transform: scale(1.1);
}

/* ===== 响应式 ===== */
@media (max-width: 640px) {
  .search-container {
    width: 95%;
  }
  .search-input {
    font-size: 16px;
    padding: 14px 45px 14px 45px;
  }
  .close-btn {
    top: -50px;
    font-size: 28px;
  }
}
</style>
