<template>
  <ClientOnly>
    <div>
      <h1 class="text-2xl font-bold">Sampler ({{ props.name }})</h1>
      <input type="checkbox" :checked="active" @change="activateInstrument($event)">
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import * as Tone from "tone";

  const active = ref<boolean>(true);
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    sampleName: {
      type: String,
      required: true
    },
    sequence: {
      type: Array<{
        note: String,
        duration: String,
        time: String
      }>,
      required: true
    },
  })
  
  // Sampler
  const sampler = new Tone.Sampler({
    'G6': props.sampleName
  }).toDestination();
  sampler.set({
    attack: 0.1,
    release: 1,
    volume: 0
  })

  onMounted(() => {

    // Sequence
    const pattern = new Tone.Part((time, event) => {
      sampler.triggerAttackRelease(event.note, event.duration, time)
    }, props.sequence);
    pattern.loop = true;
    pattern.start(0);
  });

  const activateInstrument = (event: Event) => {
    active.value = !active.value;
    if (!active.value) {
      sampler.disconnect();
    } else {
      sampler.toDestination();
    }
  }
</script>

<style>

</style>