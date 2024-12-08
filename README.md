# DAFUNK.JS
> Using Synthtizers in the web to recreate an iconic track from Daft Punk

![DaFunk.js](/cover.png)

## Required tools
- nvm
- A web browser

## How to use locally
1. Clone the repository on your machine.
2. Execute `nvm use`. If you haven't installed NodeJS 22 yet, you need to install the required NodeJS version executing `nvm install` first. 
3. Execute `npm install`.
4. Execute `npm run dev`.
5. Open `http://localhost:3000` in your web browser.

## What we use from Tone.js in the application 
- [Tone.Transport](https://github.com/tonejs/tone.js/wiki/Transport): This class will be the "orchesta director" in the project. On the [`config.ts`](/stores/config.ts) is obtainer and configured the main Transport of the application.
The file [`Sequencer.vue`](/components/Sequencer.vue) controls the main events such play song, pause song and stop song.
- [Tone.Part](https://tonejs.github.io/docs/15.0.4/classes/Part.html): This class will be the responsable for playing notes inside each instrument. You can check this functionality inside [`MainSynth.ts`](/components/MainSynth.vue) and [`Sampler.ts`](/components/Sampler.vue).
- [Tone.MonoSynth](https://tonejs.github.io/docs/15.0.4/classes/MonoSynth.html): This is a preconfigured monophonic synthtesizer. Inside [`MainSynth.ts`](/components/MainSynth.vue) you can find two of them. Please note the two synths takes the input note, convert it into a numeric frequency and then multiply the original value with a constant number. Doing this you can detune the first and second voice of the MainSynth.
- [Tone.Sampler](https://tonejs.github.io/docs/15.0.4/classes/Sampler.html): This is a preconfigured Sampler. It has the ability to play sound from external files and map into a piano roll. Only one note is mapped in the application (G6).

## Disclaimer
- This project uses audio samples from licenced songs. You should not use this samples with commercial purposes.
- There's a know bug in this application related to modifing global BPM value when Drums Samples are active. Since Drum Samples have a fixed length and BPM, the sound overlaps if you change global BPM value above 111 BPM. I'll implement an improvement in the future to prevent this

## Future contributions of this project
- An article (in spanish) in [dev.to](https://dev.to/nicoavila) to explain the whole proccess of creation of this application.

If you want to contribute in this project as well don't hesitate to [open a pull request](https://github.com/nicoavila/dafunkjs/pulls) :smile: