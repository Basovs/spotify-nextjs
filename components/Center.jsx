import { useEffect, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import { shuffle } from "lodash"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIDState, playlistState } from "../atoms/playlistAtom"
import spotifyApi from "../lib/spotify"
import Songs from "./Songs"

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
]

const Center = () => {
  const [color, setColor] = useState(null)

  const { data: session } = useSession()
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const playlistID = useRecoilValue(playlistIDState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistID])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistID)
      .then(data => setPlaylist(data.body))
      .catch(err => console.log("Something went wrong!: ", err))
  }, [spotifyApi, playlistID])

  console.log("playlist", playlist)

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header onClick={signOut} className="fixed top-5 right-8 text-white">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-3">
          <img
            src={session?.user.image}
            alt=""
            className="rounded-full w-10 h-10"
          />
          <p>{session?.user.name}</p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt="Playlist"
          className="w-44 h-44 shadow-2xl"
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-4xl md:text-6xl xl:text-9xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
