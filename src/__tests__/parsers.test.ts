import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { UpworkParser } from '$content/parsers/upwork-parser';
import { FiverrParser } from '$content/parsers/fiverr-parser';

// Helper to set up DOM with HTML fixture
function setupDOM(html: string, url: string = 'https://www.upwork.com/jobs/~test123') {
  const dom = new JSDOM(html, { url });
  Object.assign(globalThis, {
    document: dom.window.document,
    window: dom.window,
    location: dom.window.location,
    MutationObserver: dom.window.MutationObserver,
  });
}

// ─── Upwork Fixtures ────────────────────────────────────

const UPWORK_JOB_DETAIL = `
<div>
  <h1 class="heading">Build a React Dashboard for E-commerce</h1>
  <span data-test="job-amount">$500-$1,000</span>
  <a data-test="client-info">Acme Corp</a>
  <span data-test="job-posted-date">Posted 3 days ago</span>
  <div data-test="job-description-text">
    Looking for an experienced React developer to build a real-time dashboard for our e-commerce platform.
    Must have experience with TypeScript, Chart.js, and WebSocket integrations.
  </div>
  <div data-test="job-traits">
    <span>React</span>
    <span>TypeScript</span>
    <span>Dashboard</span>
  </div>
</div>
`;

const UPWORK_HOURLY = `
<div>
  <h1 class="heading">Full-Stack Developer Needed</h1>
  <span data-test="job-amount">$50-$100/hr</span>
  <div data-test="job-traits"><span>Node.js</span></div>
</div>
`;

const UPWORK_MINIMAL = `
<div>
  <h1>Simple Task</h1>
</div>
`;

// ─── Fiverr Fixtures ────────────────────────────────────

const FIVERR_GIG_DETAIL = `
<div>
  <h1>I will design a professional logo for your brand</h1>
  <b class="price">$50</b>
  <div class="seller-name">CreativeDesigner</div>
  <div class="description"><p>Professional logo design with 3 revisions and fast delivery.</p></div>
  <div class="tag"><a>logo</a><a>branding</a><a>design</a></div>
</div>
`;

const FIVERR_MINIMAL = `
<div>
  <h1>Basic Gig</h1>
</div>
`;

describe('UpworkParser', () => {
  let parser: UpworkParser;

  beforeEach(() => {
    parser = new UpworkParser();
  });

  it('canParse matches job detail URL', () => {
    expect(parser.canParse('https://www.upwork.com/jobs/~0123abc')).toBe(true);
  });

  it('canParse matches search URL', () => {
    expect(parser.canParse('https://www.upwork.com/nx/search/jobs/?q=react')).toBe(true);
  });

  it('canParse rejects non-Upwork URLs', () => {
    expect(parser.canParse('https://www.fiverr.com/test')).toBe(false);
  });

  it('extracts full job details', () => {
    setupDOM(UPWORK_JOB_DETAIL);
    const result = parser.extract();

    expect(result.platform).toBe('upwork');
    expect(result.title).toBe('Build a React Dashboard for E-commerce');
    expect(result.budgetRaw).toBe('$500-$1,000');
    expect(result.budgetMin).toBe(500);
    expect(result.budgetMax).toBe(1000);
    expect(result.budgetType).toBe('fixed');
    expect(result.clientName).toBe('Acme Corp');
    expect(result.tags).toEqual(['React', 'TypeScript', 'Dashboard']);
  });

  it('extracts hourly budget', () => {
    setupDOM(UPWORK_HOURLY);
    const result = parser.extract();

    expect(result.budgetRaw).toBe('$50-$100/hr');
    expect(result.budgetType).toBe('hourly');
    expect(result.budgetMin).toBe(50);
  });

  it('handles minimal page gracefully', () => {
    setupDOM(UPWORK_MINIMAL);
    const result = parser.extract();

    expect(result.title).toBe('Simple Task');
    expect(result.platform).toBe('upwork');
    // Optional fields should be null/undefined/empty — never crash
    expect(result.tags).toEqual([]);
  });
});

describe('FiverrParser', () => {
  let parser: FiverrParser;

  beforeEach(() => {
    parser = new FiverrParser();
  });

  it('canParse matches Fiverr URL', () => {
    expect(parser.canParse('https://www.fiverr.com/user/design-logo')).toBe(true);
  });

  it('canParse rejects non-Fiverr URLs', () => {
    expect(parser.canParse('https://www.upwork.com/jobs/test')).toBe(false);
  });

  it('extracts full gig details', () => {
    setupDOM(FIVERR_GIG_DETAIL, 'https://www.fiverr.com/creativesdesigner/design-logo');
    const result = parser.extract();

    expect(result.platform).toBe('fiverr');
    expect(result.title).toBe('I will design a professional logo for your brand');
    expect(result.budgetRaw).toBe('$50');
    expect(result.budgetMin).toBe(50);
    expect(result.budgetType).toBe('fixed');
    expect(result.clientName).toBe('CreativeDesigner');
    expect(result.tags).toEqual(['logo', 'branding', 'design']);
  });

  it('handles minimal page gracefully', () => {
    setupDOM(FIVERR_MINIMAL, 'https://www.fiverr.com/test');
    const result = parser.extract();

    expect(result.title).toBe('Basic Gig');
    expect(result.platform).toBe('fiverr');
    expect(result.tags).toEqual([]);
  });
});
