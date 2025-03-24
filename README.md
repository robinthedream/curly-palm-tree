# ArticleAI

An AI-powered article generation platform built with Next.js, TypeScript, and OpenAI.

## Features

- AI-powered article generation
- Multi-step article creation wizard
- Rich text editing with EditorJS
- Authentication with NextAuth.js
- Dark mode support
- Responsive design

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Prisma (SQLite/PostgreSQL)
- NextAuth.js
- OpenAI API
- EditorJS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/articleai.git
cd articleai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# OpenAI (Optional)
OPENAI_API_KEY="your-openai-api-key"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

- `app/` - Next.js 13+ App Router pages and layouts
- `components/` - React components
- `lib/` - Utility functions and configurations
- `prisma/` - Database schema and migrations
- `public/` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 