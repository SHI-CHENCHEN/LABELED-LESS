# Scoped paper cleanup — 2026-11-08

Original GLB files and all delivered PNGs remain unchanged.

`paper-free-atlas-edit.png` and `original-v2/personal-apple-paper-free-edit.png`
are separately generated edits, created with the built-in Image Generation tool.
Prompt: remove all printed paper stickers, their rectangular backing and shadow;
reconstruct only the neighboring plaster, preserving the source apple and UV
layout. The runtime blends these edits only inside the original card footprints.
They are not replacements for the original source files or the eight demo images.

The original GLB remains byte-identical. A separate 1.7 MB vertex delta removes
only shallow old sticker relief in measured paper areas, bounded to 0.004 source
units. It changes no topology and introduces no replacement apple/plaster shell.
Selected labels use complete
2048 × 640 paper sheets with fresh font rendering. Only front slots are used;
edge-on and back inspections hide those papers. `prepare-reference-paper-planes.mjs`
samples the unmodified source geometry and emits its plane coordinates.
