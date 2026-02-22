# CyberOpsPlanner Presentation Style Guide

**Reference:** Manhattan Protocol MEL Brief (13 slides, 16:9 format)

## Presentation Specifications

### Dimensions & Layout
- **Aspect Ratio:** 16:9 (10" × 5.625")
- **Background:** Dark navy blue (RGB 0, 40, 80)
- **Visual Density:** 29-35 shapes per slide for structural elements
- **Professional military briefing aesthetic**

---

## Typography (Calibri throughout)

| Element | Size | Weight | Color | Usage |
|---------|------|--------|-------|-------|
| Operation Title | 52pt | Bold | White | Cover slide main title |
| Slide Header | 22pt | Bold | White | All content slide titles |
| Section Header | 13pt | Bold | White | Major content divisions |
| Subsection Header | 10pt | Bold | White | Secondary content divisions |
| Body Text | 11-12pt | Regular | White/Light Gray | Main content |
| Metadata/Footer | 8-9pt | Regular | Light Gray | Classification & DTG stamps |

---

## Cover Slide Structure

1. **"OPERATION" label** (20pt, light gray)
2. **Large operation name** (52pt bold, white)
3. **Role/subtitle** (14pt, white)
4. **Unit/Organization** (11pt, light gray)
5. **Location/Date** (11pt, light gray)
6. **"CONTAINS" section** with slide list (10pt bullets, white)
7. **Classification marking** (11pt bold, light gray) — left footer
8. **DTG timestamp** (9pt, light gray) — right footer

---

## Content Slide Pattern

### Header Section
- **Title:** 22pt Bold (white) with divider bar below
- **Subtitle:** 11pt (light gray) — operational context or grouping

### Body Section (3-4 major sections per slide)
- **Section Header:** 13pt Bold (white)
- **Section Content:** 11-12pt paragraph form (white)
- **Visual Separators:** Between major sections (navy RGB 0, 51, 102)
- **Content Density:** 3-4 points per section, 2-4 sentences typical

### Footer Section
- **Left:** Classification marking — "UNCLASSIFIED // FOUO" (9pt bold, light gray)
- **Center:** Organizational context (8pt, light gray)
- **Right:** Metadata/timestamp (8pt, light gray)
- **Format:** "CPT 173 // 126th CPBn // Op [Name]"

---

## Content Organization

### Hierarchical Structure
- Each slide covers **ONE major topic** with 3-4 subtopics
- Use heading-based hierarchy, not bullet lists
- Example: MISSION → PURPOSE → KEY TASKS → SUCCESS CRITERIA

### Classification & Metadata
- **Mark EVERY slide** with classification (UNCLASSIFIED // FOUO)
- Include organizational context on all content slides
- Timestamp format: DDHHMMZMONTHYEAR (e.g., 171001ZFEB2026)

### Content Density Guidelines
- **15-20 text elements** per slide
- **3-4 major sections** per slide
- **2-4 key points** per section
- Paragraph-style content with bold headers
- **Avoid excessive bullet lists** — use structured sections instead

---

## Color Scheme

| Element | RGB | Usage |
|---------|-----|-------|
| Background | (0, 40, 80) | Primary dark background |
| Text | (255, 255, 255) | Main text on dark backgrounds |
| Accents | (200, 200, 200) or (0, 51, 102) | Dividers, section separators, footers |
| Avoid | Bright colors, gradients | Keep professional military aesthetic |

---

## Example Slide Layouts

### Mission Overview Slide
```
MISSION OVERVIEW
Commander's Intent | Task | Purpose | End State

MISSION
[1-2 sentence mission statement with directive]

PURPOSE
[1-2 sentence purpose statement with intent]

KEY TASKS
- Task 1 description
- Task 2 description
- Task 3 description
- Task 4 description

FOOTER: UNCLASSIFIED // FOUO | CPT 173 // 126th CPBn | 171001ZFEB2026
```

### Threat Analysis Slide
```
THREAT ANALYSIS
APT41: State-Sponsored Cyber Espionage & Cybercrime Group

COMPOSITION
[Description of threat actor makeup and capabilities]

MOST LIKELY COA (MLCOA)
[Attack scenario description with expected objectives]

MOST DANGEROUS COA (MDCOA)
[High-impact scenario with critical infrastructure implications]

FOOTER: [same as above]
```

---

## Rules for Generation

1. **Font Consistency:**
   - Title: 22pt Bold (Calibri)
   - Section: 13pt Bold (Calibri)
   - Body: 11-12pt (Calibri)
   - Meta: 8-9pt (Calibri)
   - No other fonts

2. **Structure Pattern:**
   - Operational briefing format (not bulleted lists)
   - Heading-based organization with clear hierarchy
   - Every slide has classification + metadata footer
   - Dark background + white/light gray text

3. **Spacing & Layout:**
   - Consistent margins (0.5" sides, 0.25" top/bottom for headers)
   - Visual separators between major sections
   - Adequate whitespace; no cramping of content

4. **Slide Count & Content:**
   - Typical presentation: 12-15 slides
   - Title + body structure (not title-only)
   - Each slide self-contained and independently meaningful

---

## Generation Tools

See `generate_mdmp_professional.py` for example implementation following this style guide.

This style has been proven effective for:
- Military briefings to command staff
- Intelligence and operations planning
- Cyber operations coordination
- Multi-level professional presentation
