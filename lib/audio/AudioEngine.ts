import { SOUND_DEFINITIONS, SoundId } from "@/types/sound";

/**
 * Web Audio-based engine for looping ambient sounds.
 * UI can work without this (just don't instantiate/use it).
 */
export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private buffers: Map<SoundId, AudioBuffer> = new Map();
  private sources: Map<SoundId, AudioBufferSourceNode> = new Map();
  private gains: Map<SoundId, GainNode> = new Map();
  private loadingPromise: Promise<void> | null = null;
  private started = false;

  constructor() {
    if (typeof window !== "undefined" && "AudioContext" in window) {
      this.audioContext = new AudioContext();
    }
  }

  /**
   * Call once from a user gesture (click) to resume context on iOS/Safari.
   */
  async ensureStarted() {
    if (!this.audioContext) return;
    if (!this.started && this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
    this.started = true;
  }

  /**
   * Preload all sound buffers.
   */
  async loadAllSounds() {
    if (!this.audioContext) return;
    if (this.loadingPromise) return this.loadingPromise;

    this.loadingPromise = (async () => {
      for (const def of SOUND_DEFINITIONS) {
        if (this.buffers.has(def.id)) continue;
        const buffer = await this.loadBuffer(def.fileUrl);
        if (buffer) {
          this.buffers.set(def.id, buffer);
        }
      }
    })();

    return this.loadingPromise;
  }

  private async loadBuffer(url: string): Promise<AudioBuffer | null> {
    if (!this.audioContext) return null;
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer);
  }

  /**
   * Turn a sound on/off with optional volume.
   */
  async setSoundState(id: SoundId, on: boolean, volume: number) {
    if (!this.audioContext) return;

    await this.ensureStarted();
    await this.loadAllSounds();

    if (!on) {
      this.stopSound(id);
      return;
    }

    const buffer = this.buffers.get(id);
    if (!buffer) return;

    // If already playing, just adjust volume
    if (this.gains.has(id)) {
      this.setVolume(id, volume);
      return;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    source.start();

    this.sources.set(id, source);
    this.gains.set(id, gainNode);
  }

  /**
   * Set volume (0–1) for a sound if it's playing.
   */
  setVolume(id: SoundId, volume: number) {
    const gainNode = this.gains.get(id);
    if (!gainNode) return;
    gainNode.gain.setTargetAtTime(volume, this.audioContext!.currentTime, 0.05);
  }

  /**
   * Stop a single sound.
   */
  stopSound(id: SoundId) {
    const source = this.sources.get(id);
    if (source) {
      try {
        source.stop();
      } catch {
        // ignore
      }
      source.disconnect();
      this.sources.delete(id);
    }
    const gainNode = this.gains.get(id);
    if (gainNode) {
      gainNode.disconnect();
      this.gains.delete(id);
    }
  }

  /**
   * Stop everything & close context.
   */
  async dispose() {
    for (const id of this.sources.keys()) {
      this.stopSound(id);
    }
    if (this.audioContext && this.audioContext.state !== "closed") {
      await this.audioContext.close();
    }
    this.audioContext = null;
  }
}
