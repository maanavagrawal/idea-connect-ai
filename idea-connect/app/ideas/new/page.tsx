'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewIdea() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [idea, setIdea] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: idea,
          isAnonymous,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit idea')
      }

      router.push('/ideas')
    } catch (error) {
      console.error('Error submitting idea:', error)
      // Handle error (show toast notification, etc.)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Share Your Idea
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg mb-2">
              What's your idea?
            </label>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your idea here... It can be anything from a business concept to a social impact project."
              className="w-full h-48 p-4 bg-gray-800 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="ml-2 block text-sm">
              Submit anonymously
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !idea.trim()}
            className={`w-full py-4 rounded-full text-lg font-semibold transition-colors ${
              isSubmitting || !idea.trim()
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Share Idea'}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-400 text-center">
          By submitting an idea, you agree to our terms of service and privacy policy.
          Your idea will be analyzed to find potential matches with other users.
        </p>
      </div>
    </main>
  )
} 