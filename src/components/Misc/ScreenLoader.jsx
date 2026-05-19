import React from 'react'

const ScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        {/* Inner pulsing circle */}
        <div className="h-10 w-10 animate-pulse rounded-full bg-blue-500"></div>
      </div>
    </div>
  )
}

export default ScreenLoader