const isString = (value: unknown): value is string => typeof value === "string"
const isKey = (value: unknown) => value === false || isString(value) || (Array.isArray(value) && value.every(isString))

/**
 * The options the terminal plugin uses. Only well-typed values are kept, so the RPC reply
 * always passes its schema and one bad value cannot hide the others.
 */
export function terminalOptions(raw: Record<string, unknown>) {
  const result: {
    voice?: string
    panel?: boolean
    duck?: boolean
    visual?: string
    fps?: number
    keybinds?: Record<string, string | string[] | false>
  } = {}
  if (isString(raw.voice)) result.voice = raw.voice
  if (typeof raw.panel === "boolean") result.panel = raw.panel
  if (typeof raw.duck === "boolean") result.duck = raw.duck
  if (isString(raw.visual)) result.visual = raw.visual
  if (typeof raw.fps === "number" && Number.isFinite(raw.fps)) result.fps = raw.fps
  if (raw.keybinds && typeof raw.keybinds === "object" && !Array.isArray(raw.keybinds))
    result.keybinds = Object.fromEntries(Object.entries(raw.keybinds).filter(([, value]) => isKey(value))) as Record<
      string,
      string | string[] | false
    >
  return result
}
