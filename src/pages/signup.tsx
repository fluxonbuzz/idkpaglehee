import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Eye, User } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toast } from "react-hot-toast";

export default function Signup() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.type = ref.current.type === 'password' ? 'text' : 'password';
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

      const result = await response.json() as { message?: string };

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
        {/* Your form JSX here */}
      </Container>
    </div>
  );
}
