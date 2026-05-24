'use client'

import { useRef, useState } from 'react'

type Props = {
  src: string
  accentColor?: string
}

export default function AudioPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause() } else { audio.play() }
    setPlaying(!playing)
  }

  const onTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  const onLoadedMetadata = () => {
    setDuration(audioRef.current?.duration ?? 0)
  }

  const onEnded = () => setPlaying(false)

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  return (
    <div className="border border-[#D4D0C9] bg-[#F5F3EF] p-6">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />

      <div className="flex items-center gap-5">
        <button
          onClick={toggle}
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#111110] bg-[#111110] text-[#F5F3EF] transition hover:bg-[#333]"
        >
          {playing ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="h-4 w-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div
            className="relative h-px cursor-pointer bg-[#D4D0C9]"
            onClick={seek}
          >
            <div
              className="absolute inset-y-0 left-0 bg-[#111110] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] tracking-[0.1em] text-[#9E9B97]">
            <span>{fmt((progress / 100) * duration)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
