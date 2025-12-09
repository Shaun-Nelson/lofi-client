"use client";

import PageHeader from "@/components/layout/PageHeader";
import GlassPanel from "@/components/layout/GlassPanel";
import SoundTileWithSlider from "@/components/ui/SoundTileWithSlider";

import { useSound } from "@/lib/audio/useSound";
import { useAudioContext } from "@/lib/audio/AudioProvider";

import { Sound } from "@/types/sound";

export default function HomePage() {
  const { ensureEngineStarted } = useAudioContext();

  const rain = useSound("drums");
  const vinyl = useSound("guitar");
  const piano = useSound("piano");
  const cafe = useSound("synth");
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
          on={rain.on}
          onToggle={() => handleToggle(rain)}
          volume={Math.round(rain.volume * 100)}
          onVolumeChange={(v) => rain.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Guitar'
          on={vinyl.on}
          onToggle={() => handleToggle(vinyl)}
          volume={Math.round(vinyl.volume * 100)}
          onVolumeChange={(v) => vinyl.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Piano'
          on={piano.on}
          onToggle={piano.toggle}
          volume={Math.round(piano.volume * 100)}
          onVolumeChange={(v) => piano.setVolume(v / 100)}
        />

        <SoundTileWithSlider
          label='Synth'
          on={cafe.on}
          onToggle={cafe.toggle}
          volume={Math.round(cafe.volume * 100)}
          onVolumeChange={(v) => cafe.setVolume(v / 100)}
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
