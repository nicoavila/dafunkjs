<template>
  <ClientOnly>
    <div>
      <h1 class="text-2xl font-bold">Bassline</h1>
      <input type="checkbox">
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import * as Tone from "tone";

  onMounted(() => {
    const notes = [
      'A#2', 
      "F2",
      "D2",
      "C2",
      "A#2", 
      "G2", 
      "F#2", 
      "G#2", 
      "A#2",
      "A2", 
      "C2",
      "D3", 
      "G2", 
      "A2", 
      "A#2"
    ];
    const synth = new Tone.Synth({
      oscillator: {
        type: "sawtooth",
      },
      envelope: {
        attack: 0.1,
        decay: 0.1,
        sustain: 0.5,
        release: 0.6,
      },
    }).toDestination();
    const dist = new Tone.Distortion(0.95).toDestination();
    synth.connect(dist);
    const pattern = new Tone.Pattern((time, note) => {
      synth.triggerAttackRelease(note, "16n", time);
    }, notes);
    pattern.start(0);
  });
</script>

<style>

</style>