const navy = '#252d4c';
const ink = '#172039';
const blueFold = '#465273';
const ivory = '#fff4dc';
const cream = '#efddba';
const gold = '#d3a65f';
const warmFold = '#a67845';
const berry = '#8f4b5f';

function face(ctx, fill, points) {
  ctx.beginPath();
  points.forEach(([x, y], i) => {
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function crease(ctx, color, width, points) {
  ctx.beginPath();
  points.forEach(([x, y], i) => {
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function oval(ctx, color, x, y, width, height) {
  ctx.beginPath();
  ctx.ellipse(x, y, width, height, 0, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function contactShadow(ctx, size) {
  ctx.save();
  ctx.scale(1, 0.16);
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
  gradient.addColorStop(0, '#37274045');
  gradient.addColorStop(1, '#37274000');
  oval(ctx, gradient, 0, 0, size, size);
  ctx.restore();
}

// A tapered strip of cardstock with a contrasting fold down its length.
function strip(ctx, from, to, fromWidth, toWidth, light, dark) {
  const [x, y] = from;
  const [endX, endY] = to;
  const length = Math.hypot(endX - x, endY - y);
  const nx = (y - endY) / length;
  const ny = (endX - x) / length;
  const edge = [x + nx * fromWidth / 2, y + ny * fromWidth / 2];
  const tip = [endX + nx * toWidth / 2, endY + ny * toWidth / 2];
  face(ctx, dark, [
    edge, tip, [endX - nx * toWidth / 2, endY - ny * toWidth / 2],
    [x - nx * fromWidth / 2, y - ny * fromWidth / 2],
  ]);
  face(ctx, light, [from, edge, tip, to]);
}

function boxFoot(ctx, pivot, phase, lift, far) {
  const stride = Math.cos(phase);
  const y = -2 - 5 * Math.max(0, Math.sin(phase));
  const x = pivot + stride * 9;
  const ankle = [x, y - 2];
  strip(ctx, [pivot, -17 - lift], ankle, 4.4, 3, far ? cream : ivory, warmFold);
  face(ctx, far ? warmFold : gold, [[x - 3, y - 3], [x + 6, y - 3], [x + 10, y + 1], [x - 4, y + 1]]);
  crease(ctx, far ? gold : ivory, 0.9, [[x - 3, y - 2], [x + 6, y - 2]]);
}

export function drawPaperBox(ctx, phase, reaction) {
  ctx.save();
  contactShadow(ctx, 44);
  const bounce = 2 + 4 * Math.max(0, Math.sin(phase * 2)) + 5 * reaction;
  boxFoot(ctx, -21, phase + Math.PI, bounce, true);
  boxFoot(ctx, 12, phase, bounce, false);

  ctx.translate(0, -bounce);
  ctx.rotate(0.025 * Math.sin(phase) - 0.09 * reaction);
  const topLeft = [-36, -53];
  const topRight = [18, -46];
  const hingeLeft = [-12, -68];
  const hingeRight = [42, -61];

  face(ctx, ink, [topRight, hingeRight, [39, -25], [17, -10]]);
  face(ctx, navy, [topLeft, topRight, [17, -10], [-34, -17]]);
  face(ctx, blueFold, [topLeft, [-24, -44], [-25, -16], [-34, -17]]);
  face(ctx, '#344061', [topRight, hingeRight, [32, -42], [18, -27]]);
  face(ctx, warmFold, [topLeft, hingeLeft, hingeRight, topRight]);
  face(ctx, '#5d4350', [[-28, -53], [-11, -64], [34, -58], [17, -50]]);
  crease(ctx, cream, 1.1, [topLeft, topRight, hingeRight]);
  crease(ctx, '#ffffff55', 0.8, [[18, -45], [17, -11]]);

  // Foil registration marks on the face and narrow spine.
  crease(ctx, '#d3a65faa', 1, [[-31, -43], [-31, -22], [-23, -21]]);
  crease(ctx, '#d3a65faa', 1, [[15, -32], [14, -14], [5, -15]]);
  crease(ctx, gold, 1.05, [[24, -18], [35, -25], [37, -49]]);
  face(ctx, gold, [[-29, -39], [-26, -34], [-29, -29], [-32, -34]]);
  face(ctx, '#f1d49b', [[29, -32], [31, -39], [33, -35], [31, -28]]);

  const lift = 11 + 3 * Math.sin(phase) + 9 * reaction;
  const lidLeft = [-36 + lift * 0.45, -53 - lift];
  const lidRight = [18 + lift * 0.45, -46 - lift];
  face(ctx, warmFold, [hingeLeft, hingeRight, [lidRight[0], lidRight[1] + 3], [lidLeft[0], lidLeft[1] + 3]]);
  face(ctx, gold, [hingeLeft, hingeRight, lidRight, lidLeft]);
  face(ctx, '#f1cb88', [lidLeft, lidRight, [lidRight[0] - 16, lidRight[1] + 3], hingeLeft]);
  crease(ctx, '#ffebbf', 1.25, [lidLeft, lidRight, hingeRight]);
  crease(ctx, '#9863438f', 1.2, [[lidLeft[0] + 10, lidLeft[1] + 2], [lidRight[0] - 10, lidRight[1] + 2]]);

  const glance = 1.3 - 3.5 * reaction;
  oval(ctx, ivory, -14, -35, 4.6, 6.3 + reaction);
  oval(ctx, ivory, -1, -33.5, 4.6, 6.3 + reaction);
  oval(ctx, ink, -14 + glance, -35.7, 1.9, 3);
  oval(ctx, ink, -1 + glance, -34.2, 1.9, 3);
  oval(ctx, '#ffffff', -14.4 + glance, -37, 0.7, 0.7);
  oval(ctx, '#ffffff', -1.4 + glance, -35.5, 0.7, 0.7);
  oval(ctx, '#c67a79', -18, -26.8, 2.7, 1.1);
  oval(ctx, '#c67a79', 3, -25.3, 2.7, 1.1);
  oval(ctx, ink, -7, -24, 3.5, 1.4 + 2.7 * reaction);
  crease(ctx, '#e9b98b', 1, [[-9, -24 - reaction], [-7.6, -25 - reaction], [-6, -24.9 - reaction]]);
  ctx.restore();
}

function runnerLeg(ctx, phase, bob, far) {
  const stride = Math.cos(phase);
  const lift = Math.max(0, Math.sin(phase));
  const hip = [far ? -6 : 2, -43];
  const knee = [4 + stride * 14, -23 - lift * 8];
  const ankle = [-3 + stride * 25, -5 - lift * 17 + bob];
  strip(ctx, hip, knee, 13, 10, far ? warmFold : cream, far ? '#8a644b' : navy);
  strip(ctx, knee, ankle, 10, 6, far ? berry : blueFold, far ? '#624656' : ink);
  const [x, y] = ankle;
  face(ctx, far ? warmFold : gold, [[x - 4, y - 3], [x + 3, y - 3], [x + 12, y + 4], [x - 4, y + 4]]);
  crease(ctx, far ? gold : ivory, 1, [[x - 4, y + 3], [x + 11, y + 3]]);
}

function runnerArm(ctx, phase, reaction, far) {
  const swing = Math.cos(phase);
  const shoulder = [far ? 2 : 8, far ? -71 : -68];
  const elbow = [far ? -10 + swing * 13 : 17 + swing * 12 + 9 * reaction, -54 - 5 * reaction];
  const wrist = [
    elbow[0] + (far ? 10 : 15) + 6 * reaction,
    elbow[1] - (far ? 10 : 14) - 7 * reaction + 4 * Math.sin(phase),
  ];
  const light = far ? '#e1c39b' : ivory;
  const dark = far ? '#b78b65' : '#c5a578';
  strip(ctx, shoulder, elbow, 11, 8, light, dark);
  strip(ctx, elbow, wrist, 8, 5, light, dark);
  const [x, y] = wrist;
  face(ctx, light, [[x - 3, y + 3], [x - 4, y - 3], [x + 4, y - 5], [x + 9, y - 3], [x + 6, y + 2], [x + 1, y + 4]]);
  crease(ctx, dark, 0.8, [[x + 1, y + 1], [x + 6, y - 1]]);
}

export function drawPaperRunner(ctx, phase, reaction) {
  ctx.save();
  contactShadow(ctx, 39);
  const bob = 1 + 3.5 * Math.max(0, Math.sin(phase * 2));
  ctx.translate(0, -bob);

  runnerArm(ctx, phase + Math.PI, reaction * 0.55, true);
  runnerLeg(ctx, phase + Math.PI, bob, true);
  runnerLeg(ctx, phase, bob, false);

  // Paper jacket and a gold lapel over the folded shirt.
  face(ctx, '#8c6854', [[-10, -73], [6, -78], [22, -69], [8, -39], [-9, -42]]);
  face(ctx, cream, [[-10, -73], [7, -78], [20, -67], [6, -42], [-8, -44]]);
  face(ctx, ivory, [[-10, -73], [7, -78], [3, -66], [-8, -44]]);
  face(ctx, '#d1b383', [[3, -66], [20, -67], [6, -42], [-2, -43]]);
  face(ctx, navy, [[8, -75], [12, -73], [11, -66], [12, -56], [6, -52], [5, -57], [8, -67]]);
  face(ctx, gold, [[7, -78], [13, -77], [17, -71], [10, -66], [5, -70]]);
  crease(ctx, '#fffbec', 1.2, [[-10, -72], [-3, -67], [-6, -48]]);
  runnerArm(ctx, phase, reaction, false);

  // Folded portrait, with one visible eye and a pointed bridge to read in profile.
  face(ctx, cream, [[4, -94], [13, -105], [26, -102], [32, -93], [31, -87], [36, -84], [29, -82], [28, -76], [17, -73], [7, -80]]);
  face(ctx, ivory, [[13, -105], [26, -102], [32, -93], [31, -87], [24, -84], [17, -93]]);
  face(ctx, '#c7a278', [[7, -80], [17, -87], [24, -84], [29, -82], [28, -76], [17, -73]]);
  face(ctx, navy, [[3, -95], [12, -106], [26, -104], [30, -97], [18, -99], [15, -91], [6, -87]]);
  face(ctx, blueFold, [[4, -96], [13, -105], [24, -103], [17, -100], [9, -94]]);
  crease(ctx, '#a0785c', 0.95, [[17, -84], [23, -81], [18, -76]]);
  crease(ctx, ink, 1.2, [[23, -91], [27, -92], [29, -91]]);
  oval(ctx, ink, 27.5, -88, 1.45, 2);
  crease(ctx, '#784d47', 1, [[25, -79], [28, -79 - reaction]]);
  ctx.restore();
}
