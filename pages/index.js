import Head from "next/head"
import Sidebar from "../components/Sidebar"

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>JBB - Spotify</title>
      </Head>

      <main className="bg-black h-screen">
        <Sidebar />
      </main>
    </div>
  )
}
