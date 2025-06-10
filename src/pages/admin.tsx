import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Lock, Mail, User, Trash2, Edit, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function Admin() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  ]);

  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ 
    name: '', 
    email: '', 
    role: 'user' 
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: Date.now().toString() }]);
      setNewUser({ name: '', email: '', role: 'user' });
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div className="flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-4">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-300">
                Manage users and application settings
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-emerald-500/20 p-8 shadow-lg shadow-emerald-500/10">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-emerald-400 mb-4">Add New User</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 w-full px-3 py-2 rounded-lg text-white placeholder-gray-400 outline-none transition-all"
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 w-full px-3 py-2 rounded-lg text-white placeholder-gray-400 outline-none transition-all"
                      placeholder="Email Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 w-full px-3 py-2 rounded-lg text-white outline-none transition-all"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <Button
                  onClick={handleAddUser}
                  className="mt-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-emerald-400 mb-4">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <User className="flex-shrink-0 h-5 w-5 text-emerald-400 mr-2" />
                              <div className="text-sm font-medium text-white">{user.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-300'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-emerald-400 hover:text-emerald-300 mr-4">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link href="/login" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center justify-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
