import { getProviders, signIn } from "next-auth/react"

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black w-full min-h-screen justify-center">
      <img
        src="https://links.papareact.com/9xl"
        alt="Spotify"
        className="w-52 mb-5"
      />

      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="bg-[#18D860] p-5 rounded-full font-bold"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
