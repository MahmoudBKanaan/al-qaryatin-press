// Example retail orders. All unit prices are in SAR per item.
// Review exact artwork, dimensions and finishes for a final quotation.
export const pricePresets = {
  2: [
    { quantity: 100, size: "9 × 5 cm", sizeAr: "٩ × ٥ سم", unitPrice: 0.1125 },
    { quantity: 250, size: "10 × 7 cm", sizeAr: "١٠ × ٧ سم", unitPrice: 0.175 },
    { quantity: 500, size: "15 × 10 cm", sizeAr: "١٥ × ١٠ سم", unitPrice: 0.375 },
  ],
  3: [
    { quantity: 500, size: "Standard print", sizeAr: "طباعة بالمواصفات الأساسية", unitPrice: 0.2 },
    { quantity: 1000, size: "Standard print", sizeAr: "طباعة بالمواصفات الأساسية", unitPrice: 0.2 },
    { quantity: 2000, size: "Standard print", sizeAr: "طباعة بالمواصفات الأساسية", unitPrice: 0.2 },
  ],
  4: [
    { quantity: 1000, size: "10 × 10 × 5 cm", sizeAr: "١٠ × ١٠ × ٥ سم", unitPrice: 2.5 },
    { quantity: 1500, size: "15 × 12 × 6 cm", sizeAr: "١٥ × ١٢ × ٦ سم", unitPrice: 5.4 },
    { quantity: 2000, size: "22 × 16 × 8 cm", sizeAr: "٢٢ × ١٦ × ٨ سم", unitPrice: 14.08 },
  ],
  5: [
    { quantity: 1000, size: "18 × 8 × 22 cm", sizeAr: "١٨ × ٨ × ٢٢ سم", unitPrice: 0.9504 },
    { quantity: 1500, size: "24 × 10 × 30 cm", sizeAr: "٢٤ × ١٠ × ٣٠ سم", unitPrice: 2.16 },
    { quantity: 2000, size: "32 × 12 × 36 cm", sizeAr: "٣٢ × ١٢ × ٣٦ سم", unitPrice: 4.1472 },
  ],
  6: [
    { quantity: 100, size: "A6 closed · 1 fold", sizeAr: "A6 مطوي · طية واحدة", unitPrice: 0.3885 },
    { quantity: 250, size: "DL closed · 2 folds", sizeAr: "DL مطوي · طيتان", unitPrice: 1.0395 },
    { quantity: 500, size: "14 × 29.7 cm closed · 2 folds", sizeAr: "١٤ × ٢٩٫٧ سم مطوي · طيتان", unitPrice: 2.079 },
  ],
  7: [
    { quantity: 100, size: "A6", sizeAr: "A6", unitPrice: 0.3885 },
    { quantity: 250, size: "A5", sizeAr: "A5", unitPrice: 0.777 },
    { quantity: 500, size: "A4", sizeAr: "A4", unitPrice: 1.55925 },
  ],
  8: [
    { quantity: 100, size: "A5 · 16 pages", sizeAr: "A5 · ١٦ صفحة", unitPrice: 24.864 },
    { quantity: 250, size: "A5 · 24 pages", sizeAr: "A5 · ٢٤ صفحة", unitPrice: 37.296 },
    { quantity: 500, size: "A4 · 32 pages", sizeAr: "A4 · ٣٢ صفحة", unitPrice: 99.792 },
  ],
  9: [
    { quantity: 1, size: "A5 · 32 pages", sizeAr: "A5 · ٣٢ صفحة", unitPrice: 1.98912 },
    { quantity: 5, size: "A5 · 64 pages", sizeAr: "A5 · ٦٤ صفحة", unitPrice: 3.97824 },
    { quantity: 10, size: "A4 · 96 pages", sizeAr: "A4 · ٩٦ صفحة", unitPrice: 11.97504 },
  ],
  10: [
    { quantity: 1, size: "A5 · 24 pages", sizeAr: "A5 · ٢٤ صفحة", unitPrice: 7.4592 },
    { quantity: 5, size: "A5 · 48 pages", sizeAr: "A5 · ٤٨ صفحة", unitPrice: 14.9184 },
    { quantity: 10, size: "A4 · 64 pages", sizeAr: "A4 · ٦٤ صفحة", unitPrice: 39.9168 },
  ],
  11: [
    { quantity: 1, size: "Up to 50 sheets", sizeAr: "حتى ٥٠ ورقة", unitPrice: 5 },
    { quantity: 5, size: "51–100 sheets", sizeAr: "٥١–١٠٠ ورقة", unitPrice: 5 },
    { quantity: 10, size: "More than 100 sheets", sizeAr: "أكثر من ١٠٠ ورقة", unitPrice: 10, optionId: "more-than-100-sheets" },
  ],
  12: [
    { quantity: 10, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 20 },
    { quantity: 25, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 20 },
    { quantity: 50, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 20 },
  ],
  13: [
    { quantity: 10, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 25 },
    { quantity: 25, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 25 },
    { quantity: 50, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 25 },
  ],
  14: [
    { quantity: 10, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
    { quantity: 25, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
    { quantity: 50, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
  ],
  15: [
    { quantity: 6, size: "A6", sizeAr: "A6", unitPrice: 6.993 },
    { quantity: 12, size: "A5", sizeAr: "A5", unitPrice: 13.986 },
    { quantity: 24, size: "A4", sizeAr: "A4", unitPrice: 28.0665 },
  ],
  16: [
    { quantity: 6, size: "A6", sizeAr: "A6", unitPrice: 6.993 },
    { quantity: 12, size: "A5", sizeAr: "A5", unitPrice: 13.986 },
    { quantity: 24, size: "A4", sizeAr: "A4", unitPrice: 28.0665 },
  ],
  17: [
    { quantity: 6, size: "A6", sizeAr: "A6", unitPrice: 6.993 },
    { quantity: 12, size: "A5", sizeAr: "A5", unitPrice: 13.986 },
    { quantity: 24, size: "A4", sizeAr: "A4", unitPrice: 28.0665 },
  ],
  18: [
    { quantity: 6, size: "A6", sizeAr: "A6", unitPrice: 6.993 },
    { quantity: 12, size: "A5", sizeAr: "A5", unitPrice: 13.986 },
    { quantity: 24, size: "A4", sizeAr: "A4", unitPrice: 28.0665 },
  ],
  19: [
    { quantity: 6, size: "A6", sizeAr: "A6", unitPrice: 24.864 },
    { quantity: 12, size: "A5", sizeAr: "A5", unitPrice: 49.728 },
    { quantity: 24, size: "A4", sizeAr: "A4", unitPrice: 99.792 },
  ],
  20: [
    { quantity: 10, size: "10 × 5 cm", sizeAr: "١٠ × ٥ سم", unitPrice: 4 },
    { quantity: 25, size: "12 × 6 cm", sizeAr: "١٢ × ٦ سم", unitPrice: 5.76 },
    { quantity: 50, size: "15 × 7 cm", sizeAr: "١٥ × ٧ سم", unitPrice: 8.4 },
  ],
  21: [
    { quantity: 10, size: "10 × 5 cm", sizeAr: "١٠ × ٥ سم", unitPrice: 12.5 },
    { quantity: 25, size: "12 × 6 cm", sizeAr: "١٢ × ٦ سم", unitPrice: 18 },
    { quantity: 50, size: "15 × 7 cm", sizeAr: "١٥ × ٧ سم", unitPrice: 26.25 },
  ],
  22: [
    { quantity: 500, size: "3 × 3 cm", sizeAr: "٣ × ٣ سم", unitPrice: 0.027 },
    { quantity: 750, size: "5 × 5 cm", sizeAr: "٥ × ٥ سم", unitPrice: 0.075 },
    { quantity: 1000, size: "6 × 6 cm", sizeAr: "٦ × ٦ سم", unitPrice: 0.108 },
  ],
  23: [
    { quantity: 500, size: "3 × 3 cm", sizeAr: "٣ × ٣ سم", unitPrice: 0.045 },
    { quantity: 750, size: "5 × 5 cm", sizeAr: "٥ × ٥ سم", unitPrice: 0.125 },
    { quantity: 1000, size: "6 × 6 cm", sizeAr: "٦ × ٦ سم", unitPrice: 0.18 },
  ],
  24: [
    { quantity: 10, size: "A4", sizeAr: "A4", unitPrice: 3.1185 },
    { quantity: 25, size: "A4", sizeAr: "A4", unitPrice: 3.1185 },
    { quantity: 50, size: "A4", sizeAr: "A4", unitPrice: 3.1185 },
  ],
  25: [
    { quantity: 10, size: "A4", sizeAr: "A4", unitPrice: 4.3659 },
    { quantity: 25, size: "A4", sizeAr: "A4", unitPrice: 4.3659 },
    { quantity: 50, size: "A4", sizeAr: "A4", unitPrice: 4.3659 },
  ],
  26: [
    { quantity: 10, size: "100 × 60 cm", sizeAr: "١٠٠ × ٦٠ سم", unitPrice: 30 },
    { quantity: 15, size: "150 × 80 cm", sizeAr: "١٥٠ × ٨٠ سم", unitPrice: 60 },
    { quantity: 20, size: "200 × 100 cm", sizeAr: "٢٠٠ × ١٠٠ سم", unitPrice: 100 },
  ],
  27: [
    { quantity: 10, size: "100 × 60 cm", sizeAr: "١٠٠ × ٦٠ سم", unitPrice: 42 },
    { quantity: 15, size: "150 × 80 cm", sizeAr: "١٥٠ × ٨٠ سم", unitPrice: 84 },
    { quantity: 20, size: "200 × 100 cm", sizeAr: "٢٠٠ × ١٠٠ سم", unitPrice: 140 },
  ],
  28: [
    { quantity: 1, size: "50 × 150 cm", sizeAr: "٥٠ × ١٥٠ سم", unitPrice: 140 },
    { quantity: 2, size: "85 × 200 cm", sizeAr: "٨٥ × ٢٠٠ سم", unitPrice: 182, optionId: "medium-size" },
    { quantity: 3, size: "100 × 200 cm", sizeAr: "١٠٠ × ٢٠٠ سم", unitPrice: 252, optionId: "large-size" },
  ],
  29: [
    { quantity: 1, size: "30 × 40 cm", sizeAr: "٣٠ × ٤٠ سم", unitPrice: 8.4 },
    { quantity: 2, size: "50 × 70 cm", sizeAr: "٥٠ × ٧٠ سم", unitPrice: 24.5 },
    { quantity: 3, size: "70 × 100 cm", sizeAr: "٧٠ × ١٠٠ سم", unitPrice: 49 },
  ],
  30: [
    { quantity: 1, size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 8.4 },
    { quantity: 2, size: "80 × 60 cm", sizeAr: "٨٠ × ٦٠ سم", unitPrice: 33.6 },
    { quantity: 3, size: "120 × 80 cm", sizeAr: "١٢٠ × ٨٠ سم", unitPrice: 67.2 },
  ],
  31: [
    { quantity: 1, size: "30 × 20 cm", sizeAr: "٣٠ × ٢٠ سم", unitPrice: 6 },
    { quantity: 2, size: "60 × 40 cm", sizeAr: "٦٠ × ٤٠ سم", unitPrice: 24 },
    { quantity: 3, size: "100 × 60 cm", sizeAr: "١٠٠ × ٦٠ سم", unitPrice: 60 },
  ],
  32: [
    { quantity: 1, size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 13.2 },
    { quantity: 2, size: "70 × 50 cm", sizeAr: "٧٠ × ٥٠ سم", unitPrice: 38.5 },
    { quantity: 3, size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 77 },
  ],
  33: [
    { quantity: 1, size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 16.8 },
    { quantity: 2, size: "70 × 50 cm", sizeAr: "٧٠ × ٥٠ سم", unitPrice: 49 },
    { quantity: 3, size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 98 },
  ],
  34: [
    { quantity: 1, size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 21.6 },
    { quantity: 2, size: "70 × 50 cm", sizeAr: "٧٠ × ٥٠ سم", unitPrice: 63 },
    { quantity: 3, size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 126 },
  ],
  35: [
    { quantity: 1, size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 48 },
    { quantity: 2, size: "70 × 50 cm", sizeAr: "٧٠ × ٥٠ سم", unitPrice: 140 },
    { quantity: 3, size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 280 },
  ],
  36: [
    { quantity: 1, size: "60 × 40 cm", sizeAr: "٦٠ × ٤٠ سم", unitPrice: 33.6 },
    { quantity: 2, size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 98 },
    { quantity: 3, size: "150 × 100 cm", sizeAr: "١٥٠ × ١٠٠ سم", unitPrice: 210 },
  ],
  37: [
    { quantity: 1, size: "40 × 60 cm", sizeAr: "٤٠ × ٦٠ سم", unitPrice: 33.6 },
    { quantity: 2, size: "55 × 85 cm", sizeAr: "٥٥ × ٨٥ سم", unitPrice: 65.45 },
    { quantity: 3, size: "70 × 110 cm", sizeAr: "٧٠ × ١١٠ سم", unitPrice: 107.8 },
  ],
  38: [
    { quantity: 1, size: "40 × 60 cm", sizeAr: "٤٠ × ٦٠ سم", unitPrice: 38.4 },
    { quantity: 2, size: "55 × 85 cm", sizeAr: "٥٥ × ٨٥ سم", unitPrice: 74.8 },
    { quantity: 3, size: "70 × 110 cm", sizeAr: "٧٠ × ١١٠ سم", unitPrice: 123.2 },
  ],
  39: [
    { quantity: 1, size: "40 × 60 cm", sizeAr: "٤٠ × ٦٠ سم", unitPrice: 120 },
    { quantity: 2, size: "55 × 85 cm", sizeAr: "٥٥ × ٨٥ سم", unitPrice: 233.75 },
    { quantity: 3, size: "70 × 110 cm", sizeAr: "٧٠ × ١١٠ سم", unitPrice: 385 },
  ],
  40: [
    { quantity: 1, size: "40 × 60 cm", sizeAr: "٤٠ × ٦٠ سم", unitPrice: 120 },
    { quantity: 2, size: "55 × 85 cm", sizeAr: "٥٥ × ٨٥ سم", unitPrice: 233.75 },
    { quantity: 3, size: "70 × 110 cm", sizeAr: "٧٠ × ١١٠ سم", unitPrice: 385 },
  ],
  41: [
    { quantity: 1, size: "15 × 5 cm · 3 mm", sizeAr: "١٥ × ٥ سم · ٣ مم", unitPrice: 4.5 },
    { quantity: 3, size: "20 × 8 cm · 5 mm", sizeAr: "٢٠ × ٨ سم · ٥ مم", unitPrice: 16 },
    { quantity: 5, size: "25 × 9 cm · 8 mm", sizeAr: "٢٥ × ٩ سم · ٨ مم", unitPrice: 36 },
  ],
  42: [
    { quantity: 1, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 100 },
    { quantity: 3, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 100 },
    { quantity: 5, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 100 },
  ],
  43: [
    { quantity: 100, size: "15 × 15 cm flat", sizeAr: "١٥ × ١٥ سم قبل الطي", unitPrice: 1.6875 },
    { quantity: 250, size: "21 × 20 cm flat", sizeAr: "٢١ × ٢٠ سم قبل الطي", unitPrice: 3.15 },
    { quantity: 500, size: "29.7 × 21 cm flat", sizeAr: "٢٩٫٧ × ٢١ سم قبل الطي", unitPrice: 4.67775 },
  ],
  44: [
    { quantity: 1, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { quantity: 3, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { quantity: 5, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
  ],
  45: [
    { quantity: 1, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { quantity: 3, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { quantity: 5, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
  ],
  46: [
    { quantity: 1000, size: "Cup size 7", sizeAr: "مقاس كوب ٧", unitPrice: 0.6, optionId: "cup-size-7" },
    { quantity: 1500, size: "Cup size 9", sizeAr: "مقاس كوب ٩", unitPrice: 0.72, optionId: "cup-size-9" },
    { quantity: 2500, size: "Cup size 12", sizeAr: "مقاس كوب ١٢", unitPrice: 0.84, optionId: "cup-size-12" },
  ],
  47: [
    { quantity: 1000, size: "Cup size 7", sizeAr: "مقاس كوب ٧", unitPrice: 0.4, optionId: "cup-size-7" },
    { quantity: 1500, size: "Cup size 9", sizeAr: "مقاس كوب ٩", unitPrice: 0.48, optionId: "cup-size-9" },
    { quantity: 2500, size: "Cup size 12", sizeAr: "مقاس كوب ١٢", unitPrice: 0.56, optionId: "cup-size-12" },
  ],
  48: [
    { quantity: 1000, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 2 },
    { quantity: 1500, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 2 },
    { quantity: 2500, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 2 },
  ],
  49: [
    { quantity: 1, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { quantity: 10, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { quantity: 30, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
  ],
  50: [
    { quantity: 20, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
    { quantity: 40, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
    { quantity: 80, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
  ],
  51: [
    { quantity: 10, size: "A5 · Single-sided", sizeAr: "A5 · وجه واحد", unitPrice: 0.06216 },
    { quantity: 50, size: "A4 · Single-sided", sizeAr: "A4 · وجه واحد", unitPrice: 0.12474 },
    { quantity: 100, size: "A3 · Single-sided", sizeAr: "A3 · وجه واحد", unitPrice: 0.24948 },
  ],
  52: [
    { quantity: 1, size: "A5 · Single-sided", sizeAr: "A5 · وجه واحد", unitPrice: 0.3108 },
    { quantity: 25, size: "A4 · Single-sided", sizeAr: "A4 · وجه واحد", unitPrice: 0.6237 },
    { quantity: 50, size: "A3 · Single-sided", sizeAr: "A3 · وجه واحد", unitPrice: 1.2474 },
  ],
  53: [
    { quantity: 100, size: "A5 · Single-sided", sizeAr: "A5 · وجه واحد", unitPrice: 0.4662 },
    { quantity: 200, size: "A4 · Single-sided", sizeAr: "A4 · وجه واحد", unitPrice: 0.93555 },
    { quantity: 500, size: "A3 · Single-sided", sizeAr: "A3 · وجه واحد", unitPrice: 1.8711 },
  ],
  54: [
    { quantity: 1, size: "A5 · Single-sided", sizeAr: "A5 · وجه واحد", unitPrice: 0.6216 },
    { quantity: 25, size: "A4 · Single-sided", sizeAr: "A4 · وجه واحد", unitPrice: 1.2474 },
    { quantity: 50, size: "A3 · Single-sided", sizeAr: "A3 · وجه واحد", unitPrice: 2.4948 },
  ],
  55: [
    { quantity: 1, size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 25 },
    { quantity: 10, size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 25 },
    { quantity: 25, size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 25 },
  ],
  56: [
    { quantity: 1, size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 40 },
    { quantity: 10, size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 40 },
    { quantity: 25, size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 40 },
  ],
  57: [
    { quantity: 10, size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 15 },
    { quantity: 25, size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 15 },
    { quantity: 50, size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 15 },
  ],
  58: [
    { quantity: 10, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 35 },
    { quantity: 25, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 35 },
    { quantity: 50, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 35 },
  ],
  59: [
    { quantity: 1, size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 30 },
    { quantity: 10, size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 30 },
    { quantity: 25, size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 30 },
  ],
  60: [
    { quantity: 1, size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 40 },
    { quantity: 10, size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 40 },
    { quantity: 25, size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 40 },
  ],
  63: [
    { quantity: 1, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 240 },
    { quantity: 3, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 240 },
    { quantity: 5, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 240 },
  ],
  64: [
    { quantity: 1, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { quantity: 3, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { quantity: 5, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
  ],
  65: [
    { quantity: 1, size: "15 × 20 cm · 5 mm", sizeAr: "١٥ × ٢٠ سم · ٥ مم", unitPrice: 15 },
    { quantity: 3, size: "20 × 25 cm · 8 mm", sizeAr: "٢٠ × ٢٥ سم · ٨ مم", unitPrice: 40 },
    { quantity: 5, size: "25 × 30 cm · 10 mm", sizeAr: "٢٥ × ٣٠ سم · ١٠ مم", unitPrice: 75 },
  ],
  67: [
    { quantity: 1, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { quantity: 3, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { quantity: 5, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
  ],
  69: [
    { quantity: 1, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { quantity: 3, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { quantity: 5, size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
  ],
  71: [
    { quantity: 1, size: "Digital design", sizeAr: "تصميم رقمي", unitPrice: 50 },
    { quantity: 3, size: "Digital design", sizeAr: "تصميم رقمي", unitPrice: 50 },
    { quantity: 5, size: "Digital design", sizeAr: "تصميم رقمي", unitPrice: 50 },
  ],
  72: [
    { quantity: 1000, size: "A5", sizeAr: "A5", unitPrice: 0.777 },
    { quantity: 1500, size: "A4", sizeAr: "A4", unitPrice: 1.55925 },
    { quantity: 2000, size: "A3", sizeAr: "A3", unitPrice: 3.1185 },
  ],
  73: [
    { quantity: 100, size: "6 × 6 cm", sizeAr: "٦ × ٦ سم", unitPrice: 0.09 },
    { quantity: 250, size: "10 × 10 cm", sizeAr: "١٠ × ١٠ سم", unitPrice: 0.25 },
    { quantity: 500, size: "10 × 15 cm", sizeAr: "١٠ × ١٥ سم", unitPrice: 0.375 },
  ],
};
