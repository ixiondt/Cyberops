# Legacy Code Archive

This folder contains scripts and tools that have been superseded by newer implementations or features integrated into the CyberPlanner platform.

## Archived Files

### `generate_mdmp_professional.py`
**Status:** Superseded
**Replaced by:** Interactive MDMP Dashboard (`mdmp-dashboard.html`)
**Reason:** The dashboard provides an interactive, web-based interface for MDMP planning with real-time updates, better UX, and integrated cyber operations planning capabilities.

**To Use Dashboard:**
- Start the server: `npm run dev` or `node server.js`
- Navigate to: `http://localhost:3000/mdmp-dashboard.html`

**Legacy Script Note:**
If you need to generate MDMP documents programmatically (legacy workflow), this script is still available but not actively maintained. Modern approach is to use the dashboard export functionality.

---

## Why Legacy?

CyberPlanner transitioned from batch script generation to real-time interactive planning tools. The legacy scripts are preserved for reference and backward compatibility but should not be used for new operations.

**Migration Guide:**
- ✅ MDMP planning → Use **mdmp-dashboard.html**
- ✅ Export artifacts → Use **dashboard export buttons**
- ✅ Reference doctrine → Use **docs/doctrine/** library
- ✅ Track POAMs → Use **docs/POAMs/** tracker

---

## Contact

For questions about legacy code or migration paths, refer to:
- Project guide: `PROJECT_GUIDE.md` (root)
- Documentation index: `DOCUMENTATION_INDEX.md` (root)
