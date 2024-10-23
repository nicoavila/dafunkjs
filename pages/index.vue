<template>
  <div>
    <Sequencer />
    <MainSynth
      :sequence="[
        { note: 'G3', duration: '8n', time: '0:0:0' },
        { note: 'F3', duration: '16n', time: '0:1:4' },
        { note: 'G3', duration: '16n', time: '0:1:6' },
        { note: 'A#3', duration: '16n', time: '0:1:8' },
        { note: 'D3', duration: '8n', time: '0:1:10' },
        { note: 'C3', duration: '16n', time: '0:1:20' },
        { note: 'D3', duration: '16n', time: '0:1:22' },
        { note: 'F3', duration: '16n', time: '0:1:24' },
        { note: 'A#2', duration: '8n', time: '0:1:26' },
        { note: 'A2', duration: '16n', time: '0:1:36' },
        { note: 'A#2', duration: '16n', time: '0:1:38' },
        { note: 'D3', duration: '16n', time: '0:1:40' },
        { note: 'G2', duration: '8n', time: '0:1:42' },
        { note: 'A2', duration: '8n', time: '0:1:52' },
        { note: 'A#2', duration: '8n', time: '0:1:56' },
      ]"
    />
    <Sampler
      :name="'Hit'"
      :sampleName="'audio/zerog-datafile-three-hit1.wav'"
      :sequence="[
        { note: 'G6', duration: '16n', time: '0:0:0' },
        { note: 'G6', duration: '16n', time: '0:0:2' },
        { note: 'G6', duration: '16n', time: '0:1:1' },
        { note: 'G6', duration: '16n', time: '0:2:0' },
        { note: 'G6', duration: '16n', time: '0:2:4' },
      ]"
      :volume="-9"
    />
    <Sampler
      :name="'Kick'"
      :sampleName="'audio/zerog-datafile-three-kick3.wav'" 
      :sequence="[
        { note: 'G6', duration: '8n', time: '0:0:0' },
        { note: 'G6', duration: '8n', time: '0:1:0' },
        { note: 'G6', duration: '8n', time: '0:2:0' },
        { note: 'G6', duration: '8n', time: '0:3:0' },
        { note: 'G6', duration: '8n', time: '0:4:0' },
      ]"
      :volume="-20"
    />
    <Sampler
      :name="'Bass'"
      :sampleName="'audio/bass-sample.wav'" 
      :sequence="[
        { note: 'G6', duration: '4n', time: '0:0:0' },
        { note: 'G6', duration: '4n', time: '0:1:0' },
        { note: 'G6', duration: '4n', time: '0:2:0' },
        { note: 'G6', duration: '4n', time: '0:3:0' },
        { note: 'G6', duration: '4n', time: '0:4:0' },
      ]"
      :volume="-5"
    />
    <Sampler
      :name="'Drums'"
      :sampleName="'audio/drums-sample.wav'" 
      :sequence="[
        { note: 'G6', duration: '1n', time: '0:0:0' },
      ]"
      :volume="-2"
    />
  </div>
</template>

<script lang="ts" setup>
  import * as Tone from "tone";
  
</script>

<style>

</style>