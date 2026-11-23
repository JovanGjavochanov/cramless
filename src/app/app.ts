import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component: the page frame every route renders inside.
 * Navigation is added once the feature routes exist.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="app-header">
      <span class="brand">Cramless</span>
    </header>
    <main id="main" class="app-main" tabindex="-1">
      <router-outlet />
    </main>
    <footer class="app-footer">
      <small>Cramless: study smart, never cram</small>
    </footer>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100dvh;
    }
    .app-header,
    .app-footer {
      padding: 0.75rem 1rem;
    }
    .app-header {
      border-bottom: 1px solid var(--border);
    }
    .brand {
      font-weight: 700;
      font-size: 1.25rem;
    }
    .app-main {
      flex: 1;
      width: 100%;
      max-width: 72rem;
      margin-inline: auto;
      padding: 1rem;
    }
    .app-main:focus {
      outline: none;
    }
    .app-footer {
      border-top: 1px solid var(--border);
      color: var(--text-muted);
    }
    /* Hidden until focused with the keyboard (first Tab on the page). */
    .skip-link {
      position: absolute;
      left: 0.5rem;
      top: -3rem;
      padding: 0.5rem 0.75rem;
      background: var(--surface);
      color: var(--text);
      border: 2px solid var(--focus);
      border-radius: 0.25rem;
      z-index: 10;
    }
    .skip-link:focus {
      top: 0.5rem;
    }
  `,
})
export class App {}
