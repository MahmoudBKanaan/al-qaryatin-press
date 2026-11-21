export const products = [
  {
    "id": "custom-paper-cards",
    "code": "A0001",
    "row": 2,
    "name": "Custom paper cards",
    "nameAr": "كروت مخصصة",
    "category": "print",
    "catalogCategory": "Paper cards",
    "type": "Paper sheet",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 25,
    "unit": "square metre",
    "minimum": 100,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Print-grade cardstock.",
    "description": "Cards printed with the customer's design for use as thank-you cards, gift cards or invitations.",
    "specifications": "Cut to the approved size and printed on one or both sides as requested, on 350 gsm cardstock, with or without gloss or matte lamination.",
    "requirements": "Design content",
    "intake": [
      "Card length",
      "Card width",
      "Number of cards",
      "Lamination choice: none, gloss or matte",
      "Rounded or sharp corners",
      "Single-sided or double-sided printing",
      "Custom contour cutting or straight cutting"
    ],
    "options": [
      {
        "id": "double-sided-printing",
        "label": "Double-sided printing",
        "labelAr": "طباعة على وجهين",
        "value": "2x",
        "multiplier": 2
      },
      {
        "id": "gloss-lamination",
        "label": "Gloss lamination",
        "labelAr": "سلفان لامع",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "matte-lamination",
        "label": "Matte lamination",
        "labelAr": "سلفان مطفي",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "custom-contour-cutting",
        "label": "Custom contour cutting",
        "labelAr": "قص حسب الشكل",
        "value": "2x",
        "multiplier": 2
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-2.webp"
  },
  {
    "id": "business-cards",
    "code": "A0002",
    "row": 3,
    "name": "Business cards",
    "nameAr": "كرت شخصي",
    "category": "print",
    "catalogCategory": "Paper cards",
    "type": "Paper sheet",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 0.2,
    "unit": "piece",
    "minimum": 500,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Print-grade cardstock.",
    "description": "Personal identification cards displaying the name, job title and contact details.",
    "specifications": "Print the details and logo and cut the cards to the approved size.",
    "requirements": "Design content",
    "intake": [
      "Gloss or matte lamination",
      "Rounded or sharp corners"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-3.webp"
  },
  {
    "id": "paper-boxes",
    "code": "A0003",
    "row": 4,
    "name": "Paper boxes",
    "nameAr": "علب ورقية",
    "category": "packaging",
    "catalogCategory": "Paper packaging",
    "type": "Box",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 5000,
    "unit": "cubic metre",
    "minimum": 1000,
    "maximum": 100000,
    "turnaround": "3 to 5 days",
    "turnaroundAr": "3 إلى 5 أيام",
    "material": "Folding carton board suited to the packaging type.",
    "description": "Printed boxes for holding products and presenting them with the store's branding.",
    "specifications": "Print, cut and crease the fold lines according to the approved box dieline.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Item height",
      "Quantity",
      "Lamination choice: none, gloss or matte",
      "Outside-only printing or printing on both outside and inside"
    ],
    "options": [
      {
        "id": "gloss-lamination",
        "label": "Gloss lamination",
        "labelAr": "سلفان لامع",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "matte-lamination",
        "label": "Matte lamination",
        "labelAr": "سلفان مطفي",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      }
    ],
    "formula": "L × W × H × Q ÷ 10,000,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "height",
        "label": "Height or thickness",
        "labelAr": "الارتفاع أو السماكة",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-4.webp"
  },
  {
    "id": "paper-bags",
    "code": "A0004",
    "row": 5,
    "name": "Paper bags",
    "nameAr": "أكياس ورقية",
    "category": "packaging",
    "catalogCategory": "Paper packaging",
    "type": "Bag",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 300,
    "unit": "cubic metre",
    "minimum": 1000,
    "maximum": 100000,
    "turnaround": "3 to 5 days",
    "turnaroundAr": "3 إلى 5 أيام",
    "material": "Kraft paper or coated paper, as requested.",
    "description": "Paper bags printed with the store logo for handing over purchases.",
    "specifications": "Print and assemble the bag in the agreed size and with the agreed handle type.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Item height",
      "Quantity",
      "Silver or gold foil stamping",
      "Lamination choice: none, gloss or matte"
    ],
    "options": [
      {
        "id": "inside-printing",
        "label": "Inside printing",
        "labelAr": "طباعة داخلية",
        "value": "1.2x",
        "multiplier": 1.2
      },
      {
        "id": "foil-stamping",
        "label": "Foil stamping",
        "labelAr": "طباعة بالفويل",
        "value": "1.2x",
        "multiplier": 1.2
      }
    ],
    "formula": "L × W × H × Q ÷ 10,000,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "height",
        "label": "Height or thickness",
        "labelAr": "الارتفاع أو السماكة",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-5.webp"
  },
  {
    "id": "folded-leaflets",
    "code": "A0005",
    "row": 6,
    "name": "Folded leaflets",
    "nameAr": "مطويات",
    "category": "print",
    "catalogCategory": "Marketing print",
    "type": "Paper sheet",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 25,
    "unit": "square metre",
    "minimum": 100,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Coated or uncoated paper suitable for folding.",
    "description": "A folded leaflet that distributes information across successive sections opened by the reader in sequence.",
    "specifications": "Print, cut and fold according to the number and direction of folds in the design.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Number of folds",
      "Quantity",
      "Lamination choice: none, gloss or matte"
    ],
    "options": [
      {
        "id": "double-sided-printing",
        "label": "Double-sided printing",
        "labelAr": "طباعة على وجهين",
        "value": "2x",
        "multiplier": 2
      },
      {
        "id": "gloss-lamination",
        "label": "Gloss lamination",
        "labelAr": "سلفان لامع",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "matte-lamination",
        "label": "Matte lamination",
        "labelAr": "سلفان مطفي",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "custom-contour-cutting",
        "label": "Custom contour cutting",
        "labelAr": "قص حسب الشكل",
        "value": "2x",
        "multiplier": 2
      },
      {
        "id": "number-of-folds",
        "label": "Number of folds",
        "labelAr": "عدد الطيات",
        "value": "-",
        "multiplier": null
      }
    ],
    "formula": "L × W × F × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "folds",
        "label": "Fold count",
        "labelAr": "عدد الطيات",
        "kind": "count"
      }
    ],
    "image": "./media/product-6.webp"
  },
  {
    "id": "brochures-and-flyers",
    "code": "A0006",
    "row": 7,
    "name": "Brochures and flyers",
    "nameAr": "بروشورات",
    "category": "print",
    "catalogCategory": "Marketing print",
    "type": "Paper sheet",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 25,
    "unit": "square metre",
    "minimum": 100,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Coated or uncoated printing paper.",
    "description": "A printed informational leaflet presenting products or services for distribution to customers.",
    "specifications": "Print and cut to the approved size, with the number of printed sides determined by the design.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "Lamination choice: none, gloss or matte"
    ],
    "options": [
      {
        "id": "double-sided-printing",
        "label": "Double-sided printing",
        "labelAr": "طباعة على وجهين",
        "value": "2x",
        "multiplier": 2
      },
      {
        "id": "gloss-lamination",
        "label": "Gloss lamination",
        "labelAr": "سلفان لامع",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "matte-lamination",
        "label": "Matte lamination",
        "labelAr": "سلفان مطفي",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "custom-contour-cutting",
        "label": "Custom contour cutting",
        "labelAr": "قص حسب الشكل",
        "value": "2x",
        "multiplier": 2
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-7.webp"
  },
  {
    "id": "magazines",
    "code": "A0007",
    "row": 8,
    "name": "Magazines",
    "nameAr": "مجلات",
    "category": "print",
    "catalogCategory": "Books and magazines",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 25,
    "unit": "square metre",
    "minimum": 100,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Interior paper and cover paper, as requested.",
    "description": "A printed magazine combining articles and images in a bound copy.",
    "specifications": "Print the cover and interior pages, collate them and bind them according to the approved specifications.",
    "requirements": "PDF file",
    "intake": [
      "Item length",
      "Item width",
      "Magazine page count",
      "Number of copies",
      "Gloss or matte cover lamination",
      "Deluxe binding or magazine binding"
    ],
    "options": [],
    "formula": "L × W × P × Q × 2 ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "pages",
        "label": "Page count",
        "labelAr": "عدد الصفحات",
        "kind": "count"
      }
    ],
    "image": "./media/product-8.webp"
  },
  {
    "id": "black-and-white-books",
    "code": "A0008",
    "row": 9,
    "name": "Black and white books",
    "nameAr": "كتب أسود",
    "category": "print",
    "catalogCategory": "Books and magazines",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 2,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Uncoated interior paper and a cover as requested.",
    "description": "A bound book with black and white interior pages.",
    "specifications": "Print the body in black, collate the pages and attach the cover using the agreed binding.",
    "requirements": "PDF file",
    "intake": [
      "Item length",
      "Item width",
      "Page count",
      "Number of copies",
      "Stapling or metal wire binding"
    ],
    "options": [
      {
        "id": "metal-wire-binding",
        "label": "Metal wire binding",
        "labelAr": "تسليك معدني",
        "value": "Additional product",
        "multiplier": null,
        "productId": "metal-wire-binding"
      }
    ],
    "formula": "L × W × P ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "pages",
        "label": "Page count",
        "labelAr": "عدد الصفحات",
        "kind": "count"
      }
    ],
    "image": "./media/product-9.webp"
  },
  {
    "id": "colour-books",
    "code": "A0009",
    "row": 10,
    "name": "Colour books",
    "nameAr": "كتب ملون",
    "category": "print",
    "catalogCategory": "Books and magazines",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 10,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Interior paper suitable for colour printing and cover paper.",
    "description": "A bound book with colour interior pages for text, photographs and illustrations.",
    "specifications": "Print the body in colour, collate the pages and attach the cover using the agreed binding.",
    "requirements": "PDF file",
    "intake": [
      "Item length",
      "Item width",
      "Page count",
      "Number of copies",
      "Stapling or metal wire binding"
    ],
    "options": [
      {
        "id": "metal-wire-binding",
        "label": "Metal wire binding",
        "labelAr": "تسليك معدني",
        "value": "Additional product",
        "multiplier": null,
        "productId": "metal-wire-binding"
      }
    ],
    "formula": "L × W × P ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "pages",
        "label": "Page count",
        "labelAr": "عدد الصفحات",
        "kind": "count"
      }
    ],
    "image": "./media/product-10.webp"
  },
  {
    "id": "metal-wire-binding",
    "code": "A0010",
    "row": 11,
    "name": "Metal wire binding",
    "nameAr": "تسليك معدني",
    "category": "services",
    "catalogCategory": "Binding and finishing",
    "type": "Service",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 5,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Metal binding wire.",
    "description": "Bind printed sheets with wire that allows pages to turn and the book to open flat.",
    "specifications": "Punch the edge and fit a wire appropriate for the thickness of the sheet stack.",
    "requirements": "-",
    "intake": [
      "Number of sheets in the book"
    ],
    "options": [
      {
        "id": "more-than-100-sheets",
        "label": "More than 100 sheets",
        "labelAr": "أكثر من ١٠٠ ورقة",
        "value": "2x",
        "multiplier": 2
      }
    ],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-11.webp"
  },
  {
    "id": "round-badges",
    "code": "A0011",
    "row": 12,
    "name": "Round badges",
    "nameAr": "بروش دائري",
    "category": "gifts",
    "catalogCategory": "Badges and pins",
    "type": "Badge",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 20,
    "unit": "piece",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Round base, pin and printed face.",
    "description": "A round badge displaying a logo or phrase and fastening to clothing.",
    "specifications": "Print the circular face and assemble it with the base and pin.",
    "requirements": "Design content",
    "intake": [],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-12.webp"
  },
  {
    "id": "metal-badges",
    "code": "A0012",
    "row": 13,
    "name": "Metal badges",
    "nameAr": "بروش معدني",
    "category": "gifts",
    "catalogCategory": "Badges and pins",
    "type": "Badge",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 25,
    "unit": "piece",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Metal with a rear fastener.",
    "description": "A metal badge carrying the establishment's logo or an event symbol and fastening to clothing.",
    "specifications": "Apply the logo to the face and fit the rear fastener according to the selected model.",
    "requirements": "Design content",
    "intake": [
      "Gold or silver colour",
      "Pin or magnetic rear fastener"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-13.webp"
  },
  {
    "id": "acrylic-badges",
    "code": "A0013",
    "row": 14,
    "name": "Acrylic badges",
    "nameAr": "بروش كريليك",
    "category": "gifts",
    "catalogCategory": "Badges and pins",
    "type": "Badge",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 15,
    "unit": "piece",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Acrylic sheet with a rear fastener.",
    "description": "An acrylic badge cut to the approved logo or illustration shape.",
    "specifications": "Cut the shape, apply the design to the face and fit the rear fastener.",
    "requirements": "Design content",
    "intake": [
      "Front or rear printing",
      "Black or white acrylic"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-14.webp"
  },
  {
    "id": "payment-voucher-books",
    "code": "A0014",
    "row": 15,
    "name": "Payment voucher books",
    "nameAr": "دفتر سند صرف",
    "category": "stationery",
    "catalogCategory": "Business books and forms",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 4.5,
    "unit": "square metre",
    "minimum": 6,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Ordinary paper or carbonless copy paper (NCR).",
    "description": "Voucher books for recording outgoing payments, including the recipient, amount and reason for payment.",
    "specifications": "Print the form and assemble vouchers into books with the approved number of copies.",
    "requirements": "Commercial registration, mobile number, tax number and address",
    "intake": [
      "Book length",
      "Book width",
      "Number of books",
      "Commercial registration number",
      "Mobile number",
      "Address",
      "Tax number if applicable",
      "Establishment or company name",
      "Original only, original plus one copy, or original plus two copies",
      "Starting serial number: 1 or another number"
    ],
    "options": [
      {
        "id": "original-plus-two-copies",
        "label": "Original plus two copies",
        "labelAr": "أصل وصورتان",
        "value": "1.2x",
        "multiplier": 1.2
      }
    ],
    "formula": "L × W × 100 ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-15.webp"
  },
  {
    "id": "receipt-voucher-books",
    "code": "A0015",
    "row": 16,
    "name": "Receipt voucher books",
    "nameAr": "دفتر  سند قبض",
    "category": "stationery",
    "catalogCategory": "Business books and forms",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 4.5,
    "unit": "square metre",
    "minimum": 6,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Ordinary paper or carbonless copy paper (NCR).",
    "description": "Voucher books for recording received payments, including the payer, amount and payment method.",
    "specifications": "Print the form and assemble vouchers into books with the approved number of copies.",
    "requirements": "Commercial registration, mobile number, tax number and address",
    "intake": [
      "Book length",
      "Book width",
      "Number of books",
      "Commercial registration number",
      "Mobile number",
      "Address",
      "Tax number if applicable",
      "Establishment or company name",
      "Original only, original plus one copy, or original plus two copies",
      "Starting serial number: 1 or another number"
    ],
    "options": [
      {
        "id": "original-plus-two-copies",
        "label": "Original plus two copies",
        "labelAr": "أصل وصورتان",
        "value": "1.2x",
        "multiplier": 1.2
      }
    ],
    "formula": "L × W × 100 ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-16.webp"
  },
  {
    "id": "invoice-books",
    "code": "A0016",
    "row": 17,
    "name": "Invoice books",
    "nameAr": "دفتر  فاتورة",
    "category": "stationery",
    "catalogCategory": "Business books and forms",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 4.5,
    "unit": "square metre",
    "minimum": 6,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Ordinary paper or carbonless copy paper (NCR).",
    "description": "Paper invoice books with fields for customer details, line items, quantities and amounts.",
    "specifications": "Print the invoice fields and assemble the forms into books with the approved number of copies.",
    "requirements": "Commercial registration, mobile number, tax number and address",
    "intake": [
      "Book length",
      "Book width",
      "Number of books",
      "Commercial registration number",
      "Mobile number",
      "Address",
      "Tax number if applicable",
      "Establishment or company name",
      "Original only, original plus one copy, or original plus two copies",
      "Starting serial number: 1 or another number"
    ],
    "options": [
      {
        "id": "original-plus-two-copies",
        "label": "Original plus two copies",
        "labelAr": "أصل وصورتان",
        "value": "1.2x",
        "multiplier": 1.2
      }
    ],
    "formula": "L × W × 100 ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-17.webp"
  },
  {
    "id": "commercial-contract-books",
    "code": "A0017",
    "row": 18,
    "name": "Commercial contract books",
    "nameAr": "دفتر  عقد تجاري",
    "category": "stationery",
    "catalogCategory": "Business books and forms",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 4.5,
    "unit": "square metre",
    "minimum": 6,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Ordinary paper or carbonless copy paper (NCR).",
    "description": "Contract books printed with the customer's text and fields for the parties' details and signatures.",
    "specifications": "Print the approved text, arrange each contract's pages and assemble them into books.",
    "requirements": "Commercial registration, mobile number, tax number and address",
    "intake": [
      "Book length",
      "Book width",
      "Number of books",
      "Commercial registration number",
      "Mobile number",
      "Address",
      "Tax number if applicable",
      "Establishment or company name",
      "Original only, original plus one copy, or original plus two copies",
      "Starting serial number: 1 or another number"
    ],
    "options": [
      {
        "id": "original-plus-two-copies",
        "label": "Original plus two copies",
        "labelAr": "أصل وصورتان",
        "value": "1.2x",
        "multiplier": 1.2
      }
    ],
    "formula": "L × W × 100 ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-18.webp"
  },
  {
    "id": "company-letterhead-pads",
    "code": "A0018",
    "row": 19,
    "name": "Company letterhead pads",
    "nameAr": "دفتر ورق مؤسسة",
    "category": "stationery",
    "catalogCategory": "Office stationery",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 16,
    "unit": "square metre",
    "minimum": 6,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Uncoated writing paper suitable for correspondence.",
    "description": "Correspondence paper carrying the establishment's logo and details, with space for letters.",
    "specifications": "Print the establishment's letterhead and contact details at the approved size.",
    "requirements": "Commercial registration, mobile number, tax number and address",
    "intake": [
      "Commercial registration number",
      "Mobile number",
      "Address",
      "Tax number if applicable",
      "Establishment or company name",
      "Paper type: textured, snowy, shaded or wavy",
      "Pad length",
      "Pad width"
    ],
    "options": [],
    "formula": "L × W × 100 ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-19.webp"
  },
  {
    "id": "paper-coupon-books",
    "code": "A0019",
    "row": 20,
    "name": "Paper coupon books",
    "nameAr": "دفتر كوبون ورقي",
    "category": "stationery",
    "catalogCategory": "Coupons",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 8,
    "unit": "square metre",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Writable printing paper.",
    "description": "Books of paper coupons for offers or collection, printed with the issuing organisation's details.",
    "specifications": "Print, cut and assemble the coupons into books according to the selected model.",
    "requirements": "Design content",
    "intake": [
      "Original only, original plus one copy, or original plus two copies",
      "Starting serial number: 1 or another number",
      "Book length",
      "Book width"
    ],
    "options": [],
    "formula": "L × W × 100 ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-20.webp"
  },
  {
    "id": "premium-coupon-books",
    "code": "A0020",
    "row": 21,
    "name": "Premium coupon books",
    "nameAr": "دفتر كوبون فاخر",
    "category": "stationery",
    "catalogCategory": "Coupons",
    "type": "Book or pad",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 25,
    "unit": "square metre",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Cardstock or premium paper according to the sample.",
    "description": "Gift or promotional coupons printed on premium paper with the organisation's branding.",
    "specifications": "Print and cut the coupons to the approved size and finish them according to the sample.",
    "requirements": "Design content",
    "intake": [
      "Starting serial number: 1 or another number",
      "Book length",
      "Book width",
      "Thick or thin premium paper"
    ],
    "options": [],
    "formula": "L × W × 100 ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-21.webp"
  },
  {
    "id": "paper-stickers",
    "code": "A0021",
    "row": 22,
    "name": "Paper stickers",
    "nameAr": "ملصق (ستكر ورقي)",
    "category": "stickers",
    "catalogCategory": "Stickers",
    "type": "Sticker",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 30,
    "unit": "square metre",
    "minimum": 500,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Self-adhesive paper with a backing liner.",
    "description": "Printed paper labels for identifying products or decorating paper packaging.",
    "specifications": "Print the design and cut the sticker outline while retaining the removable backing liner.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "Custom contour cutting or straight cutting"
    ],
    "options": [
      {
        "id": "custom-contour-cutting",
        "label": "Custom contour cutting",
        "labelAr": "قص حسب الشكل",
        "value": "2x",
        "multiplier": 2
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-22.webp"
  },
  {
    "id": "small-nylon-stickers",
    "code": "A0022",
    "row": 23,
    "name": "Small nylon stickers",
    "nameAr": "ستكر نايلون (ملصقات صغيرة)",
    "category": "stickers",
    "catalogCategory": "Stickers",
    "type": "Sticker",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 50,
    "unit": "square metre",
    "minimum": 500,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Self-adhesive plastic film.",
    "description": "Printed plastic labels for packaging and products.",
    "specifications": "Print the design and cut the shape at the approved size on a removable backing liner.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "Custom contour cutting or straight cutting"
    ],
    "options": [
      {
        "id": "custom-contour-cutting",
        "label": "Custom contour cutting",
        "labelAr": "قص حسب الشكل",
        "value": "2x",
        "multiplier": 2
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-23.webp"
  },
  {
    "id": "large-a4-nylon-stickers",
    "code": "A0022",
    "row": 24,
    "name": "Large A4 nylon stickers",
    "nameAr": "ستكر نايلون (ملصقات كبيرة A4)",
    "category": "stickers",
    "catalogCategory": "Stickers",
    "type": "Sticker",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 50,
    "unit": "square metre",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Self-adhesive plastic film.",
    "description": "Printed plastic labels for packaging and products.",
    "specifications": "Print the design and cut the shape at the approved size on a removable backing liner.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "Custom contour cutting or straight cutting"
    ],
    "options": [
      {
        "id": "custom-contour-cutting",
        "label": "Custom contour cutting",
        "labelAr": "قص حسب الشكل",
        "value": "2x",
        "multiplier": 2
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-24.webp"
  },
  {
    "id": "large-a4-german-vinyl-stickers",
    "code": "A0023",
    "row": 25,
    "name": "Large A4 German vinyl stickers",
    "nameAr": "ستكر ألماني (ملصقات كبيرة A4)",
    "category": "stickers",
    "catalogCategory": "Stickers",
    "type": "Sticker",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 70,
    "unit": "square metre",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Self-adhesive vinyl from the approved German grade.",
    "description": "A vinyl sticker for graphics and branding on smooth surfaces.",
    "specifications": "Produce the design and cut the vinyl to the approved size and shape.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "Custom contour cutting or straight cutting"
    ],
    "options": [
      {
        "id": "custom-contour-cutting",
        "label": "Custom contour cutting",
        "labelAr": "قص حسب الشكل",
        "value": "2x",
        "multiplier": 2
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-25.webp"
  },
  {
    "id": "chinese-banner-printing",
    "code": "A0024",
    "row": 26,
    "name": "Chinese banner printing",
    "nameAr": "بنر صيني",
    "category": "signage",
    "catalogCategory": "Advertising banners",
    "type": "Banner",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 50,
    "unit": "square metre",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Chinese fabric-reinforced PVC banner material.",
    "description": "A flexible banner printed with an advertisement or event design.",
    "specifications": "Colour printing and cutting to the approved size.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-26.webp"
  },
  {
    "id": "korean-banner-printing",
    "code": "A0025",
    "row": 27,
    "name": "Korean banner printing",
    "nameAr": "بنر كوري",
    "category": "signage",
    "catalogCategory": "Advertising banners",
    "type": "Banner",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 70,
    "unit": "square metre",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Korean fabric-reinforced PVC banner material.",
    "description": "A flexible printed banner displaying an advertisement or event identity.",
    "specifications": "Colour printing and cutting to the approved size.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-27.webp"
  },
  {
    "id": "roll-up-display-stands",
    "code": "A0026",
    "row": 28,
    "name": "Roll up display stands",
    "nameAr": "رول أب",
    "category": "signage",
    "catalogCategory": "Display stands",
    "type": "Stand",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 140,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Rollable display material, retractable base and support pole.",
    "description": "A portable advertising stand whose printed face pulls out of the base for display and rolls back inside after use.",
    "specifications": "Print the display face at the size suited to the base and fit it into the retractable mechanism.",
    "requirements": "Design content",
    "intake": [
      "Size: small 50 x 150 cm, medium 85 x 200 cm, or large 100 x 200 cm"
    ],
    "options": [
      {
        "id": "medium-size",
        "label": "Medium size",
        "labelAr": "مقاس متوسط",
        "value": "1.3x",
        "multiplier": 1.3,
        "group": "size",
        "dimensions": "85 × 200 cm"
      },
      {
        "id": "large-size",
        "label": "Large size",
        "labelAr": "مقاس كبير",
        "value": "1.8x",
        "multiplier": 1.8,
        "group": "size",
        "dimensions": "100 × 200 cm"
      }
    ],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-28.webp"
  },
  {
    "id": "canvas-prints",
    "code": "A0027",
    "row": 29,
    "name": "Canvas prints",
    "nameAr": "كانفس",
    "category": "signage",
    "catalogCategory": "Art prints",
    "type": "Canvas sheet",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 70,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Canvas fabric intended for printing.",
    "description": "A photograph or artwork printed on a piece of canvas at the requested size.",
    "specifications": "Colour printing and cutting the fabric, leaving a stretching margin when requested.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-29.webp"
  },
  {
    "id": "perforated-vinyl-stickers",
    "code": "A0028",
    "row": 30,
    "name": "Perforated vinyl stickers",
    "nameAr": "ستكر مثقب",
    "category": "stickers",
    "catalogCategory": "Stickers",
    "type": "Sticker",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 70,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Perforated self-adhesive vinyl.",
    "description": "A sticker displaying a design on glass while retaining holes that allow visibility through it.",
    "specifications": "Print the outward-facing side and cut to the approved glass dimensions.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-30.webp"
  },
  {
    "id": "cut-out-vinyl-graphics",
    "code": "A0029",
    "row": 31,
    "name": "Cut out vinyl graphics",
    "nameAr": "ستكر مفرغ",
    "category": "stickers",
    "catalogCategory": "Stickers",
    "type": "Sticker",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 100,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Self-adhesive vinyl on a release liner.",
    "description": "Letters or logos cut from vinyl and transferred to the surface without a surrounding background.",
    "specifications": "Cut along the design path, weed the excess vinyl and prepare the elements for transfer.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-31.webp"
  },
  {
    "id": "foam-wall-panels",
    "code": "A0030",
    "row": 32,
    "name": "Foam wall panels",
    "nameAr": "لوحة فلين جدارية",
    "category": "signage",
    "catalogCategory": "Wall panels",
    "type": "Panel",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 110,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Lightweight foam board.",
    "description": "A lightweight panel for displaying graphics or instructions indoors.",
    "specifications": "Apply the design to the panel face and trim the edges to the approved size.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-32.webp"
  },
  {
    "id": "forex-wall-panels",
    "code": "A0031",
    "row": 33,
    "name": "Forex wall panels",
    "nameAr": "لوحة فوركس جدارية",
    "category": "signage",
    "catalogCategory": "Wall panels",
    "type": "Panel",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 140,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Foamed PVC board (Forex).",
    "description": "A rigid wall panel displaying the organisation's branding or instructional text.",
    "specifications": "Apply the design to the board surface and cut it to the approved size and shape.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-33.webp"
  },
  {
    "id": "stretched-canvas-wall-art",
    "code": "A0032",
    "row": 34,
    "name": "Stretched canvas wall art",
    "nameAr": "لوحة كانفس جدارية",
    "category": "signage",
    "catalogCategory": "Wall panels",
    "type": "Panel",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 180,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Canvas fabric and a wooden stretcher frame.",
    "description": "Wall art made from printed canvas stretched over an internal frame.",
    "specifications": "Print the image, stretch the fabric and secure its edges to the frame.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-34.webp"
  },
  {
    "id": "acrylic-wall-panels",
    "code": "A0033",
    "row": 35,
    "name": "Acrylic wall panels",
    "nameAr": "لوحة كريليك جدارية",
    "category": "signage",
    "catalogCategory": "Wall panels",
    "type": "Panel",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 400,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Acrylic sheet.",
    "description": "An acrylic wall panel displaying a logo, name or instructions.",
    "specifications": "Cut the sheet and apply the text or logo according to the approved design and size.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "High or low acrylic thickness"
    ],
    "options": [
      {
        "id": "high-thickness",
        "label": "High thickness",
        "labelAr": "سماكة عالية",
        "value": "1.5x",
        "multiplier": 1.5
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-35.webp"
  },
  {
    "id": "wall-mounted-banner-panels",
    "code": "A0034",
    "row": 36,
    "name": "Wall mounted banner panels",
    "nameAr": "لوحة بنر جدارية",
    "category": "signage",
    "catalogCategory": "Wall panels",
    "type": "Panel",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 140,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Flexible banner material and a tensioning structure as requested.",
    "description": "A printed banner face prepared for wall display.",
    "specifications": "Print the face and finish the edges to suit the agreed mounting method.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-36.webp"
  },
  {
    "id": "foam-floor-display-stands",
    "code": "A0035",
    "row": 37,
    "name": "Foam floor display stands",
    "nameAr": "ستاند أرضي فلين",
    "category": "signage",
    "catalogCategory": "Display stands",
    "type": "Stand",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 140,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Lightweight foam board and a rear support or base.",
    "description": "A lightweight floor stand for an advertisement or a character cut-out at events.",
    "specifications": "Apply the design, cut the board outline and prepare a support suitable for the shape.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-37.webp"
  },
  {
    "id": "forex-floor-display-stands",
    "code": "A0036",
    "row": 38,
    "name": "Forex floor display stands",
    "nameAr": "ستاند أرضي فوركس",
    "category": "signage",
    "catalogCategory": "Display stands",
    "type": "Stand",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 160,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Foamed PVC board (Forex) and a base or support.",
    "description": "A floor stand with a Forex face for advertisements or instructions.",
    "specifications": "Produce and cut the display face and prepare the base or support to suit the size.",
    "requirements": "Design content",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "High or low Forex thickness"
    ],
    "options": [
      {
        "id": "high-thickness",
        "label": "High thickness",
        "labelAr": "سماكة عالية",
        "value": "1.5x",
        "multiplier": 1.5
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-38.webp"
  },
  {
    "id": "acrylic-floor-stand",
    "code": "A0037",
    "row": 39,
    "name": "Acrylic floor stand",
    "nameAr": "ستاند أرضي أكريليك",
    "category": "signage",
    "catalogCategory": "Display stands",
    "type": "Stand",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 500,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 36 to 70 hours",
    "turnaroundAr": "حوالي 36 إلى 70 ساعة",
    "material": "Acrylic sheets and a support base.",
    "description": "An acrylic floor stand displaying a logo or an informational message.",
    "specifications": "Cut the stand components, apply the design, and assemble the parts with the base.",
    "requirements": "Design details",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "High or low acrylic thickness"
    ],
    "options": [
      {
        "id": "high-thickness",
        "label": "High thickness",
        "labelAr": "سماكة عالية",
        "value": "1.5x",
        "multiplier": 1.5
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-39.webp"
  },
  {
    "id": "wooden-floor-stand",
    "code": "A0038",
    "row": 40,
    "name": "Wooden floor stand",
    "nameAr": "ستاند أرضي خشبي",
    "category": "signage",
    "catalogCategory": "Display stands",
    "type": "Stand",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 500,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 36 to 70 hours",
    "turnaroundAr": "حوالي 36 إلى 70 ساعة",
    "material": "Wood or MDF panels according to the design.",
    "description": "A wooden floor stand for displaying an advertisement or directing visitors.",
    "specifications": "Cut the frame and base, produce the display face, and assemble the stand components.",
    "requirements": "Design details",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "High or low wood thickness"
    ],
    "options": [
      {
        "id": "high-thickness",
        "label": "High thickness",
        "labelAr": "سماكة عالية",
        "value": "1.5x",
        "multiplier": 1.5
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-40.webp"
  },
  {
    "id": "acrylic-desk-nameplate",
    "code": "A0039",
    "row": 41,
    "name": "Acrylic desk nameplate",
    "nameAr": "لوحة إسمية مكتبية كريليك",
    "category": "stationery",
    "catalogCategory": "Desk nameplates",
    "type": "Panel",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 200000,
    "unit": "cubic metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Acrylic.",
    "description": "A desk nameplate displaying a person's name and job title.",
    "specifications": "Produce the approved name and title and prepare the nameplate to stand on a desk.",
    "requirements": "Design details",
    "intake": [
      "Item length",
      "Item width",
      "Item height",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × H × Q ÷ 10,000,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "height",
        "label": "Height or thickness",
        "labelAr": "الارتفاع أو السماكة",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-41.webp"
  },
  {
    "id": "self-inking-stamp",
    "code": "A0040",
    "row": 42,
    "name": "Self inking stamp",
    "nameAr": "ختم أوتامتيك",
    "category": "stationery",
    "catalogCategory": "Stamps",
    "type": "Stamp",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 100,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Rubber die, self-inking body, and internal ink pad.",
    "description": "A stamp that prints an organization's details when the body is pressed repeatedly.",
    "specifications": "Produce the approved impression die, fit it into the body, and adjust its alignment.",
    "requirements": "Design details",
    "intake": [
      "Business name",
      "Business unified number"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-42.webp"
  },
  {
    "id": "paper-table-stand",
    "code": "A0041",
    "row": 43,
    "name": "Paper table stand",
    "nameAr": "ستاند طاولة ورقي",
    "category": "signage",
    "catalogCategory": "Display stands",
    "type": "Sheet",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 75,
    "unit": "square metre",
    "minimum": 100,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Foldable cardstock.",
    "description": "A folded display card that stands on a table to show a name, number, or advertisement.",
    "specifications": "Print and cut the design and mark the fold lines needed to form the standing base.",
    "requirements": "Design details",
    "intake": [
      "Item length",
      "Item width",
      "Quantity"
    ],
    "options": [],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-43.webp"
  },
  {
    "id": "manual-stamp",
    "code": "A0042",
    "row": 44,
    "name": "Manual stamp",
    "nameAr": "ختم يدوي",
    "category": "stationery",
    "catalogCategory": "Stamps",
    "type": "Stamp",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 60,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Rubber die and manual handle.",
    "description": "A traditional stamp pressed onto a separate ink pad before printing the details.",
    "specifications": "Engrave the impression from the approved text or logo and attach it to the handle.",
    "requirements": "Design details",
    "intake": [
      "Business name and unified number, or the stamp details"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-44.webp"
  },
  {
    "id": "personal-stamp",
    "code": "A0043",
    "row": 45,
    "name": "Personal stamp",
    "nameAr": "ختم شخصي",
    "category": "stationery",
    "catalogCategory": "Stamps",
    "type": "Stamp",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 60,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Rubber die and a stamp body according to the selected model.",
    "description": "A stamp bearing a person's name to identify documents, with the option to add a job title.",
    "specifications": "Arrange the personal text within the approved impression size, then produce and fit the die.",
    "requirements": "Design details",
    "intake": [
      "Stamp details"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-45.webp"
  },
  {
    "id": "paper-cups",
    "code": "A0044",
    "row": 46,
    "name": "Paper cups",
    "nameAr": "أكواب ورقية",
    "category": "packaging",
    "catalogCategory": "Paper packaging",
    "type": "Cup",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 0.6,
    "unit": "piece",
    "minimum": 1000,
    "maximum": 100000,
    "turnaround": "3 to 5 days",
    "turnaroundAr": "3 إلى 5 أيام",
    "material": "Cup paper with an internal lining.",
    "description": "Paper cups carrying a cafe or event identity on the outside.",
    "specifications": "Apply the design within the printable area appropriate to the approved cup capacity.",
    "requirements": "Design details",
    "intake": [
      "Cup size: medium 7, large 9, or extra-large 12"
    ],
    "options": [
      {
        "id": "cup-size-7",
        "label": "Cup size 7",
        "labelAr": "مقاس كوب ٧",
        "value": "1x",
        "multiplier": 1,
        "group": "size"
      },
      {
        "id": "cup-size-9",
        "label": "Cup size 9",
        "labelAr": "مقاس كوب ٩",
        "value": "1.2x",
        "multiplier": 1.2,
        "group": "size"
      },
      {
        "id": "cup-size-12",
        "label": "Cup size 12",
        "labelAr": "مقاس كوب ١٢",
        "value": "1.4x",
        "multiplier": 1.4,
        "group": "size"
      }
    ],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-46.webp"
  },
  {
    "id": "paper-cup-stickers",
    "code": "A0045",
    "row": 47,
    "name": "Paper cup stickers",
    "nameAr": "ستكر أكواب ورقية",
    "category": "stickers",
    "catalogCategory": "Stickers",
    "type": "Sticker",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 0.4,
    "unit": "piece",
    "minimum": 1000,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Self-adhesive paper or film according to the intended use.",
    "description": "Separate stickers bearing a logo or order details for application to the outside of a cup.",
    "specifications": "Print the design and cut the stickers to the size and shape suitable for the cup.",
    "requirements": "Design details",
    "intake": [
      "Cup size: medium 7, large 9, or extra-large 12"
    ],
    "options": [
      {
        "id": "cup-size-7",
        "label": "Cup size 7",
        "labelAr": "مقاس كوب ٧",
        "value": "1x",
        "multiplier": 1,
        "group": "size"
      },
      {
        "id": "cup-size-9",
        "label": "Cup size 9",
        "labelAr": "مقاس كوب ٩",
        "value": "1.2x",
        "multiplier": 1.2,
        "group": "size"
      },
      {
        "id": "cup-size-12",
        "label": "Cup size 12",
        "labelAr": "مقاس كوب ١٢",
        "value": "1.4x",
        "multiplier": 1.4,
        "group": "size"
      }
    ],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-47.webp"
  },
  {
    "id": "paper-presentation-folder",
    "code": "A0046",
    "row": 48,
    "name": "Paper presentation folder",
    "nameAr": "ملف ورقي",
    "category": "stationery",
    "catalogCategory": "Office stationery",
    "type": "Sheet",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 2,
    "unit": "piece",
    "minimum": 1000,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Cardstock.",
    "description": "A folder carrying an organization's identity for holding and presenting documents.",
    "specifications": "Print and cut the folder, mark its fold lines, and form the pockets according to the approved model.",
    "requirements": "Design details",
    "intake": [
      "Folder details",
      "Gloss or matte lamination"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-48.webp"
  },
  {
    "id": "school-binder",
    "code": "A0047",
    "row": 49,
    "name": "School binder",
    "nameAr": "مجلد مدرسي",
    "category": "stationery",
    "catalogCategory": "Office stationery",
    "type": "Binder",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 60,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Polypropylene (PP) or cardstock.",
    "description": "A school binder printed with the school name or logo for holding student papers.",
    "specifications": "Print the cover in the approved size and design.",
    "requirements": "Design details",
    "intake": [
      "Folder details",
      "Selected design"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-49.webp"
  },
  {
    "id": "ceramic-mugs",
    "code": "A0048",
    "row": 50,
    "name": "Ceramic mugs",
    "nameAr": "اكواب سيراميك",
    "category": "gifts",
    "catalogCategory": "Promotional gifts",
    "type": "Cup",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 15,
    "unit": "piece",
    "minimum": 20,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "A ceramic mug prepared for printing.",
    "description": "A mug printed with a name, logo, or image and supplied ready for use.",
    "specifications": "Print the design within the designated area on the mug.",
    "requirements": "Design details",
    "intake": [
      "Mug details"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-50.webp"
  },
  {
    "id": "black-and-white-document-printing",
    "code": "A0049",
    "row": 51,
    "name": "Black and white document printing",
    "nameAr": "طباعة أوراق (أسود)",
    "category": "services",
    "catalogCategory": "Document printing",
    "type": "Sheet",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 2,
    "unit": "square metre",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "White printing paper.",
    "description": "Paper copies printed in black and grayscale and arranged in page order.",
    "specifications": "Print the required pages and copies in the agreed size and with the agreed number of printed sides.",
    "requirements": "PDF file",
    "intake": [
      "A4, A5, or A3 size",
      "Single-sided or double-sided printing",
      "Page count"
    ],
    "options": [],
    "formula": "L × W × P ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "pages",
        "label": "Page count",
        "labelAr": "عدد الصفحات",
        "kind": "count"
      }
    ],
    "image": "./media/product-51.webp"
  },
  {
    "id": "colour-document-printing",
    "code": "A0050",
    "row": 52,
    "name": "Colour document printing",
    "nameAr": "طباعة أوراق (ملون)",
    "category": "services",
    "catalogCategory": "Document printing",
    "type": "Sheet",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 10,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "White paper for colour printing.",
    "description": "Colour paper copies of a document, including its text and images as shown in the approved file.",
    "specifications": "Print the required pages and copies in the agreed size and with the agreed number of printed sides.",
    "requirements": "PDF file",
    "intake": [
      "A4, A5, or A3 size",
      "Single-sided or double-sided printing",
      "Page count"
    ],
    "options": [],
    "formula": "L × W × P ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "pages",
        "label": "Page count",
        "labelAr": "عدد الصفحات",
        "kind": "count"
      }
    ],
    "image": "./media/product-52.webp"
  },
  {
    "id": "colour-printing-on-black-paper",
    "code": "A0051",
    "row": 53,
    "name": "Colour printing on black paper",
    "nameAr": "طباعة ورق أسود (ملون)",
    "category": "print",
    "catalogCategory": "Specialty printing",
    "type": "Sheet",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 15,
    "unit": "square metre",
    "minimum": 100,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Black paper suitable for printing.",
    "description": "A colour design printed on black paper, with the appearance of the colours established on a print sample.",
    "specifications": "Print the approved colours and use a white underbase when the design requires it.",
    "requirements": "PDF file",
    "intake": [
      "A4, A5, or A3 size",
      "Single-sided or double-sided printing",
      "Page count"
    ],
    "options": [],
    "formula": "L × W × P ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "pages",
        "label": "Page count",
        "labelAr": "عدد الصفحات",
        "kind": "count"
      }
    ],
    "image": "./media/product-53.webp"
  },
  {
    "id": "premium-paper-printing",
    "code": "A0052",
    "row": 54,
    "name": "Premium paper printing",
    "nameAr": "طباعة ورق فاخر",
    "category": "print",
    "catalogCategory": "Specialty printing",
    "type": "Sheet",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 20,
    "unit": "square metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Premium paper in the selected weight and texture.",
    "description": "A design printed on selected paper for invitations, correspondence, and special printed items.",
    "specifications": "Print and cut the selected paper to the approved size.",
    "requirements": "PDF file",
    "intake": [
      "A4, A5, or A3 size",
      "Single-sided or double-sided printing",
      "Page count"
    ],
    "options": [],
    "formula": "L × W × P ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "pages",
        "label": "Page count",
        "labelAr": "عدد الصفحات",
        "kind": "count"
      }
    ],
    "image": "./media/product-54.webp"
  },
  {
    "id": "garment-printing",
    "code": "A0053",
    "row": 55,
    "name": "Garment printing",
    "nameAr": "طباعة ملابس",
    "category": "gifts",
    "catalogCategory": "Textile printing",
    "type": "Service",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 25,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "A garment made from a material suitable for printing.",
    "description": "A garment bearing a logo or phrase in the approved position.",
    "specifications": "Apply the print at the agreed artwork size and position.",
    "requirements": "Design details",
    "intake": [
      "Printing details",
      "Front only or front and back",
      "Front print dimensions",
      "Back print dimensions, if applicable"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-55.webp"
  },
  {
    "id": "dtf-garment-printing",
    "code": "A0054",
    "row": 56,
    "name": "DTF garment printing",
    "nameAr": "طباعة ملابس DTF",
    "category": "gifts",
    "catalogCategory": "Textile printing",
    "type": "Service",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 40,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Fabric suitable for heat transfer and DTF film.",
    "description": "A garment with a colour design applied by DTF heat transfer.",
    "specifications": "Print the design onto film and heat-press it at the approved position.",
    "requirements": "Design details",
    "intake": [
      "Printing details",
      "Front only or front and back",
      "Front print dimensions",
      "Back print dimensions, if applicable"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-56.webp"
  },
  {
    "id": "cap-printing",
    "code": "A0055",
    "row": 57,
    "name": "Cap printing",
    "nameAr": "طباعة طاقية",
    "category": "gifts",
    "catalogCategory": "Textile printing",
    "type": "Service",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 15,
    "unit": "piece",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "A fabric cap suitable for printing.",
    "description": "A cap printed with a logo or name within the available print area.",
    "specifications": "Size the artwork and print it at the approved position.",
    "requirements": "Design details",
    "intake": [
      "Printing details"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-57.webp"
  },
  {
    "id": "metal-keychain",
    "code": "A0056",
    "row": 58,
    "name": "Metal keychain",
    "nameAr": "ميدالية معدينة",
    "category": "gifts",
    "catalogCategory": "Promotional gifts",
    "type": "Keychain",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 35,
    "unit": "piece",
    "minimum": 10,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Metal piece and key ring.",
    "description": "A metal keychain bearing a name or logo.",
    "specifications": "Customize the available area on the keychain according to the selected model.",
    "requirements": "Design details",
    "intake": [
      "Printing details"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-58.webp"
  },
  {
    "id": "sash-printing",
    "code": "A0057",
    "row": 59,
    "name": "Sash printing",
    "nameAr": "طباعة وشاح",
    "category": "gifts",
    "catalogCategory": "Textile printing",
    "type": "Service",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 30,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Sash fabric suitable for printing.",
    "description": "A printed sash bearing a name, phrase, or event logo.",
    "specifications": "Apply the print according to the phrase length and its approved arrangement on the sash.",
    "requirements": "Design details",
    "intake": [
      "Printing details"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-59.webp"
  },
  {
    "id": "dtf-sash-printing",
    "code": "A0058",
    "row": 60,
    "name": "DTF sash printing",
    "nameAr": "طباعة وشاح DTF",
    "category": "gifts",
    "catalogCategory": "Textile printing",
    "type": "Service",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 40,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Sash fabric suitable for heat transfer and DTF film.",
    "description": "A sash bearing colour text or artwork applied by DTF heat transfer.",
    "specifications": "Print the artwork onto film and heat-press it at the approved size and position.",
    "requirements": "Design details",
    "intake": [
      "Printing details"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-60.webp"
  },
  {
    "id": "acrylic-award",
    "code": "A0061",
    "row": 63,
    "name": "Acrylic award",
    "nameAr": "درع اكريليك",
    "category": "awards",
    "catalogCategory": "Presentation awards",
    "type": "Award",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 240,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Acrylic (PMMA).",
    "description": "An acrylic presentation award bearing the recipient's name and the organization's logo.",
    "specifications": "Produce the text and logo by printing or engraving according to the approved model.",
    "requirements": "Design details",
    "intake": [
      "Award shape",
      "Printing details"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-63.webp"
  },
  {
    "id": "glass-award",
    "code": "A0062",
    "row": 64,
    "name": "Glass award",
    "nameAr": "درع زجاج",
    "category": "awards",
    "catalogCategory": "Presentation awards",
    "type": "Award",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 140,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Glass.",
    "description": "A glass award customized with a recipient name, organization logo, or dedication.",
    "specifications": "Apply the customization by printing or engraving on the selected model.",
    "requirements": "Design details",
    "intake": [],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-64.webp"
  },
  {
    "id": "custom-acrylic-award",
    "code": "A0063",
    "row": 65,
    "name": "Custom acrylic award",
    "nameAr": "درع اكريليك تفصيل",
    "category": "awards",
    "catalogCategory": "Presentation awards",
    "type": "Award",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 100000,
    "unit": "cubic metre",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 36 to 70 hours",
    "turnaroundAr": "حوالي 36 إلى 70 ساعة",
    "material": "Acrylic (PMMA) in the selected thickness.",
    "description": "An acrylic award made to order in the approved shape, size, and finish.",
    "specifications": "Cut the award outline according to the drawing and customize the text and logo.",
    "requirements": "Design details",
    "intake": [],
    "options": [],
    "formula": "L × W × H × Q ÷ 10,000,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      },
      {
        "id": "height",
        "label": "Height or thickness",
        "labelAr": "الارتفاع أو السماكة",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-65.webp"
  },
  {
    "id": "wooden-award",
    "code": "A0065",
    "row": 67,
    "name": "Wooden award",
    "nameAr": "درع خشبي",
    "category": "awards",
    "catalogCategory": "Presentation awards",
    "type": "Award",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 140,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Wood or medium-density fibreboard (MDF).",
    "description": "A wooden presentation award bearing the recipient's name, a logo, or a dedication.",
    "specifications": "Customize the face by engraving or printing according to the selected finish.",
    "requirements": "Design details",
    "intake": [
      "Printing details",
      "Award shape"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-67.webp"
  },
  {
    "id": "crystal-award",
    "code": "A0067",
    "row": 69,
    "name": "Crystal award",
    "nameAr": "درع كريستال",
    "category": "awards",
    "catalogCategory": "Presentation awards",
    "type": "Award",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 140,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 24 to 48 hours",
    "turnaroundAr": "حوالي 24 إلى 48 ساعة",
    "material": "Optical crystal.",
    "description": "A crystal presentation award with customized engraving or printing.",
    "specifications": "Apply the name, logo, or dedication within the available area.",
    "requirements": "Design details",
    "intake": [
      "Printing details",
      "Award shape"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-69.webp"
  },
  {
    "id": "graphic-design",
    "code": "A0069",
    "row": 71,
    "name": "Graphic design",
    "nameAr": "تصميم جرافيك",
    "category": "services",
    "catalogCategory": "Design services",
    "type": "Service",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 50,
    "unit": "piece",
    "minimum": 1,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Digital design.",
    "description": "A graphic design delivered in a digital format suitable for printing or publication.",
    "specifications": "Arrange text and visual elements at the approved dimensions and export the file in the agreed format.",
    "requirements": "Design details",
    "intake": [
      "Printing details"
    ],
    "options": [],
    "formula": null,
    "dimensions": [],
    "image": "./media/product-71.webp"
  },
  {
    "id": "menu-printing",
    "code": "A0070",
    "row": 72,
    "name": "Menu printing",
    "nameAr": "طباعة منيو",
    "category": "print",
    "catalogCategory": "Restaurant printing",
    "type": "Sheet",
    "available": true,
    "agencyAvailable": true,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 25,
    "unit": "square metre",
    "minimum": 1000,
    "maximum": 100000,
    "turnaround": "Approximately 12 to 36 hours",
    "turnaroundAr": "حوالي 12 إلى 36 ساعة",
    "material": "Coated paper or cardstock according to the model.",
    "description": "A printed menu displaying the items and prices in the approved file.",
    "specifications": "Print and cut the menu in the approved size and with the approved number of printed sides.",
    "requirements": "Design details",
    "intake": [
      "Item length",
      "Item width",
      "Quantity",
      "No lamination, gloss lamination, or matte lamination",
      "Single-sided or double-sided printing",
      "Custom-shaped or straight cutting"
    ],
    "options": [
      {
        "id": "double-sided-printing",
        "label": "Double-sided printing",
        "labelAr": "طباعة على وجهين",
        "value": "2x",
        "multiplier": 2
      },
      {
        "id": "gloss-lamination",
        "label": "Gloss lamination",
        "labelAr": "سلفان لامع",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "matte-lamination",
        "label": "Matte lamination",
        "labelAr": "سلفان مطفي",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "custom-cutting-not-straight",
        "label": "Custom cutting (not straight)",
        "labelAr": "قص حسب الشكل",
        "value": "2x",
        "multiplier": 2
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-72.webp"
  },
  {
    "id": "paper-event-favours",
    "code": "A0071",
    "row": 73,
    "name": "Paper event favours",
    "nameAr": "توزيعات ورقية",
    "category": "print",
    "catalogCategory": "Event printing",
    "type": "Sheet",
    "available": true,
    "agencyAvailable": false,
    "currency": "SAR",
    "sellingUnit": "piece",
    "rate": 25,
    "unit": "square metre",
    "minimum": 100,
    "maximum": 100000,
    "turnaround": "Approximately 10 to 24 hours",
    "turnaroundAr": "حوالي 10 إلى 24 ساعة",
    "material": "Paper or cardstock according to the design.",
    "description": "Printed paper favours carrying a phrase, name, or logo for distribution at events.",
    "specifications": "Print and cut the pieces to the approved shape and size.",
    "requirements": "Design details",
    "intake": [
      "Card length",
      "Card width",
      "Card quantity",
      "No lamination, gloss lamination, or matte lamination",
      "Rounded or sharp corners",
      "Single-sided or double-sided printing",
      "Custom-shaped or straight cutting"
    ],
    "options": [
      {
        "id": "double-sided-printing",
        "label": "Double-sided printing",
        "labelAr": "طباعة على وجهين",
        "value": "2x",
        "multiplier": 2
      },
      {
        "id": "gloss-lamination",
        "label": "Gloss lamination",
        "labelAr": "سلفان لامع",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "matte-lamination",
        "label": "Matte lamination",
        "labelAr": "سلفان مطفي",
        "value": "1.5x",
        "multiplier": 1.5,
        "group": "lamination"
      },
      {
        "id": "custom-cutting-not-straight",
        "label": "Custom cutting (not straight)",
        "labelAr": "قص حسب الشكل",
        "value": "2x",
        "multiplier": 2
      }
    ],
    "formula": "L × W × Q ÷ 10,000",
    "dimensions": [
      {
        "id": "length",
        "label": "Length",
        "labelAr": "الطول",
        "kind": "measurement"
      },
      {
        "id": "width",
        "label": "Width",
        "labelAr": "العرض",
        "kind": "measurement"
      }
    ],
    "image": "./media/product-73.webp"
  }
];
