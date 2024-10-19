<template>
  BPM: {{ config.getBPM }}
  <input type="range" min="80" max="200" step="1" :value="config.getBPM" @change="changeBPM($event)">
  <div id="sequencerContainer" class="flex gap-2">
    <button class="bg-sky-500 px-3 py-2 rounded-md text-white" @click="play()">Play Song</button>
    <button class="bg-sky-500 px-3 py-2 rounded-md text-white" @click="pause()">Pause Song</button>
    <button class="bg-sky-500 px-3 py-2 rounded-md text-white" @click="stop()">Stop Song</button>
  </div>
</template>

<script lang="ts" setup>
  import * as Tone from 'tone'
  import type { Instrument } from '~/interfaces/instrument'
  import { useConfigStore } from '~/stores/config';
  const config = useConfigStore();

  const instruments: Instrument[] = [];

  const play = async () => {
    await Tone.start();
    console.log('play');
    config.initTransport();
    config.startTransport();
  };

  const pause = () => {
    console.log('pause');
    config.pauseTransport();
  };

  const stop = () => {
    console.log('stop');
    config.stopTransport();
  };

  const changeBPM = (e: Event) => {
    const target = e.target as HTMLInputElement;
    config.setBPM(parseInt(target.value));
  };
</script>

<style>

</style>