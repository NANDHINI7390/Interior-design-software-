// Web Audio API ambient room tone generator (gentle, warm acoustic atmosphere of a calm architectural room)
// Does not load external audio files; generates pristine, warm soothing pink/white noise filtered to 200Hz-800Hz.

let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let noiseSource: AudioBufferSourceNode | null = null;
let isPlaying = false;

export const toggleAmbientAtmosphere = (shouldPlay?: boolean): boolean => {
  if (typeof window === 'undefined') return false;

  const target = shouldPlay !== undefined ? shouldPlay : !isPlaying;

  if (target) {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtx = new AudioContextClass();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Generate 5 seconds of soft pink noise buffer
      const bufferSize = audioCtx.sampleRate * 5;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.015;
        b6 = white * 0.115926;
      }

      // Filter to deep warm room resonance (gentle lowpass at 420Hz)
      const lowpass = audioCtx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(380, audioCtx.currentTime);
      lowpass.Q.setValueAtTime(1.2, audioCtx.currentTime);

      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      // Gentle fade in
      gainNode.gain.exponentialRampToValueAtTime(0.28, audioCtx.currentTime + 1.2);

      noiseSource = audioCtx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      noiseSource.connect(lowpass);
      lowpass.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      noiseSource.start();
      isPlaying = true;
      return true;
    } catch (err) {
      console.warn('Ambient audio could not be initialized:', err);
      isPlaying = false;
      return false;
    }
  } else {
    if (gainNode && audioCtx) {
      try {
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        setTimeout(() => {
          if (noiseSource) {
            noiseSource.stop();
            noiseSource.disconnect();
            noiseSource = null;
          }
          isPlaying = false;
        }, 650);
      } catch {
        if (noiseSource) noiseSource.stop();
        isPlaying = false;
      }
    } else {
      isPlaying = false;
    }
    return false;
  }
};

export const getAmbientAtmosphereState = (): boolean => isPlaying;
