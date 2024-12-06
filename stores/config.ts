import { defineStore } from 'pinia'
import * as Tone from 'tone'
import type { Time } from 'tone/build/esm/core/type/Units';

export const useConfigStore = defineStore({
  id: 'configStore',
  state: () => {
    const transport = Tone.getTransport();
    transport.bpm.value = 111;
    return {
      numerOfNotes: 16,
      currentStep: 0,
      position: '',
      transport: transport,
      destination: Tone.getDestination()
    }
  },
  actions: {
    initTransport() {
      this.transport.bpm.value = 111;
    },
    startTransport() {
      this.transport.start()
    },
    pauseTransport() {
      this.transport.pause()
    },
    stopTransport() {
      this.transport.stop()
    },
    setBPM(bpm: number) {
      this.transport.bpm.value = bpm
    }
  },
  getters: {
    getBPM(): number {
      return this.transport.bpm.value
    },
    getToneTransport(): any {
      return this.transport
    },
    getToneTransportStatus(): string {
      return this.transport.state;
    }
  }
});
