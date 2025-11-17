import { useEffect, useState } from 'react'
import { Shield, Users, Mail, Filter, Search, RefreshCw, Clock, Eye } from 'lucide-react'
import { getBrowserSupabase } from '../../lib/supabase'

interface GuardianApplication {
  id: string
  name: string
  email: string
  contact: string
  platform: 'discord' | 'telegram' | string
  experience: string
  motivation: string
  availability: string | null
  created_at?: string
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<GuardianApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [search, setSearch] = useState('')
  const [platformFilter, setPlatformFilter] = useState<'all' | 'discord' | 'telegram'>('all')
  const [selectedApplication, setSelectedApplication] = useState<GuardianApplication | null>(null)
  const [isAuthed, setIsAuthed] = useState(false)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const flag = localStorage.getItem('applicationsAuthed')
    if (flag === 'true') {
      setIsAuthed(true)
      fetchApplications()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError('')
      const supabase = getBrowserSupabase()
      const { data, error } = await supabase
        .from('guardian_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setApplications((data || []) as GuardianApplication[])
    } catch (e: any) {
      console.error('Failed to fetch applications', e)
      setError(e?.message || 'Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  const filtered = applications.filter(a => {
    const s = search.toLowerCase()
    const matchesSearch =
      !s ||
      `${a.name} ${a.email} ${a.contact} ${a.experience} ${a.motivation}`
        .toLowerCase()
        .includes(s)
    const matchesPlatform = platformFilter === 'all' || a.platform === platformFilter
    return matchesSearch && matchesPlatform
  })

  useEffect(() => {
    if (!isAuthed) return
    if (typeof window === 'undefined') return
    if (typeof Notification === 'undefined') return

    const supabase = getBrowserSupabase()

    const channel = supabase
      .channel('guardian-applications-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'guardian_applications',
      }, payload => {
        const app: any = payload.new

        const showNotification = () => {
          try {
            new Notification('New Guardian Application', {
              body: `${app?.name || 'Unknown'} • ${app?.platform || ''}`.trim(),
              icon: '/icon-512x512.png',
            })
          } catch {
            // ignore notification failures
          }
        }

        if (Notification.permission === 'granted') {
          showNotification()
        } else if (Notification.permission === 'default') {
          Notification.requestPermission().then(result => {
            if (result === 'granted') {
              showNotification()
            }
          }).catch(() => {})
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [isAuthed])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {!isAuthed ? (
          <div className="max-w-md mx-auto mt-20 bg-gray-900/70 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Applications Viewer Login</h1>
                <p className="text-xs text-gray-400 mt-1">Enter the viewer credentials to access applications.</p>
              </div>
            </div>

            {loginError && (
              <div className="mb-3 text-xs text-red-400 bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-2">
                {loginError}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Username</label>
                <input
                  value={loginUsername}
                  onChange={e => setLoginUsername(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm"
                  placeholder="1234"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm"
                  placeholder="1234"
                />
              </div>
              <button
                onClick={() => {
                  setLoginError('')
                  if (loginUsername === '1234' && loginPassword === '1234') {
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('applicationsAuthed', 'true')
                    }
                    setIsAuthed(true)
                    fetchApplications()
                  } else {
                    setLoginError('Invalid credentials')
                  }
                }}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border border-cyan-400 rounded-xl px-4 py-2 text-sm font-semibold"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Guardian Applications</h1>
                <p className="text-xs text-gray-400 mt-1">
                  View all submitted Discord / Telegram guardian applications
                </p>
              </div>
            </div>

            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative w-full max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search name, email, username, motivation..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-gray-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={platformFilter}
                    onChange={e => setPlatformFilter(e.target.value as any)}
                    className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm"
                  >
                    <option value="all">All Platforms</option>
                    <option value="discord">Discord</option>
                    <option value="telegram">Telegram</option>
                  </select>
                </div>
              </div>
              <button
                onClick={fetchApplications}
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-3 py-2 text-sm"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300 flex items-center gap-2">
                <Shield className="w-4 h-4" /> {error}
              </div>
            )}

            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-0 px-4 py-3 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
                <div className="col-span-2">Name</div>
                <div className="col-span-2">Email</div>
                <div className="col-span-2">Contact</div>
                <div className="col-span-1">Platform</div>
                <div className="col-span-3">Motivation</div>
                <div className="col-span-2 text-right">Created</div>
              </div>

              {loading ? (
                <div className="p-6 text-gray-400 text-sm">Loading applications...</div>
              ) : filtered.length === 0 ? (
                <div className="p-6 text-gray-400 text-sm">No applications found</div>
              ) : (
                filtered.map(app => (
                  <div key={app.id} className="grid grid-cols-12 gap-0 px-4 py-3 border-b border-gray-850 text-sm">
                    <div className="col-span-2 font-medium flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="truncate" title={app.name}>{app.name}</span>
                    </div>
                    <div className="col-span-2 text-gray-300 truncate" title={app.email}>{app.email}</div>
                    <div className="col-span-2 text-gray-300 truncate" title={app.contact}>{app.contact}</div>
                    <div className="col-span-1 capitalize">{app.platform}</div>
                    <div className="col-span-3 text-gray-300">
                      <div className="flex items-start gap-2">
                        <span className="line-clamp-2 flex-1">{app.motivation}</span>
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="flex-shrink-0 p-1 hover:bg-gray-800 rounded-lg transition-colors"
                          title="View full application"
                        >
                          <Eye className="w-4 h-4 text-gray-400 hover:text-gray-300" />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 text-right text-gray-400 text-xs">
                      {app.created_at && (
                        new Date(app.created_at).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 text-xs text-gray-400 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Applications are sorted by newest first
            </div>

            {selectedApplication && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <div>
                      <h2 className="text-xl font-bold">Application Details</h2>
                      <p className="text-gray-400 text-sm mt-1">
                        {selectedApplication.name} ({selectedApplication.email})
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedApplication(null)}
                      className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Contact</h3>
                        <p className="bg-gray-800/50 border border-gray-700 rounded-xl px-3 py-2">
                          {selectedApplication.contact}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Platform</h3>
                        <p className="bg-gray-800/50 border border-gray-700 rounded-xl px-3 py-2 capitalize">
                          {selectedApplication.platform}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Availability</h3>
                        <p className="bg-gray-800/50 border border-gray-700 rounded-xl px-3 py-2">
                          {selectedApplication.availability || 'Not specified'}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Experience</h3>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 whitespace-pre-wrap text-sm">
                          {selectedApplication.experience}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Motivation</h3>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 whitespace-pre-wrap text-sm">
                          {selectedApplication.motivation}
                        </div>
                      </div>

                      {selectedApplication.created_at && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Submitted On</h3>
                          <p className="bg-gray-800/50 border border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-300">
                            {new Date(selectedApplication.created_at).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
