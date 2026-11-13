# Verification record

## Completed checks

- TypeScript check and Next.js static production build.
- Goal selection updates the suggested program and recommendation.
- Coaching preference updates the suggested membership.
- Manual membership selection carries into the trial form and the final recommendation.
- Trial enquiry preparation includes the selected goal, plan, location, preferred time, and training preferences.
- The WhatsApp URL is properly encoded. Test enquiries were reviewed without sending messages.
- Program explainers render in the Remotion Player with playback controls and matching text content.
- Mobile navigation, goal selection, membership selection, and the booking dialog were exercised in a 390px responsive iframe.
- Horizontal overflow was checked at 390px and 360px iframe widths.
- Desktop layout, program artwork, dialogs, and static scene alternatives were visually inspected.
- MP4, WebM, and JPEG brand assets were generated from the shared Remotion SVG timeline.
- Fonts are served locally. Media rendering is not part of the Vercel build.

## Photography restoration checks

- Verified all 13 original image paths occur in the homepage DOM.
- Restored the panorama, five photo-backed program cards, three coach portraits, testimonial avatars, two comparison stories, and four facilities images.
- Exercised gallery navigation with both the Next button and the Right arrow key.
- Exercised the before-and-after comparison with keyboard input and verified its updated accessible value.
- Checked the restored coach layout at 390px and 360px, including right-aligned specialty badges and no horizontal overflow.
- Reused the original optimized WebP assets and kept below-fold images lazy-loaded.

## Verification limits

The available cloud browser reports WebGL as unavailable. Its static-scene behavior was verified, but GPU animation, pointer parallax inside WebGL, and context restoration could not be observed on a GPU-enabled device in this environment. The Three.js code is included in the production build and protected by fallbacks.

Reduced-motion logic is implemented in Framer Motion, the canvas runtime, Remotion playback, and CSS. An OS-level reduced-motion emulator was not exposed by the available browser tools.

Lighthouse was not run: the environment could not launch local Chromium, and the connected browser API does not expose a Lighthouse runner. No numerical performance or conversion claim is inferred from source changes. Test on the final Vercel URL and a representative phone before a business launch.

The map uses a real Google Maps area embed for DHA Phase 4, Karachi. The exact business address and WhatsApp number still need verification.
