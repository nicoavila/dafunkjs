<template>
  <ClientOnly>
    <div>
      <h1 class="text-2xl font-bold">Sampler ({{ props.name }})</h1>
      <input type="checkbox" :checked="active" @change="activateInstrument($event)">
      <div>
        <span>{{ instrumentVolume }} dB</span>
        <input type="range" min="-50" max="0" @change="changeVolume($event)">
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import * as Tone from "tone";

  const active = ref<boolean>(true);
  const instrumentVolume = ref<number>(0);
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
    volume: {
      type: Number,
      default: 0
    }
  })
  
  // Sampler
  const sampler = new Tone.Sampler({
    'G6': props.sampleName
  }).toDestination();
  sampler.set({
    attack: 0.1,
    release: 1,
    volume: props.volume
  })

  onMounted(() => {
    instrumentVolume.value = props.volume;

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

  const changeVolume = (event: Event) => {
    instrumentVolume.value = parseInt((event.target as HTMLInputElement).value);
    sampler.set({ volume: instrumentVolume.value });
  }
</script>

<style>

</style>