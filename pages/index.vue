<template>
  <NuxtLayout>
    <div>
      <img class="w-60 mb-4" src="@/assets/images/dafunklogo.png" alt="DaFunk.JS">
      <Sequencer id="sequencer" />
      <div class="flex gap-4">
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
          :assignedHotKey="'Q'"
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
          :assignedHotKey="'W'"
        />
        <Sampler
          :name="'Kick'"
          :sampleName="'audio/kick.wav'" 
          :sequence="[
            { note: 'G6', duration: '8n', time: '0:0:0' },
            { note: 'G6', duration: '8n', time: '0:1:0' },
            { note: 'G6', duration: '8n', time: '0:2:0' },
            { note: 'G6', duration: '8n', time: '0:3:0' },
            { note: 'G6', duration: '8n', time: '0:4:0' },
          ]"
          :volume="-10"
          :assignedHotKey="'E'"
        />
        <Sampler
          :name="'Bass'"
          :sampleName="'audio/bass-sample.wav'" 
          :sequence="[
            { note: 'G6', duration: '8n', time: '0:0:0' },
            { note: 'G6', duration: '8n', time: '0:1:0' },
            { note: 'G6', duration: '8n', time: '0:2:0' },
            { note: 'G6', duration: '8n', time: '0:3:0' },
            { note: 'G6', duration: '8n', time: '0:4:0' },
          ]"
          :volume="-5"
          :assignedHotKey="'R'"
        />
        <Sampler
          :name="'Drums'"
          :sampleName="'audio/drums-sample.wav'" 
          :sequence="[
            { note: 'G6', duration: '1n', time: '0:0:0' },
          ]"
          :volume="-2"
          :assignedHotKey="'Y'"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: 'default' });
</script>

<style>
  #sequencer {
    margin-bottom: 15px;
  }
</style>