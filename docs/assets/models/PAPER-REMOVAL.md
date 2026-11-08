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

## Reference plaster inscriptions — 2026-11-08

The new `original-v2/reference-quiet-blank.png` is a separate edit of the supplied
Unread Glow artwork, made with the built-in Image Generation tool. Exact prompt
brief: remove only the five letters “quiet” from its central original plaster
plaque; preserve that plaque's pores, chipped outline, rim, perspective, colour,
lighting and the rest of the source. The runtime samples only that central tile,
rectifies it and extracts its connected solid silhouette. No edited apple body
is used. Original Unread Glow and all exhibition images stay byte-identical.

The material is shared by Mark to Form labels, Result, personal History and PDF.
Fresh regular serif lettering has a restrained recessed highlight/shadow. Result
uses a solid rim following the tile's actual outline. Inscription planes use
robust source-surface support and limited tilt; the inscription is drawn as one
uninterrupted face above photogrammetry noise rather than letting reconstructed
facets punch holes through letters. No other page composition is changed.

An earlier isolated generated blank slab is retained only as a local study under
`output/material-studies/`; it is not part of the published website.
