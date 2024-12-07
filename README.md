# DAFUNK.JS
> Using Synthtizers in the web to recreate an iconic track from Daft Punk

## Required tools
- nvm
- A web browser

## How to use locally
1. Clone the repository on your machine.
2. Execute `nvm use`. If you haven't installed NodeJS 22 yet, you need to install the required NodeJS version executing `nvm install` first. 
3. Execute `npm install`.
4. Execute `npm run dev`.
5. Open `http://localhost:3000` in your web browser.

## Disclaimer
- This project uses audio samples from licenced songs.
- There's a know bug in this application related to modifing global BPM value when Drums Samples are active. Since Drum Samples have a fixed length and BPM, the sound overlaps if you change global BPM value above 111 BPM. I'll implement an improvement in the future to prevent this :)