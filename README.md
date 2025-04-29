# IdeaConnect

IdeaConnect is a web application designed to help people turn their ideas into reality by connecting them with like-minded individuals. The platform makes sharing and discovering ideas as simple as sending a text message.

## Features

- **Simple Idea Sharing**: Share your ideas with a simple text-based interface
- **Smart Matching**: AI-powered semantic analysis to connect similar ideas and complementary skills
- **Secure Connections**: Connect with potential collaborators while protecting your intellectual property
- **Anonymous Sharing**: Option to share ideas anonymously until you're ready to connect
- **Profile Integration**: Link your professional background through LinkedIn or resume
- **Real-time Chat**: Built-in messaging system for connected users
- **AI-Generated Plans**: Get AI-powered suggestions for turning ideas into actionable plans

## Tech Stack

- **Frontend**: Next.js 13+ with App Router, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google Provider
- **Database**: PostgreSQL with Prisma ORM
- **AI/ML**: OpenAI API for embeddings and project planning
- **Vector Search**: Pinecone for semantic similarity matching
- **Real-time**: Socket.IO for chat functionality

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later
- PostgreSQL database
- Google OAuth credentials
- OpenAI API key
- Pinecone API key

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/idea-connect.git
   cd idea-connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/idea_connect?schema=public"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # AI services
   OPENAI_API_KEY="your-openai-api-key"
   PINECONE_API_KEY="your-pinecone-api-key"
   PINECONE_ENVIRONMENT="your-pinecone-environment"
   ```

4. Initialize the database:
   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Database Schema

The application uses the following main models:

- **User**: User profiles and authentication
- **Idea**: Shared ideas with embeddings for semantic matching
- **Connection**: Connections between users based on matching ideas
- **Message**: Chat messages between connected users

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security Considerations

To protect users' intellectual property and maintain privacy:

1. Ideas can be shared anonymously
2. User profiles are only revealed after mutual interest
3. Chat history is encrypted
4. API rate limiting is implemented
5. All database queries are parameterized to prevent injection

## Future Enhancements

- [ ] Add more authentication providers
- [ ] Implement idea categories and tags
- [ ] Add file attachment support
- [ ] Create mobile applications
- [ ] Add team formation features
- [ ] Implement project management tools 