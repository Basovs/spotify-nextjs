import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil"
import { currentTrackIDState, isPlayingState } from "../atoms/songatom"
import useSpotify from "../hooks/useSpotify"
import useSongInfo from "../hooks/useSongInfo"
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline"
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid"
import { debounce } from "lodash"

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()

  const [currentTrackID, setCurrentTrackID] =
    useRecoilState(currentTrackIDState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        setCurrentTrackID(data.body?.item?.id)

        spotifyApi
          .getMyCurrentPlaybackState()
          .then(data => setIsPlaying(data.body?.is_playing))
      })
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  const debouncedAdjustVolume = useCallback(
    debounce(volume => {
      spotifyApi.setVolume(volume).catch(err => {})
    }, 500),
    []
  )

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackID) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackIDState, spotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-sm md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images?.[0]?.url}
          alt="Song"
          className="hidden md:inline h-10 w-10"
        />

        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="btn" />
        <RewindIcon
          className="btn"
          // onClick={() => spotifyApi.skipToPrevious()} // Tis API doesnt work
        />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="btn w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="btn w-10 h-10" />
        )}

        <FastForwardIcon
          className="btn"
          // onClick={() => spotifyApi.skipToNext()} // Tis API doesnt work
        />
        <ReplyIcon className="btn" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 ml-auto pr-5">
        <VolumeDownIcon
          className="btn"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          className="btn"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  )
}

export default Player
