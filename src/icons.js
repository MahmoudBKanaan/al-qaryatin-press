const paths = {
  arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
  back: '<path d="M19 12H5m7 7-7-7 7-7"/>',
  diagonal: '<path d="M7 17 17 7M7 7h10v10"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8m-8 4h2m4 0h2m-8 3h2m4 0h2m-8 3h2m4 0h2"/>',
  print: '<path d="M6 8V3h12v5m0 9h2a1 1 0 0 0 1-1v-5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v5a1 1 0 0 0 1 1h2m2-5h1"/><rect x="6" y="15" width="12" height="6" rx="1"/>',
  packaging: '<path d="M21 8.5 12 4 3 8.5v7L12 20l9-4.5v-7ZM3 8.5l9 4.5 9-4.5M12 13v7m-4.5-13.75 9 4.5"/>',
  stickers: '<path d="M15 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v9l-6 6Zm0 0v-3a3 3 0 0 1 3-3h3M8 9h8m-8 4h4"/>',
  signage: '<rect x="4" y="4" width="16" height="11" rx="2"/><path d="M12 15v5m-5 0h10M7 11l3-3 3 3 2-2 2 2"/>',
  stationery: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18m3-13h4m-4 4h4m-4 4h3M3 8h4m-4 4h4m-4 4h4"/>',
  gifts: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7m-7-4v12M12 8H8.5a2.5 2.5 0 1 1 2.4-3.2L12 8Zm0 0h3.5a2.5 2.5 0 1 0-2.4-3.2L12 8Z"/>',
  awards: '<path d="M8 4h8v6a4 4 0 0 1-8 0V4Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 2v5m-4 1h8"/>',
  services: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 12 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z"/>',
  location: '<path d="M20 10c0 5-8 10-8 10S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  language: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5"/>',
  ruler: '<path d="m3 16 13-13 5 5L8 21l-5-5Zm6-6 2 2m1-5 2 2m1-5 2 2"/>',
  receipt: '<path d="M5 21V3l3 2 4-2 4 2 3-2v18l-3-2-4 2-4-2-3 2ZM8 9h8m-8 4h8"/>',
  file: '<path d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-5-5Zm0 0v6h5M8 13h8m-8 4h5"/>',
  chat: '<path d="M20 11a8 8 0 0 1-8 8H5l1.4-3A8 8 0 1 1 20 11ZM8 11h8"/>'
};

export function icon(name, className = '') {
  return '<svg class="icon ' + className + '" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">' + (paths[name] || paths.info) + '</svg>';
}

