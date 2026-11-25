// Standard sizes and specifications. Unit prices are in SAR per item.
// Keep preset indices stable for saved carts.
// Volume-based presets use the catalogue's divisor of 10,000,000.
// Review exact artwork, dimensions and finishes for a final quotation.
export const pricePresets = {
  2: [
    { size: "9 × 5 cm", sizeAr: "9 × 5 سم", unitPrice: 0.1125 },
    { size: "10 × 7 cm", sizeAr: "10 × 7 سم", unitPrice: 0.175 },
    { size: "15 × 10 cm", sizeAr: "15 × 10 سم", unitPrice: 0.375 },
  ],
  3: [
    { size: "Standard print", sizeAr: "طباعة بالمواصفات الأساسية", unitPrice: 0.2 },
    { size: "Standard print", sizeAr: "طباعة بالمواصفات الأساسية", unitPrice: 0.2 },
    { size: "Standard print", sizeAr: "طباعة بالمواصفات الأساسية", unitPrice: 0.2 },
  ],
  4: [
    { size: "10 × 10 × 5 cm", sizeAr: "10 × 10 × 5 سم", unitPrice: 0.25 },
    { size: "15 × 12 × 6 cm", sizeAr: "15 × 12 × 6 سم", unitPrice: 0.54 },
    { size: "22 × 16 × 8 cm", sizeAr: "22 × 16 × 8 سم", unitPrice: 1.408 },
  ],
  5: [
    { size: "18 × 8 × 22 cm", sizeAr: "18 × 8 × 22 سم", unitPrice: 0.09504 },
    { size: "24 × 10 × 30 cm", sizeAr: "24 × 10 × 30 سم", unitPrice: 0.216 },
    { size: "32 × 12 × 36 cm", sizeAr: "32 × 12 × 36 سم", unitPrice: 0.41472 },
  ],
  6: [
    { size: "A6 closed · 1 fold", sizeAr: "A6 مطوي · طية واحدة", unitPrice: 0.3885 },
    { size: "DL closed · 2 folds", sizeAr: "DL مطوي · طيتان", unitPrice: 1.0395 },
    { size: "14 × 29.7 cm closed · 2 folds", sizeAr: "14 × 29.7 سم مطوي · طيتان", unitPrice: 2.079 },
  ],
  7: [
    { size: "A6", sizeAr: "A6", unitPrice: 0.3885 },
    { size: "A5", sizeAr: "A5", unitPrice: 0.777 },
    { size: "A4", sizeAr: "A4", unitPrice: 1.55925 },
  ],
  8: [
    { size: "A5 · 16 pages", sizeAr: "A5 · 16 صفحة", unitPrice: 24.864 },
    { size: "A5 · 24 pages", sizeAr: "A5 · 24 صفحة", unitPrice: 37.296 },
    { size: "A4 · 32 pages", sizeAr: "A4 · 32 صفحة", unitPrice: 99.792 },
  ],
  9: [
    { size: "A5 · 32 pages", sizeAr: "A5 · 32 صفحة", unitPrice: 1.98912 },
    { size: "A5 · 64 pages", sizeAr: "A5 · 64 صفحة", unitPrice: 3.97824 },
    { size: "A4 · 96 pages", sizeAr: "A4 · 96 صفحة", unitPrice: 11.97504 },
  ],
  10: [
    { size: "A5 · 24 pages", sizeAr: "A5 · 24 صفحة", unitPrice: 7.4592 },
    { size: "A5 · 48 pages", sizeAr: "A5 · 48 صفحة", unitPrice: 14.9184 },
    { size: "A4 · 64 pages", sizeAr: "A4 · 64 صفحة", unitPrice: 39.9168 },
  ],
  11: [
    { size: "Up to 50 sheets", sizeAr: "حتى 50 ورقة", unitPrice: 5 },
    { size: "51–100 sheets", sizeAr: "51–100 ورقة", unitPrice: 5 },
    { size: "More than 100 sheets", sizeAr: "أكثر من 100 ورقة", unitPrice: 10, optionId: "more-than-100-sheets" },
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
    { size: "10 × 5 cm", sizeAr: "10 × 5 سم", unitPrice: 4 },
    { size: "12 × 6 cm", sizeAr: "12 × 6 سم", unitPrice: 5.76 },
    { size: "15 × 7 cm", sizeAr: "15 × 7 سم", unitPrice: 8.4 },
  ],
  21: [
    { size: "10 × 5 cm", sizeAr: "10 × 5 سم", unitPrice: 12.5 },
    { size: "12 × 6 cm", sizeAr: "12 × 6 سم", unitPrice: 18 },
    { size: "15 × 7 cm", sizeAr: "15 × 7 سم", unitPrice: 26.25 },
  ],
  22: [
    { size: "3 × 3 cm", sizeAr: "3 × 3 سم", unitPrice: 0.027 },
    { size: "5 × 5 cm", sizeAr: "5 × 5 سم", unitPrice: 0.075 },
    { size: "6 × 6 cm", sizeAr: "6 × 6 سم", unitPrice: 0.108 },
  ],
  23: [
    { size: "3 × 3 cm", sizeAr: "3 × 3 سم", unitPrice: 0.045 },
    { size: "5 × 5 cm", sizeAr: "5 × 5 سم", unitPrice: 0.125 },
    { size: "6 × 6 cm", sizeAr: "6 × 6 سم", unitPrice: 0.18 },
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
    { size: "100 × 60 cm", sizeAr: "100 × 60 سم", unitPrice: 30 },
    { size: "150 × 80 cm", sizeAr: "150 × 80 سم", unitPrice: 60 },
    { size: "200 × 100 cm", sizeAr: "200 × 100 سم", unitPrice: 100 },
  ],
  27: [
    { size: "100 × 60 cm", sizeAr: "100 × 60 سم", unitPrice: 42 },
    { size: "150 × 80 cm", sizeAr: "150 × 80 سم", unitPrice: 84 },
    { size: "200 × 100 cm", sizeAr: "200 × 100 سم", unitPrice: 140 },
  ],
  28: [
    { size: "50 × 150 cm", sizeAr: "50 × 150 سم", unitPrice: 140 },
    { size: "85 × 200 cm", sizeAr: "85 × 200 سم", unitPrice: 182, optionId: "medium-size" },
    { size: "100 × 200 cm", sizeAr: "100 × 200 سم", unitPrice: 252, optionId: "large-size" },
  ],
  29: [
    { size: "30 × 40 cm", sizeAr: "30 × 40 سم", unitPrice: 8.4 },
    { size: "50 × 70 cm", sizeAr: "50 × 70 سم", unitPrice: 24.5 },
    { size: "70 × 100 cm", sizeAr: "70 × 100 سم", unitPrice: 49 },
  ],
  30: [
    { size: "40 × 30 cm", sizeAr: "40 × 30 سم", unitPrice: 8.4 },
    { size: "80 × 60 cm", sizeAr: "80 × 60 سم", unitPrice: 33.6 },
    { size: "120 × 80 cm", sizeAr: "120 × 80 سم", unitPrice: 67.2 },
  ],
  31: [
    { size: "30 × 20 cm", sizeAr: "30 × 20 سم", unitPrice: 6 },
    { size: "60 × 40 cm", sizeAr: "60 × 40 سم", unitPrice: 24 },
    { size: "100 × 60 cm", sizeAr: "100 × 60 سم", unitPrice: 60 },
  ],
  32: [
    { size: "40 × 30 cm", sizeAr: "40 × 30 سم", unitPrice: 13.2 },
    { size: "70 × 50 cm", sizeAr: "70 × 50 سم", unitPrice: 38.5 },
    { size: "100 × 70 cm", sizeAr: "100 × 70 سم", unitPrice: 77 },
  ],
  33: [
    { size: "40 × 30 cm", sizeAr: "40 × 30 سم", unitPrice: 16.8 },
    { size: "70 × 50 cm", sizeAr: "70 × 50 سم", unitPrice: 49 },
    { size: "100 × 70 cm", sizeAr: "100 × 70 سم", unitPrice: 98 },
  ],
  34: [
    { size: "40 × 30 cm", sizeAr: "40 × 30 سم", unitPrice: 21.6 },
    { size: "70 × 50 cm", sizeAr: "70 × 50 سم", unitPrice: 63 },
    { size: "100 × 70 cm", sizeAr: "100 × 70 سم", unitPrice: 126 },
  ],
  35: [
    { size: "40 × 30 cm", sizeAr: "40 × 30 سم", unitPrice: 48 },
    { size: "70 × 50 cm", sizeAr: "70 × 50 سم", unitPrice: 140 },
    { size: "100 × 70 cm", sizeAr: "100 × 70 سم", unitPrice: 280 },
  ],
  36: [
    { size: "60 × 40 cm", sizeAr: "60 × 40 سم", unitPrice: 33.6 },
    { size: "100 × 70 cm", sizeAr: "100 × 70 سم", unitPrice: 98 },
    { size: "150 × 100 cm", sizeAr: "150 × 100 سم", unitPrice: 210 },
  ],
  37: [
    { size: "40 × 60 cm", sizeAr: "40 × 60 سم", unitPrice: 33.6 },
    { size: "55 × 85 cm", sizeAr: "55 × 85 سم", unitPrice: 65.45 },
    { size: "70 × 110 cm", sizeAr: "70 × 110 سم", unitPrice: 107.8 },
  ],
  38: [
    { size: "40 × 60 cm", sizeAr: "40 × 60 سم", unitPrice: 38.4 },
    { size: "55 × 85 cm", sizeAr: "55 × 85 سم", unitPrice: 74.8 },
    { size: "70 × 110 cm", sizeAr: "70 × 110 سم", unitPrice: 123.2 },
  ],
  39: [
    { size: "40 × 60 cm", sizeAr: "40 × 60 سم", unitPrice: 120 },
    { size: "55 × 85 cm", sizeAr: "55 × 85 سم", unitPrice: 233.75 },
    { size: "70 × 110 cm", sizeAr: "70 × 110 سم", unitPrice: 385 },
  ],
  40: [
    { size: "40 × 60 cm", sizeAr: "40 × 60 سم", unitPrice: 120 },
    { size: "55 × 85 cm", sizeAr: "55 × 85 سم", unitPrice: 233.75 },
    { size: "70 × 110 cm", sizeAr: "70 × 110 سم", unitPrice: 385 },
  ],
  41: [
    { size: "15 × 5 cm · 3 mm", sizeAr: "15 × 5 سم · 3 مم", unitPrice: 0.45 },
    { size: "20 × 8 cm · 5 mm", sizeAr: "20 × 8 سم · 5 مم", unitPrice: 1.6 },
    { size: "25 × 9 cm · 8 mm", sizeAr: "25 × 9 سم · 8 مم", unitPrice: 3.6 },
  ],
  42: [
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 100 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 100 },
    { size: "Standard model", sizeAr: "النموذج الأساسي", unitPrice: 100 },
  ],
  43: [
    { size: "15 × 15 cm flat", sizeAr: "15 × 15 سم قبل الطي", unitPrice: 1.6875 },
    { size: "21 × 20 cm flat", sizeAr: "21 × 20 سم قبل الطي", unitPrice: 3.15 },
    { size: "29.7 × 21 cm flat", sizeAr: "29.7 × 21 سم قبل الطي", unitPrice: 4.67775 },
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
    { size: "Cup size 7", sizeAr: "مقاس كوب 7", unitPrice: 0.6, optionId: "cup-size-7" },
    { size: "Cup size 9", sizeAr: "مقاس كوب 9", unitPrice: 0.72, optionId: "cup-size-9" },
    { size: "Cup size 12", sizeAr: "مقاس كوب 12", unitPrice: 0.84, optionId: "cup-size-12" },
  ],
  47: [
    { size: "Cup size 7", sizeAr: "مقاس كوب 7", unitPrice: 0.4, optionId: "cup-size-7" },
    { size: "Cup size 9", sizeAr: "مقاس كوب 9", unitPrice: 0.48, optionId: "cup-size-9" },
    { size: "Cup size 12", sizeAr: "مقاس كوب 12", unitPrice: 0.56, optionId: "cup-size-12" },
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
    { size: "15 × 20 cm · 5 mm", sizeAr: "15 × 20 سم · 5 مم", unitPrice: 1.5 },
    { size: "20 × 25 cm · 8 mm", sizeAr: "20 × 25 سم · 8 مم", unitPrice: 4 },
    { size: "25 × 30 cm · 10 mm", sizeAr: "25 × 30 سم · 10 مم", unitPrice: 7.5 },
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
    { size: "6 × 6 cm", sizeAr: "6 × 6 سم", unitPrice: 0.09 },
    { size: "10 × 10 cm", sizeAr: "10 × 10 سم", unitPrice: 0.25 },
    { size: "10 × 15 cm", sizeAr: "10 × 15 سم", unitPrice: 0.375 },
  ],
};
