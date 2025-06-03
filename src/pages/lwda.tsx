import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Profile() {
  // Replace these with your actual image paths from the assets directory
  const avatar = "/assets/avatar.png";
  const avatarFrame = "/assets/frame.webp";
  const banner = "/assets/banner.jpg";
  const background = "/assets/bg.jpg";

  const roles = [
    { name: "Owner", color: "bg-green-500" },
    { name: "Developer", color: "bg-blue-500" },
    { name: "Gamer", color: "bg-purple-500" },
    { name: "Content Creator", color: "bg-yellow-500" }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-700 bg-gray-800/80 backdrop-blur-sm"
          >
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
                  </div>
                  {/* Avatar Frame */}
                  <div className="absolute -inset-2 z-0">
                    <Image
                      src={avatarFrame}
                      alt="Avatar frame"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </div>
                  {/* DND Status Indicator - Now on top of frame */}
                  <div className="absolute bottom-0 right-0 z-10 w-6 h-6 rounded-full bg-red-500 border-2 border-gray-900 flex items-center justify-center transform translate-y-1/4">
                    <div className="w-3 h-0.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 px-6 pb-6">
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col"
              >
                <motion.div variants={item} className="mb-6">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                      Shiva X Mods
                    </h1>
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">DND</span>
                  </div>
                  <p className="text-sm text-gray-400">New Development</p>
                </motion.div>

                <motion.div variants={item} className="mb-6">
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
                </motion.div>

                {/* Horizontal Roles */}
                <motion.div variants={item} className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">ROLES</h2>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${role.color} text-xs px-3 py-1 rounded-full flex items-center gap-1`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white opacity-80"></span>
                        {role.name}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Connections Section */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <h3 className="text-lg font-semibold mb-3">CONNECTIONS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div whileHover={{ y: -2 }}>
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
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -2 }}>
                    <Link 
                      href="https://t.me/shivaxmods" 
                      target="_blank"
                      className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-blue-400">Telegram</p>
                        <p className="text-sm text-gray-400">@shivaxmods</p>
                      </div>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -2 }}>
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
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -2 }}>
                    <Link 
                      href="https://wa.me/yourphonenumber" 
                      target="_blank"
                      className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-green-400">WhatsApp</p>
                        <p className="text-sm text-gray-400">+1234567890</p>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
