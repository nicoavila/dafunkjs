import { defineStore } from 'pinia'
import * as Tone from 'tone'

export const useConfigStore = defineStore({
  id: 'configStore',
  state: () => {
    const transport = Tone.getTransport();
    transport.bpm.value = 111;
    return {
      transport,
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
