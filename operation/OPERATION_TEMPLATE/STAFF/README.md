# Staff Section Products

This directory organizes products by staff section per FM 6-0.

## Structure

Each staff section has two subdirectories:

```
STAFF/
├── G1/           Personnel
│   ├── products/   Running estimates, staff estimates
│   └── annexes/    Annex F (personnel portion)
├── G2/           Intelligence
│   ├── products/   IPB, threat COAs, collection plans
│   └── annexes/    Annex B, Annex L
├── G3/           Operations
│   ├── products/   COAs, sync matrix, DST
│   └── annexes/    Annex A, Annex C
├── G4/           Logistics
│   ├── products/   Logistics estimates, sustainment overlay
│   └── annexes/    Annex F (logistics portion)
├── G6/           Signal
│   ├── products/   PACE plans, signal estimates
│   └── annexes/    Annex H
├── CYBER/        Cyber / EW (CEMA)
│   ├── products/   Cyber estimates, terrain analysis
│   └── annexes/    Annex C App 12/13
├── FIRES/        FSCOORD
│   ├── products/   HPTL, AGM, TSS
│   └── annexes/    Annex D
└── PROTECTION/   Protection Cell
    ├── products/   CAL, DAL, protection estimates
    └── annexes/    Annex E
```

## Usage

- **products/** — Staff section deliverables tied to MDMP steps
- **annexes/** — Formal OPORD annexes for Word export (AR 25-50)

Products are created via the dashboard Staff tab or manually as markdown files with embedded metadata:

```markdown
<!-- METADATA
sectionCode: G2
title: Intelligence Running Estimate
created: 2026-02-26
status: draft
step: 2
owner: S-2
-->
```

## Reference

- FM 6-0: Commander and Staff Organization and Operations
- See docs/doctrine/INDEX.md for full doctrine library
