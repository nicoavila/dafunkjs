<template>
  <div class="p-4 rounded-lg bg-white shadow">
    <span>BPM: {{ formatBPM(config.getBPM) }}</span>
    <input type="range" min="80" max="200" step="1" :value="config.getBPM" @change="changeBPM($event)">
    <div id="sequencerContainer" class="flex gap-2">
      <button class="bg-sky-500 px-3 py-2 rounded-md text-white inline-flex" @click="play()">
        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 18V6l8 6-8 6Z"/>
        </svg>
        <span>Play Song</span>
      </button>
      <button class="bg-sky-500 px-3 py-2 rounded-md text-white inline-flex" @click="pause()">
        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6H8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 0h-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z"/>
        </svg>
        <span>Pause Song</span>
      </button>
      <button class="bg-sky-500 px-3 py-2 rounded-md text-white inline-flex" @click="stop()">
        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect width="12" height="12" x="6" y="6" stroke="currentColor" stroke-linejoin="round" stroke-width="2" rx="1"/>
        </svg>
        <span>Stop Song</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as Tone from 'tone'
  import type { Instrument } from '~/interfaces/instrument'
  import { useConfigStore } from '~/stores/config';
  const config = useConfigStore();

  const instruments: Instrument[] = [];

  /**
   * Starts the transport
   * @return void
   */
  const play = async () => {
    await Tone.start();
    console.log('Play song');
    config.initTransport();
    config.startTransport();
  };

  /**
   * Pauses the transport
   * @return void
   */
  const pause = () => {
    console.log('Pause song...');
    config.pauseTransport();
  };

  /**
   * Stop the transport
   * @return void
   */
  const stop = () => {
    console.log('Stop song :(');
    config.stopTransport();
  };

  /**
   * Change BPM
   * @param {Event} e native event
   * @return void
   */
  const changeBPM = (e: Event) => {
    const target = e.target as HTMLInputElement;
    config.setBPM(parseInt(target.value));
  };

  /**
   * Formats the BPM to show to end user
   * @param {number} bpm BPM value
   * @return number
   */
  const formatBPM = (bpm: number): number => {
    return Math.round(bpm);
  };
</script>

<style>

</style>