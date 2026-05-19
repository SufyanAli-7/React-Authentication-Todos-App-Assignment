import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const Hero = () => {
  const { user } = useAuth()

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
          Dashboard Home
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-gray-900">
          Welcome, {user?.fullName || 'User'}
        </h1>
        <p className="mt-3 text-gray-600">
          Yahan se aap apne todos easily manage kar sakte hain.
        </p>
        <Link
          to="/dashboard/todos"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Go to Todos
        </Link>
      </div>
    </main>
  )
}

export default Hero