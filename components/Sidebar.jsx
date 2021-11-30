import { useState, useEffect } from "react"
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil"
import { playlistIDState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"

const Sidebar = () => {
  const [playlist, setPlaylist] = useState([])
  const [playlistID, setPlaylistID] = useRecoilState(playlistIDState)

  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => setPlaylist(data.body.items))
    }
  }, [session, spotifyApi])

  console.log(playlistID)

  return (
    <div className="hidden md:inline-flex max-w-[200px] lg:max-w-[240px] text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist here */}
        {playlist.map(playlist => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistID(playlist.id)}
            className=" cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
