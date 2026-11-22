// Standard sizes and specifications. Unit prices are in SAR per item.
// Keep preset indices stable for saved carts.
// Review exact artwork, dimensions and finishes for a final quotation.
export const pricePresets = {
  2: [
    { size: "9 × 5 cm", sizeAr: "٩ × ٥ سم", unitPrice: 0.1125 },
    { size: "10 × 7 cm", sizeAr: "١٠ × ٧ سم", unitPrice: 0.175 },
    { size: "15 × 10 cm", sizeAr: "١٥ × ١٠ سم", unitPrice: 0.375 },
  ],
  3: [
    { size: "Standard print", sizeAr: "طباعة بالمواصفات الأساسية", unitPrice: 0.2 },
    { size: "Standard print", sizeAr: "طباعة بالمواصفات الأساسية", unitPrice: 0.2 },
    { size: "Standard print", sizeAr: "طباعة بالمواصفات الأساسية", unitPrice: 0.2 },
  ],
  4: [
    { size: "10 × 10 × 5 cm", sizeAr: "١٠ × ١٠ × ٥ سم", unitPrice: 2.5 },
    { size: "15 × 12 × 6 cm", sizeAr: "١٥ × ١٢ × ٦ سم", unitPrice: 5.4 },
    { size: "22 × 16 × 8 cm", sizeAr: "٢٢ × ١٦ × ٨ سم", unitPrice: 14.08 },
  ],
  5: [
    { size: "18 × 8 × 22 cm", sizeAr: "١٨ × ٨ × ٢٢ سم", unitPrice: 0.9504 },
    { size: "24 × 10 × 30 cm", sizeAr: "٢٤ × ١٠ × ٣٠ سم", unitPrice: 2.16 },
    { size: "32 × 12 × 36 cm", sizeAr: "٣٢ × ١٢ × ٣٦ سم", unitPrice: 4.1472 },
  ],
  6: [
    { size: "A6 closed · 1 fold", sizeAr: "A6 مطوي · طية واحدة", unitPrice: 0.3885 },
    { size: "DL closed · 2 folds", sizeAr: "DL مطوي · طيتان", unitPrice: 1.0395 },
    { size: "14 × 29.7 cm closed · 2 folds", sizeAr: "١٤ × ٢٩٫٧ سم مطوي · طيتان", unitPrice: 2.079 },
  ],
  7: [
    { size: "A6", sizeAr: "A6", unitPrice: 0.3885 },
    { size: "A5", sizeAr: "A5", unitPrice: 0.777 },
    { size: "A4", sizeAr: "A4", unitPrice: 1.55925 },
  ],
  8: [
    { size: "A5 · 16 pages", sizeAr: "A5 · ١٦ صفحة", unitPrice: 24.864 },
    { size: "A5 · 24 pages", sizeAr: "A5 · ٢٤ صفحة", unitPrice: 37.296 },
    { size: "A4 · 32 pages", sizeAr: "A4 · ٣٢ صفحة", unitPrice: 99.792 },
  ],
  9: [
    { size: "A5 · 32 pages", sizeAr: "A5 · ٣٢ صفحة", unitPrice: 1.98912 },
    { size: "A5 · 64 pages", sizeAr: "A5 · ٦٤ صفحة", unitPrice: 3.97824 },
    { size: "A4 · 96 pages", sizeAr: "A4 · ٩٦ صفحة", unitPrice: 11.97504 },
  ],
  10: [
    { size: "A5 · 24 pages", sizeAr: "A5 · ٢٤ صفحة", unitPrice: 7.4592 },
    { size: "A5 · 48 pages", sizeAr: "A5 · ٤٨ صفحة", unitPrice: 14.9184 },
    { size: "A4 · 64 pages", sizeAr: "A4 · ٦٤ صفحة", unitPrice: 39.9168 },
  ],
  11: [
    { size: "Up to 50 sheets", sizeAr: "حتى ٥٠ ورقة", unitPrice: 5 },
    { size: "51–100 sheets", sizeAr: "٥١–١٠٠ ورقة", unitPrice: 5 },
    { size: "More than 100 sheets", sizeAr: "أكثر من ١٠٠ ورقة", unitPrice: 10, optionId: "more-than-100-sheets" },
  ],
  12: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 20 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 20 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 20 },
  ],
  13: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 25 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 25 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 25 },
  ],
  14: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
  ],
  15: [
    { size: "A6", sizeAr: "A6", unitPrice: 6.993 },
    { size: "A5", sizeAr: "A5", unitPrice: 13.986 },
    { size: "A4", sizeAr: "A4", unitPrice: 28.0665 },
  ],
  16: [
    { size: "A6", sizeAr: "A6", unitPrice: 6.993 },
    { size: "A5", sizeAr: "A5", unitPrice: 13.986 },
    { size: "A4", sizeAr: "A4", unitPrice: 28.0665 },
  ],
  17: [
    { size: "A6", sizeAr: "A6", unitPrice: 6.993 },
    { size: "A5", sizeAr: "A5", unitPrice: 13.986 },
    { size: "A4", sizeAr: "A4", unitPrice: 28.0665 },
  ],
  18: [
    { size: "A6", sizeAr: "A6", unitPrice: 6.993 },
    { size: "A5", sizeAr: "A5", unitPrice: 13.986 },
    { size: "A4", sizeAr: "A4", unitPrice: 28.0665 },
  ],
  19: [
    { size: "A6", sizeAr: "A6", unitPrice: 24.864 },
    { size: "A5", sizeAr: "A5", unitPrice: 49.728 },
    { size: "A4", sizeAr: "A4", unitPrice: 99.792 },
  ],
  20: [
    { size: "10 × 5 cm", sizeAr: "١٠ × ٥ سم", unitPrice: 4 },
    { size: "12 × 6 cm", sizeAr: "١٢ × ٦ سم", unitPrice: 5.76 },
    { size: "15 × 7 cm", sizeAr: "١٥ × ٧ سم", unitPrice: 8.4 },
  ],
  21: [
    { size: "10 × 5 cm", sizeAr: "١٠ × ٥ سم", unitPrice: 12.5 },
    { size: "12 × 6 cm", sizeAr: "١٢ × ٦ سم", unitPrice: 18 },
    { size: "15 × 7 cm", sizeAr: "١٥ × ٧ سم", unitPrice: 26.25 },
  ],
  22: [
    { size: "3 × 3 cm", sizeAr: "٣ × ٣ سم", unitPrice: 0.027 },
    { size: "5 × 5 cm", sizeAr: "٥ × ٥ سم", unitPrice: 0.075 },
    { size: "6 × 6 cm", sizeAr: "٦ × ٦ سم", unitPrice: 0.108 },
  ],
  23: [
    { size: "3 × 3 cm", sizeAr: "٣ × ٣ سم", unitPrice: 0.045 },
    { size: "5 × 5 cm", sizeAr: "٥ × ٥ سم", unitPrice: 0.125 },
    { size: "6 × 6 cm", sizeAr: "٦ × ٦ سم", unitPrice: 0.18 },
  ],
  24: [
    { size: "A4", sizeAr: "A4", unitPrice: 3.1185 },
    { size: "A4", sizeAr: "A4", unitPrice: 3.1185 },
    { size: "A4", sizeAr: "A4", unitPrice: 3.1185 },
  ],
  25: [
    { size: "A4", sizeAr: "A4", unitPrice: 4.3659 },
    { size: "A4", sizeAr: "A4", unitPrice: 4.3659 },
    { size: "A4", sizeAr: "A4", unitPrice: 4.3659 },
  ],
  26: [
    { size: "100 × 60 cm", sizeAr: "١٠٠ × ٦٠ سم", unitPrice: 30 },
    { size: "150 × 80 cm", sizeAr: "١٥٠ × ٨٠ سم", unitPrice: 60 },
    { size: "200 × 100 cm", sizeAr: "٢٠٠ × ١٠٠ سم", unitPrice: 100 },
  ],
  27: [
    { size: "100 × 60 cm", sizeAr: "١٠٠ × ٦٠ سم", unitPrice: 42 },
    { size: "150 × 80 cm", sizeAr: "١٥٠ × ٨٠ سم", unitPrice: 84 },
    { size: "200 × 100 cm", sizeAr: "٢٠٠ × ١٠٠ سم", unitPrice: 140 },
  ],
  28: [
    { size: "50 × 150 cm", sizeAr: "٥٠ × ١٥٠ سم", unitPrice: 140 },
    { size: "85 × 200 cm", sizeAr: "٨٥ × ٢٠٠ سم", unitPrice: 182, optionId: "medium-size" },
    { size: "100 × 200 cm", sizeAr: "١٠٠ × ٢٠٠ سم", unitPrice: 252, optionId: "large-size" },
  ],
  29: [
    { size: "30 × 40 cm", sizeAr: "٣٠ × ٤٠ سم", unitPrice: 8.4 },
    { size: "50 × 70 cm", sizeAr: "٥٠ × ٧٠ سم", unitPrice: 24.5 },
    { size: "70 × 100 cm", sizeAr: "٧٠ × ١٠٠ سم", unitPrice: 49 },
  ],
  30: [
    { size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 8.4 },
    { size: "80 × 60 cm", sizeAr: "٨٠ × ٦٠ سم", unitPrice: 33.6 },
    { size: "120 × 80 cm", sizeAr: "١٢٠ × ٨٠ سم", unitPrice: 67.2 },
  ],
  31: [
    { size: "30 × 20 cm", sizeAr: "٣٠ × ٢٠ سم", unitPrice: 6 },
    { size: "60 × 40 cm", sizeAr: "٦٠ × ٤٠ سم", unitPrice: 24 },
    { size: "100 × 60 cm", sizeAr: "١٠٠ × ٦٠ سم", unitPrice: 60 },
  ],
  32: [
    { size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 13.2 },
    { size: "70 × 50 cm", sizeAr: "٧٠ × ٥٠ سم", unitPrice: 38.5 },
    { size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 77 },
  ],
  33: [
    { size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 16.8 },
    { size: "70 × 50 cm", sizeAr: "٧٠ × ٥٠ سم", unitPrice: 49 },
    { size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 98 },
  ],
  34: [
    { size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 21.6 },
    { size: "70 × 50 cm", sizeAr: "٧٠ × ٥٠ سم", unitPrice: 63 },
    { size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 126 },
  ],
  35: [
    { size: "40 × 30 cm", sizeAr: "٤٠ × ٣٠ سم", unitPrice: 48 },
    { size: "70 × 50 cm", sizeAr: "٧٠ × ٥٠ سم", unitPrice: 140 },
    { size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 280 },
  ],
  36: [
    { size: "60 × 40 cm", sizeAr: "٦٠ × ٤٠ سم", unitPrice: 33.6 },
    { size: "100 × 70 cm", sizeAr: "١٠٠ × ٧٠ سم", unitPrice: 98 },
    { size: "150 × 100 cm", sizeAr: "١٥٠ × ١٠٠ سم", unitPrice: 210 },
  ],
  37: [
    { size: "40 × 60 cm", sizeAr: "٤٠ × ٦٠ سم", unitPrice: 33.6 },
    { size: "55 × 85 cm", sizeAr: "٥٥ × ٨٥ سم", unitPrice: 65.45 },
    { size: "70 × 110 cm", sizeAr: "٧٠ × ١١٠ سم", unitPrice: 107.8 },
  ],
  38: [
    { size: "40 × 60 cm", sizeAr: "٤٠ × ٦٠ سم", unitPrice: 38.4 },
    { size: "55 × 85 cm", sizeAr: "٥٥ × ٨٥ سم", unitPrice: 74.8 },
    { size: "70 × 110 cm", sizeAr: "٧٠ × ١١٠ سم", unitPrice: 123.2 },
  ],
  39: [
    { size: "40 × 60 cm", sizeAr: "٤٠ × ٦٠ سم", unitPrice: 120 },
    { size: "55 × 85 cm", sizeAr: "٥٥ × ٨٥ سم", unitPrice: 233.75 },
    { size: "70 × 110 cm", sizeAr: "٧٠ × ١١٠ سم", unitPrice: 385 },
  ],
  40: [
    { size: "40 × 60 cm", sizeAr: "٤٠ × ٦٠ سم", unitPrice: 120 },
    { size: "55 × 85 cm", sizeAr: "٥٥ × ٨٥ سم", unitPrice: 233.75 },
    { size: "70 × 110 cm", sizeAr: "٧٠ × ١١٠ سم", unitPrice: 385 },
  ],
  41: [
    { size: "15 × 5 cm · 3 mm", sizeAr: "١٥ × ٥ سم · ٣ مم", unitPrice: 4.5 },
    { size: "20 × 8 cm · 5 mm", sizeAr: "٢٠ × ٨ سم · ٥ مم", unitPrice: 16 },
    { size: "25 × 9 cm · 8 mm", sizeAr: "٢٥ × ٩ سم · ٨ مم", unitPrice: 36 },
  ],
  42: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 100 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 100 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 100 },
  ],
  43: [
    { size: "15 × 15 cm flat", sizeAr: "١٥ × ١٥ سم قبل الطي", unitPrice: 1.6875 },
    { size: "21 × 20 cm flat", sizeAr: "٢١ × ٢٠ سم قبل الطي", unitPrice: 3.15 },
    { size: "29.7 × 21 cm flat", sizeAr: "٢٩٫٧ × ٢١ سم قبل الطي", unitPrice: 4.67775 },
  ],
  44: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
  ],
  45: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
  ],
  46: [
    { size: "Cup size 7", sizeAr: "مقاس كوب ٧", unitPrice: 0.6, optionId: "cup-size-7" },
    { size: "Cup size 9", sizeAr: "مقاس كوب ٩", unitPrice: 0.72, optionId: "cup-size-9" },
    { size: "Cup size 12", sizeAr: "مقاس كوب ١٢", unitPrice: 0.84, optionId: "cup-size-12" },
  ],
  47: [
    { size: "Cup size 7", sizeAr: "مقاس كوب ٧", unitPrice: 0.4, optionId: "cup-size-7" },
    { size: "Cup size 9", sizeAr: "مقاس كوب ٩", unitPrice: 0.48, optionId: "cup-size-9" },
    { size: "Cup size 12", sizeAr: "مقاس كوب ١٢", unitPrice: 0.56, optionId: "cup-size-12" },
  ],
  48: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 2 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 2 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 2 },
  ],
  49: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 60 },
  ],
  50: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 15 },
  ],
  51: [
    { size: "A5 · Single-sided", sizeAr: "A5 · وجه واحد", unitPrice: 0.06216 },
    { size: "A4 · Single-sided", sizeAr: "A4 · وجه واحد", unitPrice: 0.12474 },
    { size: "A3 · Single-sided", sizeAr: "A3 · وجه واحد", unitPrice: 0.24948 },
  ],
  52: [
    { size: "A5 · Single-sided", sizeAr: "A5 · وجه واحد", unitPrice: 0.3108 },
    { size: "A4 · Single-sided", sizeAr: "A4 · وجه واحد", unitPrice: 0.6237 },
    { size: "A3 · Single-sided", sizeAr: "A3 · وجه واحد", unitPrice: 1.2474 },
  ],
  53: [
    { size: "A5 · Single-sided", sizeAr: "A5 · وجه واحد", unitPrice: 0.4662 },
    { size: "A4 · Single-sided", sizeAr: "A4 · وجه واحد", unitPrice: 0.93555 },
    { size: "A3 · Single-sided", sizeAr: "A3 · وجه واحد", unitPrice: 1.8711 },
  ],
  54: [
    { size: "A5 · Single-sided", sizeAr: "A5 · وجه واحد", unitPrice: 0.6216 },
    { size: "A4 · Single-sided", sizeAr: "A4 · وجه واحد", unitPrice: 1.2474 },
    { size: "A3 · Single-sided", sizeAr: "A3 · وجه واحد", unitPrice: 2.4948 },
  ],
  55: [
    { size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 25 },
    { size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 25 },
    { size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 25 },
  ],
  56: [
    { size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 40 },
    { size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 40 },
    { size: "Front print service", sizeAr: "خدمة طباعة الوجه الأمامي", unitPrice: 40 },
  ],
  57: [
    { size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 15 },
    { size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 15 },
    { size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 15 },
  ],
  58: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 35 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 35 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 35 },
  ],
  59: [
    { size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 30 },
    { size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 30 },
    { size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 30 },
  ],
  60: [
    { size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 40 },
    { size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 40 },
    { size: "Printing service", sizeAr: "خدمة الطباعة", unitPrice: 40 },
  ],
  63: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 240 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 240 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 240 },
  ],
  64: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
  ],
  65: [
    { size: "15 × 20 cm · 5 mm", sizeAr: "١٥ × ٢٠ سم · ٥ مم", unitPrice: 15 },
    { size: "20 × 25 cm · 8 mm", sizeAr: "٢٠ × ٢٥ سم · ٨ مم", unitPrice: 40 },
    { size: "25 × 30 cm · 10 mm", sizeAr: "٢٥ × ٣٠ سم · ١٠ مم", unitPrice: 75 },
  ],
  67: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
  ],
  69: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 140 },
  ],
  71: [
    { size: "Digital design", sizeAr: "تصميم رقمي", unitPrice: 50 },
    { size: "Digital design", sizeAr: "تصميم رقمي", unitPrice: 50 },
    { size: "Digital design", sizeAr: "تصميم رقمي", unitPrice: 50 },
  ],
  72: [
    { size: "A5", sizeAr: "A5", unitPrice: 0.777 },
    { size: "A4", sizeAr: "A4", unitPrice: 1.55925 },
    { size: "A3", sizeAr: "A3", unitPrice: 3.1185 },
  ],
  73: [
    { size: "6 × 6 cm", sizeAr: "٦ × ٦ سم", unitPrice: 0.09 },
    { size: "10 × 10 cm", sizeAr: "١٠ × ١٠ سم", unitPrice: 0.25 },
    { size: "10 × 15 cm", sizeAr: "١٠ × ١٥ سم", unitPrice: 0.375 },
  ],
};
