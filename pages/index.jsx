import { getSession } from "next-auth/react"
import Head from "next/head"
import Center from "../components/Center"
import Player from "../components/Player"
import Sidebar from "../components/Sidebar"

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>JBB - Spotify</title>
      </Head>

      <main className="bg-black h-screen flex">
        <Sidebar />

        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  return {
    props: {
      session,
    },
  }
}
