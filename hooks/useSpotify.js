import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import spotifyApi from "../lib/spotify"

const useSpotify = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      // If refresh token fails - redirect user to login page
      if (session.error === "RefreshTokenError") {
        signIn()
      }

      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return spotifyApi
}

export default useSpotify
