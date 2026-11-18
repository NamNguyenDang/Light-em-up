# Current local output — capture evidence

These are actual browser captures from the migrated frontend, not generated mockups or evidence of participant success. They use labelled fictional sample data and an unconfigured local visitor state.

| Artifact file | Viewport | What it supports |
|---|---|---|
| layout-1280.png | 1280×900 CSS pixels, full-page capture | Desktop hierarchy, single-line hero where space permits, map/CTA placement, local notice and sample labels. |
| layout-320.png | 320×900 CSS pixels, full-page capture | Narrow responsive wrapping and stacked navigation/content; no horizontal page overflow in the automated assertion. |

Download/view the [FR-31 accessibility-results artifact](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44296776965/artifacts/14423189602). The [provenance record](screenshot-provenance.json) includes commit, artifact digest, per-file hashes, data mode and limits. CI retains artifacts for 14 days; these PNGs are not embedded into the repository. After expiry, rerun the browser tests and record new provenance rather than implying an expired artifact is still available or byte-identical across browser versions.

A screenshot can support visual review, but not task comprehension, screen-reader announcements, real zoom/device behavior or improved engagement. Do not call these before/after usability results. Historical design documents are separately preserved in docs/archive; they are proposals/iterations, not participant findings.
