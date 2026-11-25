"""Refresh the share JPEGs after changing media/hero-print.webp or a product mockup.

Run from any directory with Python and Pillow installed:
    python scripts/social-images.py
"""

from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


MEDIA = Path(__file__).resolve().parents[1] / "media"
OUTPUT = MEDIA / "share"
SIZE = (1200, 630)


def product_card(source):
    # Keep the entire product in frame. Extend the studio backdrop into the margins.
    photo = ImageOps.contain(source, SIZE, Image.Resampling.LANCZOS)
    width, height = SIZE
    if photo.width == width:
        return ImageOps.pad(photo, SIZE, color=photo.getpixel((0, 0)))

    margin = (width - photo.width) // 2
    right = width - margin - photo.width
    card = Image.new("RGB", SIZE)
    card.paste(ImageOps.mirror(photo.crop((0, 0, margin, height))), (0, 0))
    card.paste(photo, (margin, 0))
    card.paste(ImageOps.mirror(photo.crop((photo.width - right, 0, photo.width, height))),
               (margin + photo.width, 0))

    # Feather between each sharp photograph and its blurred reflection.
    mask = Image.new("L", SIZE)
    mask.paste(255, (margin + 10, 0, margin + photo.width - 10, height))
    return Image.composite(card, card.filter(ImageFilter.GaussianBlur(25)),
                           mask.filter(ImageFilter.GaussianBlur(12)))


def main():
    OUTPUT.mkdir(exist_ok=True)
    hero = MEDIA / "hero-print.webp"
    for path in (hero, *sorted(MEDIA.glob("product-*.webp"))):
        with Image.open(path) as source:
            photo = source.convert("RGB")
            card = (ImageOps.fit(photo, SIZE, Image.Resampling.LANCZOS)
                    if path == hero else product_card(photo))
            card.save(OUTPUT / (path.stem + ".jpg"), quality=82, optimize=True,
                      progressive=False, subsampling="4:2:0")


if __name__ == "__main__":
    main()
