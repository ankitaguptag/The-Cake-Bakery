import { Metadata } from 'next'
import LoginForm from '../components/LoginForm'

export const metadata: Metadata = {
  title: 'Admin Login | Cake-Bakery Shop',
  description: 'Login to access the admin dashboard',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <LoginForm />
      </div>
    </div>
  )
}

