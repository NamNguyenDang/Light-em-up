# FR-42 — Nordic context without losing Sweden's focus

The owner requested a concept/discussion before implementation, then authorized PR42. [Preserved concept](../concepts/fr42-nordic-context.svg) is the reviewed visual direction, not a browser result. Its low-resolution Natural Earth country outline was replaced by pinned 1:50m background data for implementation; Sweden's existing more detailed artwork/provinces stay unchanged.

The owner highlighted islands and national/territorial sensitivity. The implementation keeps every selected source ring, includes Åland explicitly, discloses the regional crop and supplies independent Svalbard/Jan Mayen/Greenland/Faroe views. Background land is subdued and non-interactive; only Sweden carries activity. The extent keeps Sweden's existing display size instead of zooming it out to fit every offshore territory. Country colours and geographic shape are not treated as authoritative legal-status evidence.

[Source, scale, island review and limits](../../docs/design/nordic-map.md) and [delivery checks](../../docs/tracking/features/FR-42_NORDIC_MAP.md) distinguish static/data evidence from browser or accessibility testing. Owner explicitly waived Accessibility regression for this PR only. There is no measured usability/emotional outcome, participant study or claim of full WCAG compliance.

Concept provenance: Natural Earth 1:110m admin-0 geometry, source blob 1e6ab74c7042f97013be69ceec798be8e1aff27d from nvkelso/natural-earth-vector. Main Nordic viewing extent only; illustrative light dots are not real users. The implementation uses the separate 1:50m source documented above, plus original Sweden geometry.
