# Journeys and states

## Active browser-local journey

| Stage | User intent | System behavior / feedback | Acceptance reference |
|---|---|---|---|
| Arrive | Understand the experience. | Labelled sample community, local-mode notice and Try a local candle. | FR-10, FR-29, MAP-AC2 |
| Explore | Find a place. | Province map, equivalent dropdown/text data and city filtering. | FR-02, FR-07, FR-08 |
| Start candle | Add a presence without an online account. | Named editor; nickname/city required, message and journey details optional. | FR-03, FR-14, FR-15 |
| Recover input | Understand/correct an error. | Field-associated error and first-invalid focus; no save on invalid data. | FR-03, FR-15 |
| Save | Keep the local story and candle state. | Actual browser save or explicit session-only result; personal card/map update. | FR-15, MAP-AC1, MAP-AC2 |
| Edit/cancel | Change or preserve existing work. | Prefilled fields, discard decision and meaningful focus return. | FR-08, FR-15 |
| Return | See the same browser-local data. | Same-origin reload retains data when storage is available; no cross-device/shared claim. | FR-29 local fallback, MAP-AC2 |

## Important distinctions

A lit candle is not proof of found work. Province land glow follows eligible kommun counts; equivalent text explains the numbers. The local prototype does not send live encouragement to another person. Online account/inbox/composer/safety paths exist as optional implementation/fixture-tested states but are deferred, not active journey acceptance.

## Deferred online concept

If later authorized and configured: register -> confirm if required -> verified sign-in -> create/save -> reload/sign-out/in -> verify ownership/persistence. Error/retry, private draft recovery and received-event controls belong to that complete process. FR-29 remains deferred/unverified. Never draw the happy path as proof that these services have been activated.

Refer to [golden requirements](../../docs/requirements/requirement.md) for precise expected behavior and [case catalogue](../../docs/requirements/test-cases.md) for variants. This journey document explains intent; it does not redefine the contract.
