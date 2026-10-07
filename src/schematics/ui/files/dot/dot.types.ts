export type ZenDotSeverity = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'error';
export type ZenDotSize = 'xs' | 'sm' | 'md' | 'lg' | (string & {}) | number;
export type ZenDotVariant = 'solid' | 'outline' | 'ring' | 'dnd' | 'pill';
export type ZenDotAnimation = 'none' | 'wave' | 'pulse' | 'glow';

export const SEVERITIES = new Set<string>(['neutral', 'primary', 'success', 'warning', 'danger', 'info', 'error']);

export const PRESET_SIZES = new Set<string>(['xs', 'sm', 'md', 'lg']);
