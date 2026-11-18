# Website and SaaS UX audit

There is no single universal "SaaS UI standard" that this repository can claim to pass. Use separate references for accessibility, human-centred design, interaction behavior and measured performance. SaaS means Software as a Service; it describes delivery, not a visual design certification.

## Current reference set

| Reference | Type and relevance | What can be claimed here |
|---|---|---|
| WCAG 2.2 AA | W3C accessibility requirements for web content. | Implementation/evidence mapping; full conformance remains unverified. |
| ISO 9241-210:2019 | Human-centred design process framework. ISO's catalogue says it was confirmed in 2025. | User feedback and iteration are recorded; representative user research/evaluation is not established. No ISO certification. |
| ISO 9241-11:2018 | Usability concepts for users, tasks and context. | Define evaluation tasks; no measured effectiveness/efficiency/satisfaction study yet. |
| ISO 9241-110:2020 | Interaction principles across interactive systems. | Use as a review reference, not a clause-by-clause compliance claim from an unread paid standard. |
| WAI-ARIA APG | Informative implementation patterns such as disclosure navigation. | Native buttons/details/dialogs plus documented keyboard behavior; assistive-technology verification still needed. |
| Core Web Vitals | Google's performance guidance, not an accessibility or ISO certificate. | LCP/INP/CLS targets are evaluation goals; real field data is not collected. |

This review uses official public abstracts/guidance, not full paid ISO texts. Sources and access date are in SOURCES.md.

## Project UX review

| Dimension | Present behavior/evidence | Gap or next evaluation |
|---|---|---|
| Purpose and hierarchy | Compact one-line desktop hero, candle artwork, clear invitation; wraps at narrow/enlarged widths. | Test whether new visitors understand the map and encouragement purpose without explanation. |
| State visibility | Session/loading/saving/error/read/sent feedback; retry actions. | Check live announcements and whether too many statuses compete on a screen reader. |
| Recognition and consistency | Nickname disclosure, personal story, native forms, one edit action after save. | Some legacy light/candle and local-demo language coexist; run a terminology/content pass with users. |
| User control | Cancel sign-in, discard confirmation, draft retention, hide story and confirmed block. | No self-service unblock/undo and no account deletion/recovery journey in this FR set. |
| Error recovery | Field-linked errors, retryable network actions, preserved account-bound drafts. | Real expired-session/provider failure and browser-storage denial need end-to-end verification. |
| Trust and safety | Labelled samples, private messages, recipient-only reports/blocks, honest project-owner review text. | A human moderation process is not operating automatically. Define who reviews and when before inviting broad real usage. |
| Responsive interaction | Browser reflow/target tests at 320/375/768/1280 and account 320/1280; normal keyboard controls. | Real device, touch cancellation, text-only resize, magnification and AT testing remain open. |
| Performance | Local assets, bounded API calls, 50-row inbox paging. | No LCP/INP/CLS field measurements. Large map/catalog/demo payload and full rerenders warrant profiling, not an invented failing score. |
| Scale and findability | City/province filters, paged story list and inbox. | Public/sent queries cap at 1000; decide real-service pagination before exceeding that bounded demo. |

Core Web Vitals evaluation goals: Largest Contentful Paint (LCP) at most 2.5 seconds, Interaction to Next Paint (INP) at most 200 ms and Cumulative Layout Shift (CLS) at most 0.1, assessed at the 75th percentile separately for mobile and desktop. These are unmeasured goals here, not achieved scores. See [Web Vitals](https://web.dev/articles/vitals).

## Small practical user study

Recruit people representative of the intended audience, including keyboard and assistive-technology users. Ask them to find a province, interpret a light level, create a candle, recover a failed edit, find Lina's encouragement and report/block an unwanted sender. Record task completion, errors, time, comprehension and satisfaction with consent; do not collect sensitive story content. Iterate on observed problems, then repeat. Automated test success cannot substitute for this evidence.
