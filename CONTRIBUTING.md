# Contributing to CyberOpsPlanner

Thank you for your interest in improving CyberOpsPlanner! This document outlines how to contribute.

---

## Code of Conduct

- Maintain **unclassified discipline** at all times
- Respect **U.S. Army and Joint doctrine** as authoritative sources
- Do not contribute classified information or operational details
- Be professional and collegiate in all interactions

---

## Types of Contributions

### 1. Documentation Improvements
- Clarify existing guides (ROLES.md, competency matrices, etc.)
- Fix typos or inaccuracies
- Add examples or use cases
- Improve diagrams or formatting

**How to contribute:**
1. Fork the repository
2. Edit documentation files
3. Submit a pull request with description of changes

### 2. Doctrine Alignment & Updates
- Suggest updates based on new Army/Joint publications
- Propose doctrine citations
- Request clarification on doctrine application

**How to contribute:**
1. Reference specific publication and paragraph
2. Explain alignment issue or update
3. Submit via issue or pull request

### 3. Role Enhancements
- Propose new competencies for existing roles
- Suggest expanded use cases or workflows
- Recommend task-role mappings

**How to contribute:**
1. Submit an issue describing enhancement
2. Include doctrinal reference if applicable
3. Provide use case or example
4. Discussion with maintainers before pull request

### 4. Integration Examples
- Share examples of integration with planning tools
- Document integration with SIEM/NDR/EDR platforms
- Contribute scenario packages or training materials

**How to contribute:**
1. Create example files in `examples/` or `scenarios/`
2. Document setup and usage
3. Submit pull request with clear description

### 5. Translations / Adaptations
- Adapt for other Services (Navy, Air Force, Space, etc.)
- Translate for coalition partners (Australian, Canadian, UK, etc.)
- Customize for other organizations' doctrines

**How to contribute:**
1. Create a branch for your adaptation
2. Clearly indicate which doctrine/organization it targets
3. Maintain backward compatibility with original
4. Submit pull request for discussion

---

## Before You Start

1. **Check existing issues & pull requests** — Avoid duplicate work
2. **Read CLAUDE.md** — Understand the doctrinal foundation
3. **Review ROLES.md** — Understand role scope and boundaries
4. **Check current doctrine** — Use latest Army/Joint publications

---

## Contribution Workflow

### Step 1: Fork & Branch
```bash
git clone https://github.com/your-username/cyberopsplanner.git
cd cyberopsplanner
git checkout -b feature/your-feature-name
```

### Step 2: Make Your Changes
- Edit documentation or YAML files
- Test your changes (if applicable)
- Maintain consistent formatting and style

### Step 3: Commit
```bash
git add .
git commit -m "Describe your changes clearly"
```

**Commit message format:**
```
Brief summary (50 chars)

Detailed explanation if needed.
- Reference doctrine (e.g., ADP 5-0, para 2-14)
- Explain why change is needed
- List any related issues (#123)
```

### Step 4: Push & Create Pull Request
```bash
git push origin feature/your-feature-name
```

Visit GitHub to create a pull request. Include:
- **Title:** Clear, concise description
- **Description:** What changed and why
- **Doctrinal references:** Any relevant publications
- **Testing:** How you validated the change

### Step 5: Respond to Review
- Maintainers may request changes
- Be ready to clarify or defend doctrinal choices
- Iterate until approval

---

## Style Guide

### Documentation
- Use **markdown** for all documentation
- Structure with clear headings (##, ###)
- Use **bold** for emphasis, **code** for technical terms
- Include doctrinal references in parentheses: (FM 3-12, para 1-45)
- Keep paragraphs short and scannable

### YAML
- Use **consistent indentation** (2 spaces)
- Maintain role structure (name, description, command, aliases, system_prompt, default_model)
- Keep system prompts focused and concise

### Doctrinal References
- Use official publication titles and paragraph numbers
- Example: "ADP 5-0, The Operations Process, page 15"
- Link to doctrinal sources if publicly available

---

## Unclassified Discipline

**DO NOT COMMIT:**
- Classified information or FOUO material
- Specific classified operation details
- Names of classified entities or programs
- Classified TTPs or exploitation techniques
- Classified weapons systems details

**DO COMMIT:**
- Unclassified doctrine and principles
- General threat model discussions
- Publicly releasable capability discussions
- Framework and integration concepts
- Training and example materials

---

## Pull Request Checklist

Before submitting a pull request:

- [ ] I have read CLAUDE.md and understand the doctrinal foundation
- [ ] I have reviewed existing issues/PRs to avoid duplication
- [ ] My changes align with U.S. Army or Joint doctrine
- [ ] I have not included classified or sensitive information
- [ ] I have tested my changes (if applicable)
- [ ] My commit messages are clear and descriptive
- [ ] I have updated relevant documentation
- [ ] I have cited doctrinal references where applicable

---

## Questions or Discussions?

- **Open an issue** for questions, suggestions, or discussions
- **Tag appropriately** (documentation, doctrine, enhancement, bug, etc.)
- **Reference doctrine** when discussing operational concepts
- **Be specific** with examples or use cases

---

## Review Process

1. **Automated checks** — Formatting, linting, basic validation
2. **Maintainer review** — Doctrinal alignment, role fit, quality
3. **Community discussion** — As needed for larger changes
4. **Approval & merge** — Changes are merged once approved

---

## Recognition

Contributors are recognized in:
- GitHub contributor list
- Changelog (significant contributions)
- Project documentation (major features)

---

## Questions?

If you have questions about contributing:
- Check existing issues and pull requests
- Review CLAUDE.md doctrinal foundation
- Consult ROLES.md for role scope
- Open an issue with your question

---

**Thank you for improving CyberOpsPlanner!**

We appreciate your effort to strengthen cyber planning and operations support.
