export default function isSmallLaptop(width: number | boolean): boolean {
  if (typeof width === 'number') {
    return width >= 1024;
  } else return false;
}
