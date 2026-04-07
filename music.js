const tracks = [
  { title: "110untunednobassmix", waveform_url: "/waves/110untunednobassmix.png", sound_url: "/sounds/110untunednobassmix.mp3" },
  { title: "a melody",            waveform_url: "/waves/a-melody.png",            sound_url: "/sounds/a-melody.mp3" },
  { title: "binary blob",         waveform_url: "/waves/binary-blob.png",         sound_url: "/sounds/binary-blob.mp3" },
  { title: "efix",                waveform_url: "/waves/efix.png",                sound_url: "/sounds/efix.mp3" },
  { title: "emisions",            waveform_url: "/waves/emisions.png",            sound_url: "/sounds/emisions.mp3" },
  { title: "kliks radio",         waveform_url: "/waves/kliks-radio.png",         sound_url: "/sounds/kliks-radio.mp3" },
  { title: "ganges",              waveform_url: "/waves/ganges.png",              sound_url: "/sounds/ganges.mp3" },
  { title: "lengths",             waveform_url: "/waves/lengths.png",             sound_url: "/sounds/lengths.mp3" },
  { title: "micro situations",    waveform_url: "/waves/micro-situations.png",    sound_url: "/sounds/micro-situations.mp3" },
  { title: "plugged in for a while", waveform_url: "/waves/plugged-in-for-a-while.png", sound_url: "/sounds/plugged-in-for-a-while.mp3" },
  { title: "prep2",               waveform_url: "/waves/prep2.png",               sound_url: "/sounds/prep2.mp3" },
  { title: "pół kawałka",         waveform_url: "/waves/pół-kawałka.png",         sound_url: "/sounds/pół-kawałka.mp3" },
  { title: "scenario",            waveform_url: "/waves/scenario.png",            sound_url: "/sounds/scenario.mp3" },
  { title: "shtokha zen",         waveform_url: "/waves/shtokha-zen.png",         sound_url: "/sounds/shtokha-zen.mp3" },
  { title: "tapes",               waveform_url: "/waves/tapes.png",               sound_url: "/sounds/tapes.mp3" },
  { title: "trigger",             waveform_url: "/waves/trigger.png",             sound_url: "/sounds/trigger.mp3" },
  { title: "untuned garden",      waveform_url: "/waves/untuned-garden.png",      sound_url: "/sounds/untuned-garden.mp3" },
]

const state = {
  current: 0,
  volume: 0.5,
}

const audio           = document.getElementById('audio')
const waveImg         = document.getElementById('waveform')
const progressBar     = document.getElementById('progress-bar')
const waveSection     = document.getElementById('wave')
const volumeSlider    = document.getElementById('volume-slider')
const trackList       = document.getElementById('track-list')

// ── track loading ──────────────────────────────────────────────────────────────

function loadTrack(index) {
  state.current = index
  audio.src = tracks[index].sound_url
  waveImg.src = tracks[index].waveform_url
  progressBar.style.width = '0%'
  renderTrackList()
}

function clamp(n) {
  return Math.max(0, Math.min(tracks.length - 1, n))
}

// ── audio events ───────────────────────────────────────────────────────────────

audio.addEventListener('loadeddata', () => {
  audio.currentTime = 0
  audio.volume = state.volume
  volumeSlider.value = Math.pow(state.volume, 0.5)
  audio.play()
})

audio.addEventListener('timeupdate', () => {
  const progress = audio.currentTime / audio.duration || 0
  progressBar.style.width = `${(progress * 100).toFixed(3)}%`
})

audio.addEventListener('ended', () => {
  loadTrack(clamp(state.current + 1))
})

audio.addEventListener('error', () => {
  console.error('Audio failed to load:', audio.src)
})

// ── waveform click to seek ─────────────────────────────────────────────────────

waveSection.addEventListener('click', (e) => {
  const rect = waveSection.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  audio.currentTime = ratio * audio.duration
})

// ── controls ───────────────────────────────────────────────────────────────────

document.getElementById('btn-prev').addEventListener('click',  () => loadTrack(clamp(state.current - 1)))
document.getElementById('btn-next').addEventListener('click',  () => loadTrack(clamp(state.current + 1)))
document.getElementById('btn-play').addEventListener('click',  () => audio.play())
document.getElementById('btn-pause').addEventListener('click', () => audio.pause())
document.getElementById('btn-stop').addEventListener('click',  () => { audio.pause(); audio.currentTime = 0 })

volumeSlider.addEventListener('input', (e) => {
  state.volume = Math.pow(parseFloat(e.target.value), 2)
  audio.volume = state.volume
})

// ── track list ─────────────────────────────────────────────────────────────────

function renderTrackList() {
  trackList.querySelectorAll('.track-link').forEach((a, i) => {
    a.classList.toggle('active', i === state.current)
  })
}

tracks.forEach((track, i) => {
  const li = document.createElement('li')
  li.className = 'mb-1'
  const a = document.createElement('a')
  a.textContent = track.title
  a.className = 'track-link'
  a.addEventListener('click', () => loadTrack(i))
  li.appendChild(a)
  trackList.appendChild(li)
})

// ── init ───────────────────────────────────────────────────────────────────────

loadTrack(0)
