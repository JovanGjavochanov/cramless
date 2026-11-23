import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App shell', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the app name in the header', () => {
    expect(render().querySelector('header')?.textContent).toContain('Cramless');
  });

  it('renders routes inside a single main landmark', () => {
    const main = render().querySelectorAll('main');
    expect(main.length).toBe(1);
    expect(main[0].querySelector('router-outlet')).not.toBeNull();
  });

  it('has a skip link that targets the main content', () => {
    const el = render();
    const skip = el.querySelector<HTMLAnchorElement>('a.skip-link');
    expect(skip?.getAttribute('href')).toBe('#main');
    expect(el.querySelector('main')?.id).toBe('main');
  });
});
