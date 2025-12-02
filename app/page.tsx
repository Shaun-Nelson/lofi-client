"use client";

import { useState } from "react";
import Toggle from "@/components/Toggle";
import GradientSlider from "@/components/GradientSlider";

export default function HomePage() {
  // -----------------------------
  // Local State for UI demo
  // (Hook up audio engine later)
  // -----------------------------

  const [rainOn, setRainOn] = useState(false);
  const [rainVolume, setRainVolume] = useState(50);

  const [vinylOn, setVinylOn] = useState(false);
  const [pianoOn, setPianoOn] = useState(false);

  const [cafeOn, setCafeOn] = useState(false);
  const [birdsOn, setBirdsOn] = useState(false);

  const [keyboardOn, setKeyboardOn] = useState(false);

  return (
    <main className='tiny-lofi-bg min-h-screen flex items-center justify-center px-6 py-12'>
      {/* GLASS PANEL WRAPPER */}
      <div className='glass-panel max-w-[480px] w-full px-8 py-10 flex flex-col gap-10'>
        {/* HEADER */}
        <header className='text-center'>
          <h1 className='text-[32px] font-semibold tracking-tight text-text-on-glass'>
            Tiny Lo-Fi Machine
          </h1>
          <p className='mt-1 text-[16px] text-text-secondary'>
            Focus Better. Feel Better.
          </p>
        </header>

        {/* FEATURED SOUND: Rain */}
        <div className='glass-tile px-6 py-5 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <span className='text-[16px] font-medium text-text-on-glass'>
              Rain
            </span>

            <Toggle on={rainOn} onChange={() => setRainOn(!rainOn)} />
          </div>

          <div className='flex flex-col gap-1'>
            <span className='text-[13px] text-text-secondary'>Volume</span>
            <GradientSlider
              value={rainVolume}
              onChange={(v) => setRainVolume(v)}
              disabled={!rainOn}
            />
          </div>
        </div>

        {/* ROW: Vinyl / Piano */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='glass-tile px-5 py-4 flex items-center justify-between'>
            <span className='text-[15px] font-medium text-text-on-glass'>
              Vinyl Crackle
            </span>
            <Toggle on={vinylOn} onChange={() => setVinylOn(!vinylOn)} />
          </div>

          <div className='glass-tile px-5 py-4 flex items-center justify-between'>
            <span className='text-[15px] font-medium text-text-on-glass'>
              Piano
            </span>
            <Toggle on={pianoOn} onChange={() => setPianoOn(!pianoOn)} />
          </div>
        </div>

        {/* ROW: Cafe / Birds */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='glass-tile px-5 py-4 flex items-center justify-between'>
            <span className='text-[15px] font-medium text-text-on-glass'>
              Cafe Noise
            </span>
            <Toggle on={cafeOn} onChange={() => setCafeOn(!cafeOn)} />
          </div>

          <div className='glass-tile px-5 py-4 flex items-center justify-between'>
            <span className='text-[15px] font-medium text-text-on-glass'>
              Birds
            </span>
            <Toggle on={birdsOn} onChange={() => setBirdsOn(!birdsOn)} />
          </div>
        </div>

        {/* FULL TILE: Keyboard Clacks */}
        <div className='glass-tile px-5 py-4 flex items-center justify-between'>
          <span className='text-[15px] font-medium text-text-on-glass'>
            Keyboard Clacks
          </span>
          <Toggle on={keyboardOn} onChange={() => setKeyboardOn(!keyboardOn)} />
        </div>

        {/* SAVE BUTTON */}
        <button className='btn-primary w-full'>Save Mix</button>
      </div>
    </main>
  );
}
