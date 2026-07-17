import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'
import { useSelector } from 'react-redux'

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome{user?.name ? `, ${user.name}` : ''}
          </h1>
          <p className="text-gray-500 mt-1">Create and manage your shortened URLs</p>
        </div>

        <UrlForm />
        <UserUrl />
      </div>
    </div>
  )
}

export default DashboardPage