/**
 * Regression tests — fix/content-regression-guards
 *
 * Covers:
 *  a. App/layout renders header nav and footer on all routes
 *  b. Navigation routes do not lose header/footer
 *  c. Music page shows Coming Soon and does not render old fake releases
 *  d. Photos page includes Trey Live metadata
 *  e. Press/About content does not contain "Red Mesa Records"
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ── Minimal mocks ────────────────────────────────────────────────────────────

// framer-motion — avoid animation side-effects in jsdom
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag) =>
        ({ children, ...props }) =>
          React.createElement(tag, props, children),
    }
  ),
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({}),
}));

// GlobalAudioPlayer / useAudio — not needed for layout tests
vi.mock('@/components/audio/GlobalAudioPlayer', () => ({
  default: () => null,
  AudioProvider: ({ children }) => children,
  useAudio: () => ({ playTrack: vi.fn(), isPlaying: false }),
}));

// ── Helpers ──────────────────────────────────────────────────────────────────

function renderWithRouter(ui, { initialEntries = ['/'] } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
  );
}

// ── Layout ───────────────────────────────────────────────────────────────────

import Layout from '@/Layout';

describe('Layout shell', () => {
  it('renders nav and footer on /Home route', () => {
    const { container } = renderWithRouter(
      <Layout><div data-testid="page-content" /></Layout>,
      { initialEntries: ['/Home'] }
    );
    // Nav present in DOM
    expect(container.querySelector('nav')).not.toBeNull();
    // Footer present in DOM
    expect(container.querySelector('footer')).not.toBeNull();
    // Brand name appears at least once (nav + footer)
    expect(screen.getAllByText('Sol of the South').length).toBeGreaterThan(0);
    // Footer copyright
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it('renders nav and footer on /Music route', () => {
    const { container } = renderWithRouter(
      <Layout><div /></Layout>,
      { initialEntries: ['/Music'] }
    );
    expect(container.querySelector('nav')).not.toBeNull();
    expect(container.querySelector('footer')).not.toBeNull();
  });

  it('renders nav and footer on /Photos route', () => {
    const { container } = renderWithRouter(
      <Layout><div /></Layout>,
      { initialEntries: ['/Photos'] }
    );
    expect(container.querySelector('nav')).not.toBeNull();
    expect(container.querySelector('footer')).not.toBeNull();
  });

  it('hides nav/footer only on /Landing route', () => {
    const { container } = renderWithRouter(
      <Layout><div data-testid="landing-child" /></Layout>,
      { initialEntries: ['/Landing'] }
    );
    // The nav element should NOT be present
    const nav = container.querySelector('nav');
    expect(nav).toBeNull();
  });

  it('does NOT hide nav/footer on / (Home route)', () => {
    const { container } = renderWithRouter(
      <Layout><div /></Layout>,
      { initialEntries: ['/'] }
    );
    // After the fix, "/" should have a nav
    const nav = container.querySelector('nav');
    expect(nav).not.toBeNull();
  });
});

// ── Music page ───────────────────────────────────────────────────────────────

import MusicPage from '@/pages/Music';

describe('Music page', () => {
  it('shows Coming Soon heading', () => {
    renderWithRouter(<MusicPage />);
    expect(screen.getByRole('heading', { name: /coming soon/i })).toBeInTheDocument();
  });

  it('shows the descriptive Coming Soon message', () => {
    renderWithRouter(<MusicPage />);
    expect(
      screen.getByText(/music and release information is being prepared/i)
    ).toBeInTheDocument();
  });

  it('does NOT render High Plains Thunder', () => {
    renderWithRouter(<MusicPage />);
    expect(screen.queryByText(/high plains thunder/i)).toBeNull();
  });

  it('does NOT render Midnight Revival', () => {
    renderWithRouter(<MusicPage />);
    expect(screen.queryByText(/midnight revival/i)).toBeNull();
  });
});

// ── Photos data ──────────────────────────────────────────────────────────────

import photosData from '@/data/photos.json';

describe('Photos data', () => {
  it('contains a Trey Live entry', () => {
    const treyLive = photosData.find((p) => p.title === 'Trey Live');
    expect(treyLive).toBeDefined();
  });

  it('Trey Live has a valid local image_url', () => {
    const treyLive = photosData.find((p) => p.title === 'Trey Live');
    expect(treyLive.image_url).toBe('/images/photos/trey-live.png');
    expect(treyLive.thumbnail_url).toBe('/images/photos/trey-live.png');
  });

  it('Trey Live has category live', () => {
    const treyLive = photosData.find((p) => p.title === 'Trey Live');
    expect(treyLive.category).toBe('live');
  });

  it('no photo entry has a null image_url', () => {
    const nullEntries = photosData.filter((p) => p.image_url === null);
    expect(nullEntries).toHaveLength(0);
  });

  it('no photo entry uses an external URL', () => {
    const external = photosData.filter(
      (p) => p.image_url && p.image_url.startsWith('http')
    );
    expect(external).toHaveLength(0);
  });

  it('First Practice is marked pinned', () => {
    const entry = photosData.find((p) => p.title === 'First Practice');
    expect(entry.pinned).toBe(true);
  });

  it('First Practice is the first entry after pinned sort', () => {
    const pinned = photosData.filter(p => p.pinned);
    const rest = photosData.filter(p => !p.pinned);
    const sorted = [...pinned, ...rest];
    expect(sorted[0].title).toBe('First Practice');
  });

  it('contains an Ivey & Jackson entry', () => {
    const entry = photosData.find((p) => p.title === 'Ivey & Jackson');
    expect(entry).toBeDefined();
  });

  it('Ivey & Jackson has a valid local image_url', () => {
    const entry = photosData.find((p) => p.title === 'Ivey & Jackson');
    expect(entry.image_url).toBe('/images/photos/ivey-jackson.png');
    expect(entry.thumbnail_url).toBe('/images/photos/ivey-jackson.png');
  });

  it('Ivey & Jackson has category live', () => {
    const entry = photosData.find((p) => p.title === 'Ivey & Jackson');
    expect(entry.category).toBe('live');
  });
});

// ── Press content ─────────────────────────────────────────────────────────────

import PressPage from '@/pages/Press';

describe('Press page', () => {
  it('shows JAMusicArt Records', () => {
    renderWithRouter(<PressPage />);
    expect(screen.getAllByText(/JAMusicArt Records/i).length).toBeGreaterThan(0);
  });

  it('does NOT contain Red Mesa Records', () => {
    renderWithRouter(<PressPage />);
    expect(screen.queryByText(/red mesa records/i)).toBeNull();
  });
});
