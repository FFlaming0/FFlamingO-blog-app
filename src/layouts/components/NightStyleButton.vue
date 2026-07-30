<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(false)
// 切换状态
const toggleActive = () => {
  isActive.value = !isActive.value
}
</script>

<template>
  <button-block
    id="night-style-btn"
    :class="{ active: isActive }"
    @click="toggleActive"
  ></button-block>
</template>

<style scoped>
button-block {
  position: relative;
  width: 55px; /* 220 * 0.25 */
  height: 22px; /* 90 * 0.25 ≈ 22.5，取整为22 */
  background:
    radial-gradient(circle at 18% 5px, #fff, #fff 1.5px, transparent 1.75px, transparent),
    radial-gradient(circle at 35% 11.25px, #fff, #fff 0.25px, transparent 0.5px, transparent),
    radial-gradient(circle at 10% 17.5px, #fff, #fff 0.625px, transparent 0.875px, transparent),
    radial-gradient(circle at 25% 3.75px, #fff, #fff 0.75px, transparent 1px, transparent),
    radial-gradient(circle at 15% 12.5px, #fff, #fff 0.375px, transparent 0.625px, transparent),
    radial-gradient(circle at 30% 18.75px, #fff, #fff 1.25px, transparent 1.5px, transparent),
    radial-gradient(circle at 5% 7.5px, #fff, #fff 0.125px, transparent 0.375px, transparent),
    radial-gradient(circle at 25% 15px, #fff, #fff 0.125px, transparent 0.375px, transparent),
    radial-gradient(circle at 7% 8.75px, #fff, #fff 0.125px, transparent 0.375px, transparent),
    linear-gradient(90deg, #2b303e, #2b303e 50%, #5a81b4 50%, #5a81b4);
  background-repeat: no-repeat;
  background-size: 200% 100%;
  background-position: 100% 0;
  border-radius: 22px; /* 90 * 0.25 = 22.5，取整22 */
  box-shadow:
    0 -0.75px 1px #999,
    inset 0 0.75px 1.25px #333,
    0 1px 1px #ffe,
    inset 0 -0.75px 1.25px #ddd;
  cursor: pointer;
  overflow: hidden;
  transition: 0.5s all;
}
button-block::before,
button-block::after {
  content: '';
  position: absolute;
  transition: 0.5s all;
}
button-block::before {
  width: 18.75px; /* 75 * 0.25 */
  height: 18.75px;
  border-radius: 50%;
  background: #e9cb50;
  inset: 1.875px; /* 7.5 * 0.25 */
  box-shadow:
    0 0 1.25px #333,
    inset 0.5px 0.5px 0.75px #f8f4e4,
    inset -0.5px -0.5px 0.75px #665613;
  z-index: 1;
}
button-block::after {
  width: 17.5px; /* 70 * 0.25 */
  height: 17.5px;
  inset: 2.5px; /* 10 * 0.25 */
  border-radius: 50%;
  box-shadow:
    2.5px 15px 0 2.5px #fff,
    16.25px 15px 0 1.25px #fff,
    23.75px 17.5px 0 2.5px #fff,
    33.75px 11.25px 0 1.25px #fff,
    42.5px 8.75px 0 2.5px #fff,
    48.75px -1.25px 0 2.5px #fff,
    -2.5px 0 0 12.5px rgba(255, 255, 255, 0.2),
    3.75px 0 0 12.5px rgba(255, 255, 255, 0.15),
    10px 0 0 12.5px rgba(255, 255, 255, 0.21),
    2.5px 10px 0 2.5px #abc1d9,
    17.5px 8.75px 0 2.5px #abc1d9,
    23.75px 10px 0 2.5px #abc1d9,
    33.75px 5px 0 2.5px #abc1d9,
    38.75px 3.75px 0 2.5px #abc1d9,
    47.5px -5px 0 2.5px #abc1d9;
}
button-block:hover::before {
  filter: contrast(90%) brightness(110%);
  scale: 1.05;
}
button-block.active {
  background-position: 0 0;
}
button-block.active::before {
  translate: 32.5px; /* 130 * 0.25 */
  background:
    radial-gradient(circle at 50% 5px, #939aa5, #939aa5 3.25px, transparent 3.5px, transparent),
    radial-gradient(circle at 35% 11.25px, #939aa5, #939aa5 5.75px, transparent 6px, transparent),
    radial-gradient(circle at 72% 12.5px, #939aa5, #939aa5 4.25px, transparent 4.5px, transparent),
    radial-gradient(#cbcdda, #cbcdda);
}
button-block.active::after {
  transform: translate(32.5px);
  box-shadow:
    2.5px 15px 0 2.5px transparent,
    16.25px 15px 0 1.25px transparent,
    23.75px 17.5px 0 2.5px transparent,
    33.75px 11.25px 0 1.25px transparent,
    42.5px 8.75px 0 2.5px transparent,
    48.75px -1.25px 0 2.5px transparent,
    2.5px 0 0 12.5px rgba(255, 255, 255, 0.2),
    -3.75px 0 0 12.5px rgba(255, 255, 255, 0.15),
    -10px 0 0 12.5px rgba(255, 255, 255, 0.21),
    2.5px 10px 0 2.5px transparent,
    17.5px 8.75px 0 2.5px transparent,
    23.75px 10px 0 2.5px transparent,
    33.75px 5px 0 2.5px transparent,
    38.75px 3.75px 0 2.5px transparent,
    47.5px -5px 0 2.5px transparent;
}
</style>
