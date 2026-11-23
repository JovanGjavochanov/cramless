You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Project rules (Cramless)

Cramless is a university project (Internet Programming, UACS 2026). It is graded on
the process and on my understanding of the code, not only on the result.

### How to work with me
- Work in small steps: one component, service or feature per request. Do not change files I did not ask about.
- I must be able to explain every line. Add a short comment on non-obvious logic, and explain your choices when I ask why.
- Do not add npm packages without asking me first.
- Do not commit. I review the diff and commit myself, in small commits with messages that say what changed and why.
- Before saying something is done, run `ng build` and `ng test --watch=false`, and tell me what you did not verify in the browser.
- Do not delete or rewrite DEVLOG.md entries. I write the log myself.

### Architecture
- Feature folders under `src/app/<feature>/` (store, pages, routes, components); shared directives and UI in `src/app/shared/`.
- State lives in services: a private `signal`, a public read-only view (`asReadonly()` / `computed`), and methods that update immutably.
- The planning algorithm lives in `src/app/planner/` as pure TypeScript functions with no Angular imports, so it can be unit-tested on its own. Every change to it comes with tests.
- Persistence goes through one storage service, so localStorage can later be swapped for a backend without touching components.
- Data loaded from storage or files is validated at runtime before use (types are erased; JSON is not checked).
- Use Signal Forms for forms, `httpResource`/`toSignal` for async data, and route parameters as component inputs (`withComponentInputBinding()`).

### Quality bar
- Every async operation shows loading, empty and error states. No blank screens, no silent failures.
- Semantic HTML, labelled form controls, the main flows usable by keyboard. Anything with drag and drop also has a keyboard alternative.
- Responsive: works on a phone-width screen and on desktop.
- Tests must test real logic (planner, stores, validators), not only "should create".
- No `any`, no dead code, no leftover scaffolding.
- Never put API keys or secrets in the code or in prompts.
