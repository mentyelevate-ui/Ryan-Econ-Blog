/**
 * Article Parser v2 — PDF-Aware Content Structure Detection
 * 
 * Designed specifically for academic/economic research papers extracted from PDFs.
 * 
 * Key PDF challenges this handles:
 *   1. Single \n line breaks that are column wraps, NOT paragraph breaks
 *   2. Page header/footer artifacts (e.g. "Renfro and Seymour 2")
 *   3. Section headings that end with colons or are in title case
 *   4. Equations with Greek letters and mathematical operators
 *   5. Bullet lists using ● or • markers
 *   6. References sections at the end
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
    | "list"
    | "reference";

export interface ContentBlock {
    type: BlockType;
    content: string;
    rows?: string[][];
    headers?: string[];
    items?: string[];
}

// --- PDF Text Cleaning ---

/**
 * Strips known page header/footer artifacts from PDF extraction.
 * These are typically "AuthorName PageNumber" patterns that appear on every page.
 */
function stripPageHeaders(text: string): string {
    // Remove lines like "Renfro and Seymour 2", "Smith et al. 5", "AuthorName 12"
    return text.replace(/^[A-Z][a-z]+(?:\s+(?:and|&|et\s+al\.?)\s+[A-Z][a-z]+)*\s+\d+\s*$/gm, '');
}

/**
 * Re-flows PDF column-wrapped text into proper paragraphs.
 * 
 * PDF extractors break lines at column boundaries (~75 chars), so:
 *   "This is a sentence that was\nbroken by the PDF column boundary."
 * becomes:
 *   "This is a sentence that was broken by the PDF column boundary."
 * 
 * BUT real paragraph breaks (indicated by blank lines, or lines ending with 
 * a period followed by a line starting with a capital letter) are preserved.
 */
function reflowParagraphs(text: string): string[] {
    const lines = text.split('\n');
    const paragraphs: string[] = [];
    let currentPara = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const nextLine = lines[i + 1]?.trim() || '';

        // Empty line = definite paragraph break
        if (line === '') {
            if (currentPara.trim()) {
                paragraphs.push(currentPara.trim());
                currentPara = '';
            }
            continue;
        }

        // If current paragraph is empty, start a new one
        if (!currentPara) {
            currentPara = line;
            continue;
        }

        // Decide: is this a continuation of the current paragraph or a new one?
        const isParagraphBreak = (
            // Previous line ends with period/colon and next starts with capital = likely new paragraph
            (/[.!?:]\s*$/.test(currentPara) && /^[A-Z""]/.test(line) && !isLikelyContinuation(currentPara, line)) ||
            // Line is a heading pattern (discussed below)
            isHeadingLine(line) ||
            // Line is a bullet point
            /^[●•▪◦-]\s/.test(line) ||
            // Line starts an equation
            isEquationLine(line) ||
            // Previous line was a heading
            isHeadingLine(currentPara.split('\n').pop() || '')
        );

        if (isParagraphBreak) {
            if (currentPara.trim()) {
                paragraphs.push(currentPara.trim());
            }
            currentPara = line;
        } else {
            // Continuation: join with a space
            currentPara += ' ' + line;
        }
    }

    if (currentPara.trim()) {
        paragraphs.push(currentPara.trim());
    }

    return paragraphs;
}

/**
 * Checks if the next line is likely a continuation of the current sentence
 * (i.e., the period at the end of currentPara is mid-sentence, like "U.S.")
 */
function isLikelyContinuation(current: string, next: string): boolean {
    // Common abbreviations that end with periods but don't end sentences
    const abbrevPatterns = /(?:U\.S\.|Dr\.|Mr\.|Mrs\.|Ms\.|Jr\.|Sr\.|Inc\.|Corp\.|Ltd\.|vs\.|etc\.|i\.e\.|e\.g\.|al\.)\s*$/;
    if (abbrevPatterns.test(current)) return true;

    // If the current line is very short (< 50 chars) it's probably a wrapped line
    if (current.length < 50 && !isHeadingLine(current)) return true;

    // If next line starts with lowercase, it's a continuation
    if (/^[a-z]/.test(next)) return true;

    return false;
}

// --- Content Type Detection ---

function isHeadingLine(line: string): boolean {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length > 120) return false;

    // Markdown headings
    if (/^#{1,4}\s/.test(trimmed)) return true;

    // Lines ending with a colon that are short enough to be headings
    if (trimmed.endsWith(':') && trimmed.length < 100) return true;

    // ALL CAPS with more than 3 letters
    const lettersOnly = trimmed.replace(/[^a-zA-Z]/g, '');
    if (lettersOnly.length > 3 && lettersOnly === lettersOnly.toUpperCase() && trimmed.length < 100) return true;

    return false;
}

function isEquationLine(line: string): boolean {
    const trimmed = line.trim();
    return (
        /[βα∂Σε₁₂₃₄]/.test(trimmed) ||
        (/=/.test(trimmed) && /[()+-]/.test(trimmed) && trimmed.length < 200 && /^[A-Z]/.test(trimmed))
    );
}

function isCitationBlock(text: string): boolean {
    return (
        /^"/.test(text.trim()) && /\d{4}/.test(text) && /[A-Z][a-z]+,/.test(text)
    );
}

function isReferenceEntry(text: string): boolean {
    return /^[A-Z][a-z]+,\s+[A-Z]/.test(text.trim()) && /\d{4}/.test(text);
}

function isBulletList(text: string): boolean {
    return /^[●•▪◦-]\s/.test(text.trim());
}

function isTableBlock(text: string): boolean {
    const lines = text.split('\n').filter(l => l.trim());
    return lines.length >= 2 && lines.every(l => l.includes('|'));
}

function parseTable(text: string): { headers: string[]; rows: string[][] } {
    const lines = text.split('\n').filter(l => l.trim());
    const parseLine = (line: string) =>
        line.split('|').map(c => c.trim()).filter(c => c.length > 0);
    const headers = parseLine(lines[0]);
    const startIdx = lines[1] && /^[\s|:-]+$/.test(lines[1]) ? 2 : 1;
    const rows = lines.slice(startIdx).map(parseLine);
    return { headers, rows };
}

// --- Main Parser ---

export function parseArticleContent(rawText: string): ContentBlock[] {
    if (!rawText || typeof rawText !== 'string') return [];

    const blocks: ContentBlock[] = [];

    // Step 1: Clean PDF artifacts
    let cleaned = stripPageHeaders(rawText);

    // Step 2: Reflow into proper paragraphs
    const paragraphs = reflowParagraphs(cleaned);

    let isFirstRealParagraph = true;
    let inReferences = false;

    for (const para of paragraphs) {
        const trimmed = para.trim();
        if (!trimmed) continue;

        // --- References Section Detection ---
        if (/^References:?\s*$/i.test(trimmed) || /^Works?\s+Cited:?\s*$/i.test(trimmed)) {
            inReferences = true;
            blocks.push({ type: "heading", content: "References" });
            continue;
        }

        if (inReferences) {
            blocks.push({ type: "reference", content: trimmed });
            continue;
        }

        // --- Table ---
        if (isTableBlock(trimmed)) {
            const { headers, rows } = parseTable(trimmed);
            blocks.push({ type: "table", content: trimmed, headers, rows });
            continue;
        }

        // --- Bullet List (collect consecutive bullets) ---
        if (isBulletList(trimmed)) {
            // This paragraph might contain multiple bullet items if they weren't separated
            const items = trimmed.split(/\n/).map(l => 
                l.replace(/^[●•▪◦-]\s*/, '').trim()
            ).filter(l => l);
            blocks.push({ type: "list", content: trimmed, items });
            continue;
        }

        // --- Equation ---
        if (isEquationLine(trimmed) && trimmed.length < 300) {
            blocks.push({ type: "equation", content: trimmed });
            continue;
        }

        // --- Heading ---
        if (isHeadingLine(trimmed)) {
            const headingText = trimmed
                .replace(/^#{1,4}\s*/, '')  // strip markdown
                .replace(/:$/, '');          // strip trailing colon for cleaner display
            
            blocks.push({ type: "heading", content: headingText });
            isFirstRealParagraph = false;
            continue;
        }

        // --- Citation Pattern (inline) ---
        if (isCitationBlock(trimmed) && trimmed.length < 300) {
            blocks.push({ type: "citation", content: trimmed });
            continue;
        }

        // --- Lede (first substantial paragraph) ---
        if (isFirstRealParagraph && trimmed.length > 60) {
            blocks.push({ type: "lede", content: trimmed });
            isFirstRealParagraph = false;
            continue;
        }

        // --- Standard Paragraph ---
        blocks.push({ type: "paragraph", content: trimmed });
        isFirstRealParagraph = false;
    }

    return blocks;
}
