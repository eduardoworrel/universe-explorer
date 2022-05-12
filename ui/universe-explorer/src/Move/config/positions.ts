export const defaultSize = {
  width: 100,
  height: 100,
};
export const position = {
  vertical: (4000 - defaultSize.width) / 2,
  horizontal: (4000 - defaultSize.width) / 2,
};
export const limit = {
  maxX: 4000 - defaultSize.width - 1,
  maxY: 4000 - defaultSize.height - 1,
  minX: 0,
  minY: 0,
};
export const speed = {
  unit: 'px',
  distance: 5,
  ms: 20,
};
