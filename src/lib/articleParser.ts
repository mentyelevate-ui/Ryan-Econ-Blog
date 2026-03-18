/**
 * Article Parser — Intelligent Content Structure Detection
 * 
 * Transforms raw text (from PDF extraction or manual paste) into a structured
 * array of typed content blocks, enabling WSJ-grade typographic rendering.
 * 
 * Detection patterns mirror academic/financial paper conventions:
 *   - ALL CAPS lines → Section Headings
 *   - First paragraph → Lede (drop cap)
 *   - Subsequent paragraphs → Body (indented)
 *   - Lines with citation patterns → Citations
 *   - Pipe-delimited lines → Tables
 *   - Equation-like patterns → Equations
 *   - Quoted text → Pull Quotes
 *   - `---` or `***` → Section Dividers
 */

export type BlockType =
    | "lede"
    | "paragraph"
    | "heading"
    | "subheading"
    | "pull-quote"
    | "equation"
    | "citation"
    | "table"
    | "divider"
    | "list";

export interface ContentBlock {
    type: BlockType;
    content: string;
    /** For tables: parsed rows */
    rows?: string[][];
    /** For tables: parsed headers */
    headers?: string[];
    /** For lists: parsed items */
    items?: string[];
}

// --- Detection Helpers ---

function isAllCaps(line: string): boolean {
    const cleaned = line.replace(/[^a-zA-Z]/g, "");
    return cleaned.length > 3 && cleaned === cleaned.toUpperCase();
}

function isSectionDivider(line: string): boolean {
    const trimmed = line.trim();
    return /^[-*=_]{3,}$/.test(trimmed);
}

function isEquation(text: string): boolean {
    // Detects econometric/math patterns
    const equationPatterns = [
        /[=+\-*/^].*[=+\-*/^]/, // Multiple operators
        /\b(ln|log|Σ|β|α|ε|Δ|∂|∫)\b/i,  // Math symbols
        /\b(HPI|GDP|CPI|IR)\s*[=~]/i,  // Variable = ...
        /\^{?\d+}?/,  // Exponents
        /_{?\d+}?/,  // Subscripts
        /\(.*[βαε].*\)/,  // Greek letters in parens
    ];
    return equationPatterns.some(p => p.test(text));
}

function isCitation(text: string): boolean {
    const citationPatterns = [
        /\([A-Z][a-z]+,?\s*\d{4}\)/,  // (Author, 2024)
        /\([A-Z][a-z]+ (?:and|&) [A-Z][a-z]+,?\s*\d{4}\)/,  // (Author and Author, 2024)
        /^(?:Source|Sources|References?|Note|Data):/i,  // Source: ...
        /^(?:Bureau|Department|Federal|National|U\.S\.).*(?:\d{4}|\(\d{4}\))/i,  // Bureau of ... (2024)
    ];
    return citationPatterns.some(p => p.test(text));
}

function isPullQuote(text: string): boolean {
    const trimmed = text.trim();
    return (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith('\u201C') && trimmed.endsWith('\u201D')) ||
        trimmed.startsWith('—') ||
        trimmed.startsWith('> ')
    );
}

function isTableBlock(text: string): boolean {
    const lines = text.split('\n').filter(l => l.trim());
    return lines.length >= 2 && lines.every(l => l.includes('|'));
}

function isList(text: string): boolean {
    const lines = text.split('\n').filter(l => l.trim());
    return lines.length >= 2 && lines.every(l =>
        /^\s*[-•●◦▪]\s/.test(l) || /^\s*\d+[.)]\s/.test(l)
    );
}

function isShortHeading(text: string): boolean {
    const trimmed = text.trim();
    // Short lines (under 80 chars) that don't end with a period are likely headings
    return (
        trimmed.length > 3 &&
        trimmed.length < 80 &&
        !trimmed.endsWith('.') &&
        !trimmed.endsWith(',') &&
        !trimmed.endsWith(';') &&
        !trimmed.includes('|') &&
        !/^\d/.test(trimmed)
    );
}

// --- Table Parser ---

function parseTable(text: string): { headers: string[]; rows: string[][] } {
    const lines = text.split('\n').filter(l => l.trim());
    const parseLine = (line: string) =>
        line.split('|').map(c => c.trim()).filter(c => c.length > 0);

    const headers = parseLine(lines[0]);
    // Skip separator line (if it's all dashes)
    const startIdx = lines[1] && /^[\s|:-]+$/.test(lines[1]) ? 2 : 1;
    const rows = lines.slice(startIdx).map(parseLine);

    return { headers, rows };
}

// --- List Parser ---

function parseList(text: string): string[] {
    return text
        .split('\n')
        .filter(l => l.trim())
        .map(l => l.replace(/^\s*[-•●◦▪]\s*/, '').replace(/^\s*\d+[.)]\s*/, '').trim());
}

// --- Main Parser ---

export function parseArticleContent(rawText: string): ContentBlock[] {
    if (!rawText || typeof rawText !== 'string') return [];

    const blocks: ContentBlock[] = [];
    
    // Split on double newlines to get paragraph-level chunks
    const chunks = rawText
        .replace(/\r\n/g, '\n')
        .split(/\n{2,}/)
        .map(c => c.trim())
        .filter(c => c.length > 0);

    let isFirstParagraph = true;

    for (const chunk of chunks) {
        // --- Section Divider ---
        if (isSectionDivider(chunk)) {
            blocks.push({ type: "divider", content: "" });
            continue;
        }

        // --- Table ---
        if (isTableBlock(chunk)) {
            const { headers, rows } = parseTable(chunk);
            blocks.push({ type: "table", content: chunk, headers, rows });
            continue;
        }

        // --- List ---
        if (isList(chunk)) {
            const items = parseList(chunk);
            blocks.push({ type: "list", content: chunk, items });
            continue;
        }

        // --- Equation ---
        if (isEquation(chunk) && chunk.length < 300) {
            blocks.push({ type: "equation", content: chunk.trim() });
            continue;
        }

        // --- Pull Quote ---
        if (isPullQuote(chunk)) {
            const cleaned = chunk
                .replace(/^>\s*/gm, '')
                .replace(/^[""\u201C]|[""\u201D]$/g, '')
                .replace(/^—\s*/, '')
                .trim();
            blocks.push({ type: "pull-quote", content: cleaned });
            continue;
        }

        // --- Citation ---
        if (isCitation(chunk) && chunk.length < 200) {
            blocks.push({ type: "citation", content: chunk.trim() });
            continue;
        }

        // --- ALL CAPS Heading ---
        if (isAllCaps(chunk) && chunk.length < 120) {
            blocks.push({ type: "heading", content: chunk.trim() });
            isFirstParagraph = false;
            continue;
        }

        // --- Markdown-style heading ---
        if (chunk.startsWith('## ')) {
            blocks.push({ type: "heading", content: chunk.replace(/^##\s*/, '').trim() });
            isFirstParagraph = false;
            continue;
        }
        if (chunk.startsWith('### ')) {
            blocks.push({ type: "subheading", content: chunk.replace(/^###\s*/, '').trim() });
            continue;
        }

        // --- Short Heading Detection ---
        // A short line followed by nothing else in the chunk
        const chunkLines = chunk.split('\n').filter(l => l.trim());
        if (chunkLines.length === 1 && isShortHeading(chunk)) {
            // Check: is this really a heading or just a short paragraph?
            // Headings are typically title-cased or ALL CAPS
            const words = chunk.trim().split(/\s+/);
            const capitalizedRatio = words.filter(w => /^[A-Z]/.test(w)).length / words.length;
            if (capitalizedRatio > 0.5 || chunk.trim().endsWith(':')) {
                blocks.push({ type: "subheading", content: chunk.trim() });
                continue;
            }
        }

        // --- Lede (First real paragraph) ---
        if (isFirstParagraph && chunk.length > 40) {
            blocks.push({ type: "lede", content: chunk.trim() });
            isFirstParagraph = false;
            continue;
        }

        // --- Standard Paragraph ---
        blocks.push({ type: "paragraph", content: chunk.trim() });
        isFirstParagraph = false;
    }

    return blocks;
}
