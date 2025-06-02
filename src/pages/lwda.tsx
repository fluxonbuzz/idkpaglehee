import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  // Replace these with your actual image paths from the assets directory
  const avatar = "/assets/avatar.png";
  const avatarFrame = "/assets/frame.png";
  const banner = "/assets/banner.jpg";
  const background = "/assets/bg.jpg";

  // Discord badge icons (you can replace these with actual images)
  const badges = [
    { name: "Active Developer", icon: "🛠️" },
    { name: "Early Supporter", icon: "🌟" },
    { name: "Nitro", icon: "💎" },
    { name: "Moderator", icon: "🛡️" }
  ];

  const roles = [
    { name: "Owner", color: "bg-green-500" },
    { name: "Developer", color: "bg-blue-500" },
    { name: "Gamer", color: "bg-purple-500" },
    { name: "Content Creator", color: "bg-yellow-500" }
  ];

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
                {badges.map((badge, index) => (
                  <div 
                    key={index} 
                    className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group relative"
                    title={badge.name}
                  >
                    <span className="text-xs">{badge.icon}</span>
                    <div className="absolute -bottom-7 hidden group-hover:block bg-gray-900 text-xs px-2 py-1 rounded whitespace-nowrap">
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 px-6 pb-6">
              <div className="flex flex-col">
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

                {/* Horizontal Roles */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">ROLES</h2>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role, index) => (
                      <div 
                        key={index} 
                        className={`${role.color} text-xs px-3 py-1 rounded-full flex items-center gap-1`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white opacity-80"></span>
                        {role.name}
                      </div>
                    ))}
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
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-green-400">Discord</p>
                      <p className="text-sm text-gray-400">shivaxmods</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="https://twitter.com/shivaxmods" 
                    target="_blank"
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-blue-400">Twitter</p>
                      <p className="text-sm text-gray-400">@shivaxmods</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="https://youtube.com/shivaxmods" 
                    target="_blank"
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-red-400">YouTube</p>
                      <p className="text-sm text-gray-400">Shiva X Mods</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="https://twitch.tv/shivaxmods" 
                    target="_blank"
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-purple-400">Twitch</p>
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
