/**
 * Freelancer Pulse — Fiverr Parser
 * v0.0.1 — Extracts gig data from Fiverr gig pages
 */

import { BaseParser } from './base-parser';
import type { ParserResult } from '$lib/types';

export class FiverrParser extends BaseParser {
  canParse(url: string): boolean {
    return /fiverr\.com/i.test(url);
  }

  extract(): ParserResult {
    const url = this.getCurrentUrl();
    return {
      platform: 'fiverr',
      title: this.extractTitle() ?? 'Untitled Gig',
      url,
      budgetRaw: this.extractBudgetRaw() ?? undefined,
      budgetMin: this.extractBudgetMin(),
      budgetMax: this.extractBudgetMax(),
      budgetType: this.extractBudgetType(),
      clientName: this.extractSellerName() ?? undefined,
      postedDate: undefined, // Fiverr doesn't show posting dates
      description: this.extractDescription() ?? undefined,
      tags: this.extractTags(),
    };
  }

  private extractTitle(): string | null {
    return this.extractText([
      // Gig detail page
      'h1',
      '[class*="gig-title"]',
      '[class*="title"] h1',
      // Search results
      '.gig-card-layout h3 a',
      '.gig-card h3',
      '[class*="gig-card"] h3',
    ]);
  }

  private extractBudgetRaw(): string | null {
    return this.extractText([
      // Gig detail page price
      '[class*="price"]',
      'b[class*="price"]',
      '.gig-price',
      '[class*="package"] [class*="price"]',
      // Search results price
      '.gig-card [class*="price"]',
      '[class*="gig-card"] footer [class*="price"]',
    ]);
  }

  private extractBudgetMin(): number | undefined {
    const raw = this.extractBudgetRaw();
    if (!raw) return undefined;
    const match = raw.replace(/,/g, '').match(/\$?(\d+)/);
    return match ? parseInt(match[1]) : undefined;
  }

  private extractBudgetMax(): number | undefined {
    // Fiverr typically shows single price, not range
    return undefined;
  }

  private extractBudgetType(): 'fixed' | 'hourly' | 'unknown' | undefined {
    return 'fixed'; // Fiverr gigs are always fixed price
  }

  private extractSellerName(): string | null {
    return this.extractText([
      '[class*="seller-name"]',
      '[class*="seller"] a',
      '.seller-link',
      '[class*="username"]',
    ]);
  }

  private extractDescription(): string | null {
    const el = this.querySelector([
      '[class*="description"] p',
      '[class*="gig-description"]',
      '#description p',
    ]);
    if (!el) return null;
    const text = el.textContent?.trim() ?? null;
    if (text && text.length > 500) return text.substring(0, 500);
    return text;
  }

  private extractTags(): string[] {
    return this.extractAllText([
      '[class*="tag"] a',
      '.gig-tags a',
      '[class*="metadata"] a',
    ]);
  }
}
