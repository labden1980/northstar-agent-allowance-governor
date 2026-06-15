import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('Checkpoint 1 scaffold', () => {
  it('renders the scaffold content', () => {
    const html = renderToStaticMarkup(React.createElement(App));

    expect(html).toContain('NorthStar Agent Allowance Governor');
    expect(html).toContain('A Solana allowance demo for controlled AI-agent spending');
    expect(html).toContain('Simulation Mode');
    expect(html).toContain('Checkpoint 1 scaffold complete');
  });
});
