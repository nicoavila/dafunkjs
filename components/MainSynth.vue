<template>
  <ClientOnly>
    <div>
      <h1 class="text-2xl font-bold">Bassline</h1>
      <input type="checkbox" :checked="active">
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import * as Tone from "tone";

  const active = ref<boolean>(true);
  const props = defineProps({
    sequence: {
      type: Array<{
        note: String,
        duration: String,
        time: String
      }>,
      required: true
    },
  })

  // Synth
  const synth = new Tone.MonoSynth({
    oscillator: {
      type: "sawtooth",
    },
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.5,
      release: 4,
    },
    filter: {
      frequency: 100,
      type: "lowpass",
      Q: 4
    },
    filterEnvelope: {
      attack: 0.15,
      decay: 0,
      sustain: 0.1,
      release: 4,
      baseFrequency: 800,
      octaves: 4,
      exponent : 2
    }
  })
  synth.portamento = 0.1;

  onMounted(() => {

    // Distortion
    const dist = new Tone.Distortion(1);
    synth.connect(dist);
    // Phaser
    
    synth.toDestination();

    // Sequence
    const pattern = new Tone.Part((time, event) => {
      synth.triggerAttackRelease(event.note, event.duration, time)
    }, props.sequence);
    pattern.loop = true;
    pattern.loopStart = 0;
    pattern.loopEnd = "4m";

    pattern.start(0);
  });

  /*onMounted(() => {
    const notes = [
      'G3', 
      "F3",
      "G3",
      "A#3",
      "D3", 
      "C3", 
      "D3", 
      "F3", 
      "A#2",
      "A2", 
      "A#2",
      "D3", 
      "G2", 
      "A2", 
      "A#2"
    ];
    
    const dist = new Tone.Distortion(0.8).toDestination();
    synth.connect(dist);
    const pattern = new Tone.Pattern((time, note) => {
      synth.triggerAttackRelease(note, "16n", time);
    }, notes);
    pattern.start(0);
  });*/
</script>

<style>

</style>