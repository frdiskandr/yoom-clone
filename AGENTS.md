<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Conferecing App — Agent Instructions

## Project Overview

A **Next.js 16** conference/meeting web application. Early-stage development with a modular component architecture using **Tailwind CSS** and **shadcn/ui** components.

## Architecture & Structure

### Route Organization

```
app/
├── (auth)/          # Authentication pages (login, signup, etc.)
├── (root)/          # Authenticated app pages
│   ├── (home)/      # Dashboard/home page
│   └── meeting/[id]/ # Individual meeting detail page
└── layout.tsx       # Root layout with fonts and base styling
```

**Routing Convention**: Route groups (`(name)`) organize logical sections without affecting URLs. The `[id]` pattern creates dynamic routes.

### Component Organization

```
components/
└── ui/             # Reusable UI components (buttons, cards, etc.)
              # Built from shadcn/ui + Radix UI
```

**Expanding pattern**: Create domain-specific folders as needed:

- `components/meetings/` for meeting-specific components
- `components/auth/` for authentication components
- Keep `ui/` exclusively for generic, reusable components

### Styling

- **Tailwind CSS v4** with PostCSS configuration
- **shadcn/ui** components via Radix UI primitives
- **Utility functions** in `lib/utils.ts` (e.g., `clsx`, `cn`)
- Design tokens in `globals.css`

## Development Workflow

### Build Commands

| Command         | Purpose                                                  |
| --------------- | -------------------------------------------------------- |
| `npm run dev`   | Start dev server (http://localhost:3000) with hot reload |
| `npm run build` | Build for production                                     |
| `npm run start` | Run production build                                     |
| `npm run lint`  | Run ESLint                                               |

### Tech Stack

- **Framework**: Next.js 16.2.6 with App Router
- **UI**: React 19.2.4 + shadcn/ui + Radix UI
- **Styling**: Tailwind CSS 4 + PostCSS
- **Type Safety**: TypeScript 5
- **Linting**: ESLint 9

## Conventions

### Naming

- **Components**: PascalCase, `Page.tsx` for route pages, `[param].tsx` for dynamic routes
- **Utilities/Helpers**: camelCase (`lib/utils.ts`)
- **CSS Classes**: Use Tailwind utilities; avoid custom CSS unless necessary

### Async/Await in Components

- Server components can be async (React 19 Server Components)
- Check `app/(root)/meeting/[id]/page.tsx` for async params pattern: `params: Promise<{ id: string }>`

### Component Patterns

- Keep UI components in `components/ui/` generic and reusable
- Use composition over prop drilling
- Leverage shadcn/ui + Radix UI for accessible components

## Next Steps

To extend this project with AI guidance:

1. **Create file instructions** (`.github/instructions/`) for domain-specific patterns (e.g., meeting page layouts, API route conventions)
2. **Create a skill** for common scaffolding tasks (e.g., "Generate a new meeting feature")
3. **Document API structure** if backend routes are added
4. **Establish database schema guidelines** before implementing data models

See `/snap/code/238/usr/share/code/resources/app/extensions/copilot/assets/prompts/skills/agent-customization/SKILL.md` for how to create these.
