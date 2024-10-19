export interface Instrument {
  name: string;
  internalId: number;
  type: 'Synth' | 'Sampler' | 'BassLine';
}