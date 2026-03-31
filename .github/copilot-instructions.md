# Copilot Instructions For This Workspace

## Project Summary
- Stack: Vite + React 18 + TypeScript (strict) + Tailwind CSS + Framer Motion.
- App shape: frontend-only portfolio site with animated hero, sticky navbar, and projects showcase.
- Keep changes minimal and aligned with existing visual language unless asked for redesign.

## Runbook
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npm run typecheck`
- Preview prod build: `npm run preview`

## Architecture And Boundaries
- `src/main.tsx`: React entrypoint and StrictMode mount.
- `src/App.tsx`: top-level composition and page structure.
- `src/Navbar.tsx`: fixed header with scroll-driven collapsed state.
- `src/ProjectsShowcase.tsx`: Framer Motion scroll transforms, card animation, contact pill.
- `src/index.css`: global style layer (Tailwind base/components/utilities).

## Coding Conventions
- Use TypeScript with strict typing. Avoid `any` unless explicitly required.
- Prefer function components and React hooks.
- Keep state local unless there is a clear cross-component need.
- Use Tailwind utility classes as primary styling method.
- Use inline `style` only for dynamic values difficult to express with Tailwind.
- Match existing gradient palette and rounded, high-contrast card style.
- Preserve z-index layering logic for navbar and floating elements.

## Animation Conventions
- Use Framer Motion for animated UI behavior.
- Follow existing patterns: `useScroll`, `useTransform`, `AnimatePresence`, and `whileHover`.
- Keep motion performant: avoid unnecessary state updates during scroll.
- Always clean up listeners/subscriptions in effects.

## Quality Gates
Before finalizing changes, run:
1. `npm run lint`
2. `npm run typecheck`
3. `npm run build` (when changes could affect bundling/output)

## Known Pitfalls
- TypeScript config enforces: `strict`, `noUnusedLocals`, `noUnusedParameters`.
- There is no test harness configured (no Vitest/Jest). Do not claim test coverage.
- `@supabase/supabase-js` is installed but currently unused; avoid introducing dead setup code.
- Scroll and animation work can regress UX quickly; verify behavior in browser when editing animated sections.

## Change Scope Guidance
- Favor small, targeted edits over broad refactors.
- Do not reformat unrelated files.
- Keep component APIs stable unless explicitly asked to change them.
- When adding new UI sections, follow existing spacing, typography scale, and responsive behavior.

## References
- Vite docs: https://vitejs.dev/
- Tailwind docs: https://tailwindcss.com/docs
- Framer Motion docs: https://www.framer.com/motion/
- TypeScript strict mode: https://www.typescriptlang.org/tsconfig#strict
