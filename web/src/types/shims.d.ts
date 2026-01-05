declare module 'papaparse' {
  export function parse(input: string | File, config?: any): any;
  export function unparse(input: any, config?: any): string;
  const Papa: any;
  export default Papa;
}

declare module 'uuid' {
  export function v4(): string;
  export function v5(name: string, ns: string): string;
  const uuid: { v4: () => string };
  export default uuid;
}
