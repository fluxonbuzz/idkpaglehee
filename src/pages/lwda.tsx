import Container from "@/components/Container";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div className="py-16">
          {/* First Profile Card - Shiva X Mods */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/20 p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                  Shiva X Mods
                </h1>
                <p className="text-sm text-green-400 mb-4">New Development</p>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">ABOUT ME</h2>
                  <p className="text-gray-300">
                    I&apos;m Shiva X Mods<br />
                    a developer focusing on Discord Bot and Minecraft Server development. I<br />
                    enjoy exploring new technologies and creating unique experiences.
                  </p>
                  <p className="text-gray-300 mt-2">
                    Come join my server Discord and I hope you&apos;ll join and play some games with<br />
                    me on.
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <h2 className="text-xl font-semibold mb-2">ROLES</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Owner</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Not Developer</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Former</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>I smile.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Second Profile Card - BTC */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/20 p-6 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">BTC</h1>
                
                <div className="mb-2">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                    Shiva X Mods
                  </h2>
                  <p className="text-sm text-green-400 mb-4">New Development</p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span>Owner</span>
                    </li>
                    <li className="flex items-center pl-4">
                      <span className="text-xs mr-2">-</span>
                      <span>But Developer</span>
                    </li>
                    <li className="flex items-center pl-4">
                      <span className="text-xs mr-2">-</span>
                      <span>Gamer</span>
                    </li>
                    <li className="flex items-center pl-4">
                      <span className="text-xs mr-2">-</span>
                      <span>Lonely</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">CONNECTIONS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="mb-2">
                        <p className="font-medium">Shiva X Mods</p>
                        <div className="flex items-center mt-1">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">(empty)</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">(empty)</span>
                        </div>
                        <p className="font-medium mt-2">Shiva X</p>
                        <div className="flex items-center mt-1">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">(empty)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-2">
                        <p className="font-medium">shiva-x</p>
                        <div className="flex items-center mt-1">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">(empty)</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">(empty)</span>
                        </div>
                        <p className="font-medium mt-2">Discord Server</p>
                        <div className="flex items-center mt-1">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">(empty)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
