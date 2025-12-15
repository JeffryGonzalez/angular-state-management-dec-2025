export const colors = [
  'neutral',
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
] as const;
export const styles = ['outline', 'dash', 'soft', 'ghost', 'link'] as const;
export const behaviors = ['active', 'disabled'] as const;
export const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const modifiers = ['wide', 'block', 'square', 'circle'] as const;

export type Colors = (typeof colors)[number];
export type Styles = (typeof styles)[number];
export type Behaviors = (typeof behaviors)[number];
export type Sizes = (typeof sizes)[number];
export type Modifiers = (typeof modifiers)[number];
