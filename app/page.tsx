"use client";

import PageHeader from "@/components/layout/PageHeader";
import GlassPanel from "@/components/layout/GlassPanel";
import SoundTileWithSlider from "@/components/ui/SoundTileWithSlider";

import { useSound } from "@/lib/audio/useSound";
import { useAudioContext } from "@/lib/audio/AudioProvider";

import { Sound } from "@/types/sound";

export default function HomePage() {
  const { ensureEngineStarted } = useAudioContext();

  const drums = useSound("drums");
  const rain = useSound("rain");
  const vinyl = useSound("vinyl");
  const piano = useSound("piano");
  const pad = useSound("pad");
  const melody1 = useSound("melody1");
  const melody2 = useSound("melody2");
  const keyboard = useSound("keyboard");

  // Start the audio context on first user tap
  const handleStartAudio = async () => {
    await ensureEngineStarted();
  };

  const handleToggle = (sound: Sound) => {
    sound.toggle();
  };

  return (
    <main
      className='tiny-lofi-bg min-h-screen flex items-center justify-center px-6 py-12'
      onClick={handleStartAudio} // first gesture activates audio engine
    >
      <GlassPanel>
        <PageHeader title='Pico-Fi' subtitle='Focus better. Feel better.' />

        <SoundTileWithSlider
          label='Drums'
          on={drums.on}
          onToggle={() => handleToggle(drums)}
          volume={Math.round(drums.volume * 100)}
          onVolumeChange={(v) => drums.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Vinyl'
          on={vinyl.on}
          onToggle={() => handleToggle(vinyl)}
          volume={Math.round(vinyl.volume * 100)}
          onVolumeChange={(v) => vinyl.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Rain'
          on={rain.on}
          onToggle={() => handleToggle(rain)}
          volume={Math.round(rain.volume * 100)}
          onVolumeChange={(v) => rain.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Piano'
          on={piano.on}
          onToggle={piano.toggle}
          volume={Math.round(piano.volume * 100)}
          onVolumeChange={(v) => piano.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Pad FX'
          on={pad.on}
          onToggle={() => handleToggle(pad)}
          volume={Math.round(pad.volume * 100)}
          onVolumeChange={(v) => pad.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Melody 1'
          on={melody1.on}
          onToggle={() => handleToggle(melody1)}
          volume={Math.round(melody1.volume * 100)}
          onVolumeChange={(v) => melody1.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Melody2'
          on={melody2.on}
          onToggle={() => handleToggle(melody2)}
          volume={Math.round(melody2.volume * 100)}
          onVolumeChange={(v) => melody2.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Keyboard Clacks'
          on={keyboard.on}
          onToggle={keyboard.toggle}
          volume={Math.round(keyboard.volume * 100)}
          onVolumeChange={(v) => keyboard.setVolume(v / 100)}
        />

        {/* SAVE BUTTON
        <PrimaryButton onClick={() => alert("Mix saved!")}>
          Save Mix
        </PrimaryButton> */}
      </GlassPanel>
    </main>
  );
}
