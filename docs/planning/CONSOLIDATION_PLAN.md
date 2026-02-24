# CyberPlanner Consolidation & Cleanup Plan

**Action items to clean up legacy items and improve project organization**

---

## Overview

This document identifies specific consolidation actions recommended in `PROJECT_GUIDE.md` with implementation details and priorities.

---

## High Priority (Immediate - No Breaking Changes)

### 1. Delete Duplicate POAM Folder ✅

**Issue:** Two POAM documentation folders exist:
- `docs/poam/` (lowercase) — 1 file, minimal content
- `docs/POAMs/` (uppercase) — Complete system with examples, templates, guidance

**Action:** Delete lowercase folder completely

**Steps:**

```bash
# 1. Verify uppercase folder is complete
ls -la docs/POAMs/
# Output should show: EXAMPLES/, GUIDANCE/, TEMPLATES/, TRACKER/, README.md, INDEX.md

# 2. Backup lowercase folder (just in case)
# Manual backup: Copy docs/poam/README.md to docs/POAMs/_LEGACY/ if needed

# 3. Delete lowercase folder
rm -rf docs/poam/

# 4. Update git
git add -A
git commit -m "Remove duplicate lowercase docs/poam folder (use docs/POAMs instead)"

# 5. Verify deletion
ls docs/
# Should see: README.md, competency/, doctrine/, POAMs/, presentations/, roles/
```

**Impact:** None — uppercase folder has all content

**Time:** 5 minutes

---

### 2. Organize Doctrine PDFs ✅

**Issue:** 15 PDFs in `docs/doctrine/` at same level, difficult to navigate

**Action:** Create subfolders by doctrine category

**Current State:**
```
docs/doctrine/
├── INDEX.md
├── AGENT_INTEGRATION_GUIDE.md
├── ADP_5-0.pdf
├── FM_3-12.pdf
├── FM_2-0.pdf
├── ATP_2-01.3.pdf
├── JP_3-12.pdf
├── JP_2-0.pdf
├── MITRE_ATT&CK.pdf
├── NICE_Framework.pdf
└── [10 more PDFs mixed in]
```

**Target Structure:**
```
docs/doctrine/
├── INDEX.md (updated with new structure)
├── AGENT_INTEGRATION_GUIDE.md
├── _CORE-DOCTRINE/
│   ├── ADP_5-0.pdf
│   ├── FM_2-0.pdf
│   ├── FM_3-12.pdf
│   └── FM_3-13.pdf
├── _JOINT-DOCTRINE/
│   ├── JP_2-0.pdf
│   ├── JP_2-01.3.pdf
│   └── JP_3-12.pdf
├── _FRAMEWORKS/
│   ├── MITRE_ATT&CK.pdf
│   └── NICE_Framework.pdf
└── _REFERENCES/
    ├── ATP_series/
    ├── TRADOC_guides/
    └── Best_practices/
```

**Steps:**

```bash
cd docs/doctrine/

# 1. Create subfolders
mkdir _CORE-DOCTRINE
mkdir _JOINT-DOCTRINE
mkdir _FRAMEWORKS
mkdir _REFERENCES

# 2. Move PDFs
mv ADP*.pdf _CORE-DOCTRINE/
mv FM*.pdf _CORE-DOCTRINE/
mv JP*.pdf _JOINT-DOCTRINE/
mv MITRE*.pdf _FRAMEWORKS/
mv NICE*.pdf _FRAMEWORKS/
mv ATP*.pdf _REFERENCES/
mv *TRADOC*.pdf _REFERENCES/
mv *Best*.pdf _REFERENCES/

# 3. Update git
cd ../..
git add -A
git commit -m "Organize doctrine PDFs by category (core, joint, frameworks, references)"

# 4. Update INDEX.md with new navigation
```

**Update INDEX.md to reference new structure:**

```markdown
## Navigation

### Core U.S. Army Doctrine
See: `_CORE-DOCTRINE/`
- ADP 5-0 (Operations Process)
- FM 2-0 (Intelligence)
- FM 3-12 (Cyber Operations)

### Joint Doctrine
See: `_JOINT-DOCTRINE/`
- JP 2-0 (Joint Intelligence)
- JP 3-12 (Joint Cyber Operations)

### Frameworks & Standards
See: `_FRAMEWORKS/`
- MITRE ATT&CK Framework
- NICE Workforce Framework

### Supporting References
See: `_REFERENCES/`
- ATP series (Army Techniques Publications)
- TRADOC guidance
```

**Impact:** Better navigation, no breaking changes

**Time:** 15 minutes

---

## Medium Priority (Quality Improvement)

### 3. Create Dashboard Documentation Hub ✅

**Issue:** Dashboard documentation scattered across root:
- `DASHBOARD_README.md` (operations dashboard)
- `EXPORT_ANNEXES_README.md` (export feature)
- `IMPLEMENTATION_SUMMARY.md` (export summary)
- `QUICK_START_EXPORT.txt` (export quick start)

**Action:** Create organized docs/dashboards/ folder

**Target Structure:**
```
docs/dashboards/
├── README.md (index of all dashboards)
├── operations-dashboard.md (detailed guide for operations dashboard)
├── mdmp-dashboard.md (detailed guide for MDMP dashboard)
├── export-feature.md (move EXPORT_ANNEXES_README.md content)
└── QUICK_START.txt (quick reference)
```

**Steps:**

```bash
# 1. Create new folder
mkdir docs/dashboards/

# 2. Create README.md linking to all resources
cat > docs/dashboards/README.md << 'EOF'
# CyberPlanner Dashboards

Three interactive dashboards available:

## Operations Dashboard
**File:** ../dashboard.html
**Purpose:** Real-time tracking of incidents, POAMs, threat intelligence
**Access:** http://localhost:3000

## MDMP Planning Dashboard
**File:** ../mdmp-dashboard.html
**Purpose:** 7-step MDMP process, planning products, export annexes
**Access:** http://localhost:3000/mdmp-dashboard.html

## Export Features (Word Documents)
**Feature:** Export annexes as AR 25-50 compliant .docx files
**Access:** MDMP dashboard → Export section
**Documentation:** See ../EXPORT_ANNEXES_README.md

## Quick Start
See QUICK_START.txt for rapid deployment
EOF

# 3. Copy export documentation
cp EXPORT_ANNEXES_README.md docs/dashboards/export-feature.md
cp QUICK_START_EXPORT.txt docs/dashboards/QUICK_START.txt

# 4. Create detailed guides (or link to originals)
# Option A: Create new detailed guides
# Option B: Link to originals in root (keep for now)

# 5. Keep originals in root for now (add in next step)
# This allows backward compatibility

# 6. Update main docs/README.md to point here
```

**Update `docs/README.md`:**

```markdown
### 📊 Dashboards & Visualization
Complete guides for all CyberPlanner dashboards:

- **[Dashboards Index](./dashboards/README.md)** — Overview of all dashboards
- **[Operations Dashboard](./dashboards/README.md)** — Real-time incident tracking
- **[MDMP Planning Dashboard](./dashboards/README.md)** — Interactive planning process
- **[Export to Word Documents](./dashboards/export-feature.md)** — AR 25-50 compliance
```

**Impact:** Better organization, improved navigation

**Time:** 20 minutes

---

### 4. Update Main README.md Navigation

**Issue:** Main `README.md` doesn't reference new dashboards and export features

**Action:** Add sections for new capabilities

**Add to README.md after "Features" section:**

```markdown
## NEW: Dashboards & Visualization

### MDMP Planning Dashboard
Interactive 7-step planning process visualization with export capability:
- 32+ planning products organized by step
- 6 critical decision gates
- Export annexes as AR 25-50 compliant Word documents

```bash
node server.js
# Visit: http://localhost:3000/mdmp-dashboard.html
```

### Operations Dashboard
Real-time tracking of incidents, POAMs, and threat intelligence:
- Multi-tab interface (Overview, Operations, POAMs, Incidents, Intelligence, Timeline)
- Color-coded severity indicators
- Live POAM progress tracking

```bash
node server.js
# Visit: http://localhost:3000/
```

### Word Document Export
Export operational annexes with military formatting compliance:
- AR 25-50 compliant formatting
- UNCLASSIFIED // FOUO marking
- 1-inch margins, professional style
- Annex M (Cyber Operations), Annex A (Task Organization)

See [EXPORT_ANNEXES_README.md](./EXPORT_ANNEXES_README.md) for details.
```

**Impact:** Improved discoverability

**Time:** 10 minutes

---

## Low Priority (Housekeeping)

### 5. Annotate Python Script as Secondary Option

**Issue:** `generate_mdmp_professional.py` appears unused, but may be valuable as fallback

**Action:** Add README note, keep script but mark as secondary

**Steps:**

```bash
# 1. Create docs/presentations/README_PRESENTATIONS.md
cat > docs/presentations/README_PRESENTATIONS.md << 'EOF'
# Presentation Generation

Two options for creating operational briefings:

## PRIMARY: HTML Dashboard (Recommended)
**File:** mdmp-dashboard.html
**Advantages:**
- Interactive, real-time updates
- No software required (browser only)
- Responsive on all devices
- Instant generation

**Usage:**
```bash
node server.js
# Visit: http://localhost:3000/mdmp-dashboard.html
```

## SECONDARY: PowerPoint Generator (Legacy/Fallback)
**File:** generate_mdmp_professional.py
**Use When:**
- Offline briefing required
- PowerPoint-specific features needed
- Formal hardcopy distribution needed

**Advantages:**
- Creates static PowerPoint file
- Suitable for printing
- Compatible with all systems

**Usage:**
```bash
python generate_mdmp_professional.py
```

## Style Guide
See [PRESENTATION_STYLE_GUIDE.md](./PRESENTATION_STYLE_GUIDE.md) for:
- Color schemes (dark theme)
- Typography standards
- Layout guidelines
- Formatting rules
EOF

# 2. Update PRESENTATION_STYLE_GUIDE.md with note
# Add at top:
# "Note: This style guide applies to both HTML dashboard and PowerPoint generator.
#  For primary workflow, use mdmp-dashboard.html (interactive).
#  For offline presentations, generate_mdmp_professional.py provides static output."

# 3. Update docs/README.md
```

**Impact:** Clarifies tool usage hierarchy

**Time:** 15 minutes

---

## Implementation Checklist

### Phase 1: Quick Wins (30 minutes)
- [ ] Delete `docs/poam/` folder
- [ ] Commit deletion
- [ ] Organize `docs/doctrine/` PDFs
- [ ] Update `docs/doctrine/INDEX.md`
- [ ] Commit organization changes

### Phase 2: Documentation Improvement (45 minutes)
- [ ] Create `docs/dashboards/` folder structure
- [ ] Create `docs/dashboards/README.md`
- [ ] Update `docs/README.md` navigation
- [ ] Annotate presentation options
- [ ] Update main `README.md`
- [ ] Commit all documentation changes

### Phase 3: Verification (15 minutes)
- [ ] Verify all links work
- [ ] Test navigation from docs/README.md
- [ ] Check main README.md structure
- [ ] Review git commits
- [ ] Commit final updates

**Total Time:** ~90 minutes

---

## Execution Commands (All-In-One)

```bash
#!/bin/bash
# Complete consolidation in one shot

cd "C:\Users\Avalon\Nextcloud\Projects\CyberPlanner"

# Phase 1: Delete and organize
echo "Phase 1: Cleanup..."
rm -rf docs/poam/
mkdir -p docs/doctrine/_CORE-DOCTRINE
mkdir -p docs/doctrine/_JOINT-DOCTRINE
mkdir -p docs/doctrine/_FRAMEWORKS
mkdir -p docs/doctrine/_REFERENCES

# Move doctrine PDFs (adjust paths as needed)
# mv docs/doctrine/ADP*.pdf docs/doctrine/_CORE-DOCTRINE/
# mv docs/doctrine/FM*.pdf docs/doctrine/_CORE-DOCTRINE/
# etc.

echo "Phase 1 complete. Commit now:"
echo "  git add -A"
echo "  git commit -m 'Phase 1: Remove duplicate POAM folder and organize doctrine PDFs'"

# Phase 2: Create new structure
echo "Phase 2: Create documentation hub..."
mkdir -p docs/dashboards/
cp EXPORT_ANNEXES_README.md docs/dashboards/export-feature.md
cp QUICK_START_EXPORT.txt docs/dashboards/QUICK_START.txt

echo "Phase 2 complete. Commit now:"
echo "  git add -A"
echo "  git commit -m 'Phase 2: Create docs/dashboards documentation hub'"

# Phase 3: Done
echo "Consolidation complete!"
echo "Next: Review and update README files manually"
```

---

## Rollback Plan

If consolidation causes issues:

```bash
# Rollback to previous state
git revert [commit-hash]

# Or reset to state before consolidation
git reset --hard [previous-commit]

# Re-run consolidation with fixes
```

---

## Success Criteria

After consolidation:

✅ No duplicate documentation folders
✅ Doctrine PDFs organized by category
✅ Dashboard documentation in dedicated folder
✅ All links functional
✅ Navigation improved
✅ Project structure cleaner
✅ No breaking changes
✅ Git history clean

---

## Notes

- **Backward Compatibility:** Keep original files in root for 1-2 releases before full cleanup
- **Links:** Update all references systematically
- **Testing:** Verify all links work after reorganization
- **Communication:** Update PROJECT_GUIDE.md after consolidation complete

---

**Estimated Total Time:** 90 minutes

**Risk Level:** LOW (no breaking changes)

**Recommended:** Execute Phase 1 + 2 immediately, Phase 3 before next release

---

**Last Updated:** 2026-02-24

**Classification:** UNCLASSIFIED // FOUO
