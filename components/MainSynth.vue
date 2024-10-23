<template>
  <ClientOnly>
    <div>
      <h1 class="text-2xl font-bold">Main Synth</h1>
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
  const synth1 = new Tone.MonoSynth({
    detune: 20,
    oscillator: {
      type: "pulse",
      phase: 145
    },
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.5,
      release: 20,
    },
    filter: {
      frequency: 600,
      type: "bandpass",
      Q: 4
    },
    filterEnvelope: {
      attack: 0.15,
      decay: 0,
      sustain: 0.1,
      release: 6,
      baseFrequency: 500,
      octaves: 2,
      exponent : 4
    },
    volume: -15
  });
  synth1.portamento = 0.1;
  const synth2 = new Tone.MonoSynth({
    oscillator: {
      type: "sawtooth",
    },
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.5,
      release: 20,
    },
    filter: {
      frequency: 2000,
      type: "bandpass",
      Q: 8
    },
    filterEnvelope: {
      attack: 0.10,
      decay: 0,
      sustain: 0.20,
      release: 50,
      baseFrequency: 400,
      octaves: 4,
      exponent : 4
    },
    volume: 0
  });
  synth2.portamento = 0.1;

  // Distortion
  const distortion = new Tone.Distortion(0.4);
  synth1.connect(distortion);
  synth2.connect(distortion);

  //synth.toDestination();
  distortion.toDestination();

  onMounted(() => {

    // Sequence
    const pattern = new Tone.Part((time, event) => {
      synth1.triggerAttackRelease(Tone.Frequency(event.note).toFrequency() * 0.5, event.duration, time)
      synth2.triggerAttackRelease(Tone.Frequency(event.note).toFrequency() * 2, event.duration, time);
    }, props.sequence);
    pattern.loop = true;
    pattern.loopStart = 0;
    pattern.loopEnd = "4m";

    pattern.start(0);
  });

  const activateInstrument = (event: Event) => {
    active.value = !active.value;
    if (!active.value) {
      distortion.disconnect();
      distortion.disconnect();
    } else {
      distortion.toDestination();
      distortion.toDestination();
    }
  }

  const changeVolume = (event: Event) => {
    instrumentVolume.value = parseInt((event.target as HTMLInputElement).value);
    synth1.set({ volume: instrumentVolume.value });
    synth2.set({ volume: instrumentVolume.value });
  }
</script>

<style>

</style>