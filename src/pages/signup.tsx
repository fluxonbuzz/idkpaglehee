import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ApiResponse {
  message?: string;
  [key: string]: unknown; // Allow other properties
}

export default function Signup() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      return;
    }

    if (!data.terms) {
      toast.error("You must accept the terms and conditions");
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

      const result: ApiResponse = await response.json();
      const message = result.message ?? 'Signup failed';

      if (response.ok) {
        toast.success('Account created successfully!');
        router.push('/dashboard');
      } else {
        toast.error(message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
          <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
