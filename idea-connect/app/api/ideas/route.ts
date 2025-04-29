import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/app/lib/prisma'
import { OpenAI } from 'openai'
import { Pinecone } from '@pinecone-database/pinecone'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!
})

export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        creator: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(ideas)
  } catch (error) {
    console.error('Error fetching ideas:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { description, isAnonymous } = await req.json()

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 })
    }

    // Generate embeddings using OpenAI
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: description,
      encoding_format: "float",
    })

    // Create the idea in the database
    const idea = await prisma.idea.create({
      data: {
        title: description.split('\n')[0].slice(0, 100), // Use first line as title
        description,
        embeddings: embedding.data[0].embedding,
        isAnonymous,
        creatorId: session.user.id,
      },
    })

    // Find similar ideas using Pinecone
    const pineconeIndex = pinecone.Index('ideas')
    const queryResponse = await pineconeIndex.query({
      vector: embedding.data[0].embedding,
      topK: 5,
      includeMetadata: true,
    })

    // TODO: Process similar ideas and create potential connections

    return NextResponse.json(idea)
  } catch (error) {
    console.error('Error creating idea:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 