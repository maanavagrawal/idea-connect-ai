'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

interface Idea {
  id: string
  title: string
  description: string
  isAnonymous: boolean
  creator: {
    name: string | null
    image: string | null
  }
  createdAt: string
}

export default function IdeasPage() {
  const { data: session } = useSession()
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch('/api/ideas')
        if (!response.ok) throw new Error('Failed to fetch ideas')
        const data = await response.json()
        setIdeas(data)
      } catch (error) {
        console.error('Error fetching ideas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchIdeas()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Loading ideas...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Explore Ideas</h1>
          {session && (
            <Link
              href="/ideas/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-colors"
            >
              Share Your Idea
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-4">{idea.title}</h2>
              <p className="text-gray-400 mb-4 line-clamp-3">{idea.description}</p>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  {!idea.isAnonymous && idea.creator.name && (
                    <span className="text-sm text-gray-400">
                      By {idea.creator.name}
                    </span>
                  )}
                </div>
                <Link
                  href={`/ideas/${idea.id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {ideas.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No ideas yet</h2>
            <p className="text-gray-400">
              Be the first to share an idea and connect with others!
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 