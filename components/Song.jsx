import { useRecoilState } from "recoil"
import { currentTrackIDState, isPlayingState } from "../atoms/songatom"
import spotifyApi from "../lib/spotify"
import { millisToMinutesAndSeconds } from "../lib/time"

const Song = ({ track }) => {
  const [currentTrackID, setCurrentTrackID] =
    useRecoilState(currentTrackIDState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackID(track.id)
    setIsPlaying(true)

    spotifyApi.play({
      uris: [track.uri],
    })
  }

  return (
    <div
      onClick={playSong}
      className="grid grid-cols-2 text-gray-500 py-3 px-4 hover:bg-gray-900 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <p>{track.order + 1}</p>
        <img
          src={track.album.images?.[0]?.url}
          alt="Album"
          className="h-10 w-10"
        />

        <div>
          <p className="w-36 lg:w-64 text-white truncate">{track.name}</p>
          <p className="w-40">{track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-center ml-auto md:ml-0">
        <p className="hidden md:inline w-40">{track.album.name}</p>
        <p className="ml-auto">
          {millisToMinutesAndSeconds(track.duration_ms)}
        </p>
      </div>
    </div>
  )
}

export default Song
