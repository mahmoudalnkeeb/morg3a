export function parseCorsOrigin(str: string): string[] {
  return str.split(',').map((s) => s.trim());
}
