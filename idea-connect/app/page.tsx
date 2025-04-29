'use client'

import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Turn Your Ideas into Reality
        </h1>
        <p className="text-xl mb-12 text-gray-300">
          Share your ideas, connect with like-minded individuals, and build something amazing together.
          It's as simple as sending a text message.
        </p>
        
        <div className="flex justify-center gap-6">
          <Link
            href="/ideas/new"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-colors"
          >
            Share Your Idea
          </Link>
          <Link
            href="/ideas"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold transition-colors"
          >
            Explore Ideas
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Simple Sharing</h3>
            <p className="text-gray-400">Share your ideas as easily as sending a text message. No complicated forms.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Smart Matching</h3>
            <p className="text-gray-400">Our AI connects you with people who share similar visions and complementary skills.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Secure Connection</h3>
            <p className="text-gray-400">Connect safely with potential collaborators and protect your intellectual property.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
