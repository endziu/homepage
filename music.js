const tracks = [
  { title: "110untunednobassmix", waveform_url: "public/waves/110untunednobassmix.png", sound_url: "public/sounds/110untunednobassmix.mp3" },
  { title: "a melody",            waveform_url: "public/waves/a-melody.png",            sound_url: "public/sounds/a-melody.mp3" },
  { title: "binary blob",         waveform_url: "public/waves/binary-blob.png",         sound_url: "public/sounds/binary-blob.mp3" },
  { title: "efix",                waveform_url: "public/waves/efix.png",                sound_url: "public/sounds/efix.mp3" },
  { title: "emisions",            waveform_url: "public/waves/Emisions.png",            sound_url: "public/sounds/Emisions.mp3" },
  { title: "kliks radio",         waveform_url: "public/waves/kliks-radio.png",         sound_url: "public/sounds/kliks-radio.mp3" },
  { title: "ganges",              waveform_url: "public/waves/Ganges.png",              sound_url: "public/sounds/Ganges.mp3" },
  { title: "lengths",             waveform_url: "public/waves/lengths.png",             sound_url: "public/sounds/lengths.mp3" },
  { title: "micro situations",    waveform_url: "public/waves/micro-situations.png",    sound_url: "public/sounds/micro-situations.mp3" },
  { title: "plugged in for a while", waveform_url: "public/waves/Plugged-in-for-a-while.png", sound_url: "public/sounds/Plugged-in-for-a-while.mp3" },
  { title: "prep2",               waveform_url: "public/waves/prep2.png",               sound_url: "public/sounds/prep2.mp3" },
  { title: "pół kawałka",         waveform_url: "public/waves/P\u00f3\u0142-Kawa\u0142ka.png", sound_url: "public/sounds/P\u00f3\u0142-Kawa\u0142ka.mp3" },
  { title: "scenario",            waveform_url: "public/waves/scenario.png",            sound_url: "public/sounds/scenario.mp3" },
  { title: "shtokha zen",         waveform_url: "public/waves/Shtokha-Zen.png",         sound_url: "public/sounds/Shtokha-Zen.mp3" },
  { title: "tapes",               waveform_url: "public/waves/tapes.png",               sound_url: "public/sounds/tapes.mp3" },
  { title: "trigger",             waveform_url: "public/waves/trigger.png",             sound_url: "public/sounds/trigger.mp3" },
  { title: "untuned garden",      waveform_url: "public/waves/untuned-garden.png",      sound_url: "public/sounds/untuned-garden.mp3" },
]

const state = {
  current: 0,
  volume: 0.5,
  autoplay: true,
}

const audio           = document.getElementById('audio')
const waveImg         = document.getElementById('waveform')
const progressBar     = document.getElementById('progress-bar')
const waveSection     = document.getElementById('wave')
const volumeSlider    = document.getElementById('volume-slider')
const autoplayCheck   = document.getElementById('autoplay-checkbox')
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
  if (state.autoplay) audio.play()
})

audio.addEventListener('timeupdate', () => {
  const progress = audio.currentTime / audio.duration || 0
  progressBar.style.width = `${(progress * 100).toFixed(3)}%`
})

audio.addEventListener('ended', () => {
  if (state.autoplay) loadTrack(clamp(state.current + 1))
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

autoplayCheck.addEventListener('change', (e) => {
  state.autoplay = e.target.checked
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
