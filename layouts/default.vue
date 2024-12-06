<template>
  <div class="flex bg-slate-200 h-screen">
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  useHead({ title: 'DaFunk JS' });

  onMounted(() => {
    window.addEventListener('keydown', handleKeypress);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeypress);
  });

  const handleKeypress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'q':
      case 'Q':
        console.log('Key "q" pressed. Toggle "Main Lead"');
        // Add your logic here
        break;

      case 'w':
      case 'W':
        console.log('Key "w" pressed. Toggle "Hit Sampler"');
        // Add your logic here
        break;
      
      case 'e':
      case 'E':
        console.log('Key "e" pressed. Toggle "Kick Sampler"');
        // Add your logic here
        break;
      
      case 'r':
      case 'R':
        console.log('Key "r" pressed. Toggle "Bass Sampler"');
        // Add your logic here
        break;
      
      case 't':
      case 'T':
        console.log('Key "t" pressed. Toggle "Drums Sampler"');
        // Add your logic here
        break;
      
      case 'y':
      case 'Y':
        console.log('Key "y" pressed');
        // Add your logic here
        break;
      default:
        break;
    }
  };
</script>

<style>

</style>