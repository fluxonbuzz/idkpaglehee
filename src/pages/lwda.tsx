import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  // Replace these with your actual image paths from the assets directory
  const avatar = "/assets/avatar.png";
  const avatarFrame = "/assets/frame.png";
  const banner = "/assets/banner.jpg";
  const background = "/assets/bg.jpg";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={background}
          alt="Profile background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <Container>
        <div className="py-16 space-y-8">
          {/* Discord-like Profile Section */}
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-700 bg-gray-800/80 backdrop-blur-sm">
            {/* Banner */}
            <div className="h-40 bg-gradient-to-r from-purple-900 to-blue-900 relative">
              <Image
                src={banner}
                alt="Profile banner"
                fill
                className="object-cover"
              />
              
              {/* Avatar Container */}
              <div className="absolute -bottom-16 left-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden relative">
                    <Image
                      src={avatar}
                      alt="Profile avatar"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                    {/* DND Status Indicator */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-red-500 border-2 border-gray-900 flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  {/* Avatar Frame */}
                  <div className="absolute -inset-2">
                    <Image
                      src={avatarFrame}
                      alt="Avatar frame"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Badges Container */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {[1, 2, 3, 4].map((badge) => (
                  <div key={badge} className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <span className="text-xs">⭐</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 px-6 pb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="mb-6">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        Shiva X Mods
                      </h1>
                      <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">DND</span>
                    </div>
                    <p className="text-sm text-gray-400">New Development</p>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">ABOUT ME</h2>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-300">
                        I&apos;m Shiva X Mods, a developer focusing on Discord Bot and Minecraft Server development.
                        I enjoy exploring new technologies and creating unique experiences.
                      </p>
                      <p className="text-gray-300 mt-2">
                        Come join my Discord server and play some games with me!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3">
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                    <h2 className="text-lg font-semibold mb-3">ROLES</h2>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span>Owner</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span>Developer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                        <span>Gamer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span>Content Creator</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Connections Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">CONNECTIONS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    href="https://discord.com/users/shivaxmods" 
                    target="_blank"
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <p className="font-medium text-green-400">Discord</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">shivaxmods</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="https://twitter.com/shivaxmods" 
                    target="_blank"
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <p className="font-medium text-blue-400">Twitter</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">@shivaxmods</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="https://youtube.com/shivaxmods" 
                    target="_blank"
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <p className="font-medium text-red-400">YouTube</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">Shiva X Mods</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="https://twitch.tv/shivaxmods" 
                    target="_blank"
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <p className="font-medium text-purple-400">Twitch</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">shivaxmods</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
