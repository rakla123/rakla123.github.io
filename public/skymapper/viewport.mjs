// Include projected positions: Aladin may update its WASM transform after its
// public view parameters/events have already changed.
export function readViewportSignature(viewer, width, height) {
  if (!viewer) return "";
  const fov = viewer.getFov?.() || [];
  const center = viewer.getRaDec?.() || viewer.getCenter?.() || [];
  const ra = Number(Array.isArray(center) ? center[0] : center.ra ?? center.RA) || 0;
  const dec = Number(Array.isArray(center) ? center[1] : center.dec ?? center.DE) || 0;
  const samples = [[ra, dec], [(ra + 5) % 360, dec], [ra, Math.max(-89, Math.min(89, dec + 5))],
    [0, 0], [90, 0], [180, 0], [270, 0], [0, 60], [0, -60]];
  const projected = samples.map(([lon, lat]) => {
    try {
      const point = viewer.world2pix(lon, lat);
      return point?.every(Number.isFinite) ? point.map(value => value.toFixed(3)).join(",") : "outside";
    } catch { return "outside"; }
  });
  return [width, height, ...fov, ra, dec, viewer.getRotation?.(), viewer.getProjectionName?.(), ...projected].join("|");
}
