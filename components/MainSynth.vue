<template>
  <ClientOnly>
    <div class="w-[250px] p-4 rounded-lg bg-white shadow">
      <div class="mb-2">
        <span class="px-2 py-1 rounded-lg border-r-2 border-b-2 border-slate-400 bg-slate-100 text-slate-500">{{ props.assignedHotKey }}</span>
      </div>
      <h3 class="text-slate-500">Synth</h3>
      <h2 class="text-2xl font-bold">Main Lead</h2>
      <input type="checkbox" :checked="active" @change="activateInstrument($event)">
      <div>
        <span>{{ instrumentVolume }} dB</span>
        <input type="range" min="-50" max="0" @change="changeVolume($event)">
      </div>

      <!-- CONTROLS -->
      <div class="p-4 bg-slate-100 rounded-lg mt-4">
        <div>
          <label for="synth1FilterType" class="text-xs">Synth1 Filter Env. Type <strong>{{ synth1FilterEnvType }}</strong></label>
          <select class="text-xs p-2 my-2" name="synth1FilterType" @change="synth1FilterTypeChange($event)">
            <option value="bandpass" @change="synth1FilterEnvType = 'bandpass'">Bandpass</option>
            <option value="lowpass" @change="synth1FilterEnvType = 'lowpass'">Lowpass</option>
            <option value="highpass" @change="synth1FilterEnvType = 'highpass'">Highpass</option>
          </select>
        </div>
        <div>
          <label for="synth1FilterFreq" class="text-xs">Synth1 Filter Env. Freq: <strong>{{ synth1FilterEnvBaseFreq }}</strong></label>
          <input type="range" :value="synth1FilterEnvBaseFreq" min="100" max="2000" step="1" name="synth1FilterFreq" class="w-full" @change="synth1FilterFreqChange($event)">
        </div>
        <div>
          <label for="synth1FilterType" class="text-xs">Synth2 Filter Env. Type <strong>{{ synth2FilterEnvType }}</strong></label>
          <select class="text-xs p-2 my-2" name="synth2FilterType" @change="synth2FilterTypeChange($event)">
            <option value="bandpass" @change="synth2FilterEnvType = 'bandpass'">Bandpass</option>
            <option value="lowpass" @change="synth2FilterEnvType = 'lowpass'">Lowpass</option>
            <option value="highpass" @change="synth2FilterEnvType = 'highpass'">Highpass</option>
          </select>
        </div>
        <div>
          <label for="synth2FilterFreq" class="text-xs">Synth2 Filter Env. Freq: <strong>{{ synth2FilterEnvBaseFreq }}</strong></label>
          <input type="range" :value="synth2FilterEnvBaseFreq" min="100" max="2000" step="1" name="synth2FilterFreq" class="w-full" @change="synth2FilterFreqChange($event)">
        </div>
      </div> 
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import * as Tone from "tone";

  const active = ref<boolean>(true);
  const instrumentVolume = ref<number>(0);
  const synth1FilterEnvType = ref<BiquadFilterType>("bandpass");
  const synth1FilterEnvBaseFreq = ref<number>(500);
  const synth2FilterEnvType = ref<BiquadFilterType>("bandpass");
  const synth2FilterEnvBaseFreq = ref<number>(100);
  
  const props = defineProps({
    sequence: {
      type: Array<{
        note: String,
        duration: String,
        time: String
      }>,
      required: true
    },
    assignedHotKey: {
      type: String,
      required: true
    }
  })

  // Synth
  const synth1 = new Tone.MonoSynth({
    detune: 0,
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
      baseFrequency: synth1FilterEnvBaseFreq.value,
      octaves: 2,
      exponent : 4
    },
    volume: -10
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
      release: 100,
      baseFrequency: synth2FilterEnvBaseFreq.value,
      octaves: 4,
      exponent : 4
    },
    volume: 0
  });
  synth2.portamento = 0.1;

  // Distortion
  const distortion = new Tone.Distortion(0.8);
  synth1.connect(distortion);
  synth2.connect(distortion);

  // Bit Crusher
  const bitCrusher = new Tone.BitCrusher(6);
  distortion.connect(bitCrusher);

  // Destination
  bitCrusher.toDestination();

  onMounted(() => {
    // Sequence
    const pattern = new Tone.Part((time, event: { note: string, duration: string}) => {
      synth1.triggerAttackRelease(Tone.Frequency(event.note).toFrequency() * 0.5, event.duration, time)
      synth2.triggerAttackRelease(Tone.Frequency(event.note).toFrequency() * 2, event.duration, time);
    }, props.sequence);
    pattern.loop = true;
    pattern.loopStart = 0;
    pattern.loopEnd = "4m";

    pattern.start(0);
  });

  /**
   * Activate the instrument
   * @return void
   */
  const activateInstrument = (event: Event) => {
    active.value = !active.value;
    if (!active.value) {
      bitCrusher.disconnect();
      bitCrusher.disconnect();
    } else {
      bitCrusher.toDestination();
      bitCrusher.toDestination();
    }
  }

  /**
   * Changes the volume of the instrument
   * @return void
   */
  const changeVolume = (event: Event) => {
    instrumentVolume.value = parseInt((event.target as HTMLInputElement).value);
    console.log(`Main Synth volume: ${instrumentVolume.value}`);
    synth1.set({ volume: instrumentVolume.value });
    synth2.set({ volume: instrumentVolume.value });
  }
  
  /**
   * Changes filter enveloper type (lowpass, highpass, bandpass) for Synth1
   * @return void
   */
  const synth1FilterTypeChange = (event: Event) => {
    synth1FilterEnvType.value = ((event.target as HTMLSelectElement).value as BiquadFilterType);
    console.log(`Synth1 Filter Envelope Type: ${synth1FilterEnvType.value}`);
    synth1.set({ filter: { type: synth1FilterEnvType.value } });
  }

  /**
   * Changes filter enveloper base frequency for Synth1
   * @return void
   */
  const synth1FilterFreqChange = (event: Event) => {
    synth1FilterEnvBaseFreq.value = parseInt((event.target as HTMLInputElement).value);
    console.log(`Synth1 Filter Envelope Base Frequency: ${synth1FilterEnvBaseFreq.value}`);
    synth1.set({ filterEnvelope: { baseFrequency: synth1FilterEnvBaseFreq.value } });
  }

  /**
   * Changes filter enveloper type (lowpass, highpass, bandpass) for Synth2
   * @return void
   */
  const synth2FilterTypeChange = (event: Event) => {
    synth2FilterEnvType.value = ((event.target as HTMLSelectElement).value as BiquadFilterType);
    console.log(`Synth2 Filter Envelope Type: ${synth2FilterEnvType.value}`);
    synth2.set({ filter: { type: synth1FilterEnvType.value } });
  }

  /**
   * Changes filter enveloper base frequency for Synth2
   * @return void
   */
  const synth2FilterFreqChange = (event: Event) => {
    synth2FilterEnvBaseFreq.value = parseInt((event.target as HTMLInputElement).value);
    console.log(`Synth2 Filter Envelope Base Frequency: ${synth2FilterEnvBaseFreq.value}`);
    synth2.set({ filterEnvelope: { baseFrequency: synth2FilterEnvBaseFreq.value } });
  }
</script>