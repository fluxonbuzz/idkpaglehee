import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Eye, User } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Signup() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    if (passwordRef.current) {
      passwordRef.current.type = 
        passwordRef.current.type === 'password' ? 'text' : 'password';
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.type = 
        confirmPasswordRef.current.type === 'password' ? 'text' : 'password';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirm-password') as string,
      terms: formData.get('terms') === 'on',
    };

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (!data.terms) {
      toast.error("You must accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Account created successfully!');
        router.push('/dashboard');
      } else {
        toast.error(result.message || 'Signup failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div className="flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-4">
                Create Account
              </h1>
              <p className="text-lg text-gray-300">
                Join us and get started today
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 p-8 shadow-lg shadow-blue-500/10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Your form fields here */}
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
