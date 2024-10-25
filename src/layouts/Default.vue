<template>
  <div :data-theme="theme">
    <div class="navbar fixed bg-base-100 z-40 shadow-sm">
      <div class="navbar-start">
        <a class="btn btn-ghost md:text-xl">北九州楓葉之旅</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <!-- TODO: You can add menu here -->
      </div>
      
    </div>
    <slot />
    <footer class="footer footer-center mt-4">
      <div>
        
       
        <p>Copyright © {{new Date().getFullYear()}} - billxu</p>
      </div>
      <div>
        <div class="grid grid-flow-col gap-4">
          <a href="https://github.com/billxu0521" target="_blank">
            <i class="lab la-github text-4xl"></i>
          </a>

        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
const THEMES = [

  'autumn',

];
export default {
  setup () {
    const theme = ref(null);
    watch(theme, (value) => {
      localStorage.setItem('daisyui-theme', value);
    });
    onMounted(() => {
      theme.value = localStorage.getItem('daisyui-theme') || 'dark';
    });
    return {
      theme,
      themes: THEMES,
    };
  },
};
</script>
