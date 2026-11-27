"""Refresh the carousel's display sizes after replacing a full-width hero image.

Run with Python and Pillow: python scripts/responsive-heroes.py
"""

from pathlib import Path

from PIL import Image


media = Path(__file__).resolve().parents[1] / "media"
for name in ("print", "packaging", "displays", "labels", "gifts"):
    with Image.open(media / f"hero-{name}.webp") as source:
        for width in (768, 1152):
            photo = source.resize((width, width * 2 // 3), Image.Resampling.LANCZOS)
            photo.save(media / f"hero-{name}-{width}.webp", quality=80, method=6)
