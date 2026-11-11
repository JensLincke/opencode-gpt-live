import { describe, expect, test } from "bun:test"

import { terminalOptions } from "../src/server/options"

describe("terminal options", () => {
  test("passes the terminal settings through", () => {
    expect(
      terminalOptions({
        voice: "maple",
        visual: "none",
        fps: 10,
        panel: false,
        duck: true,
        keybinds: { toggle: "<leader>v", mute: ["ctrl+y", "f9"], panel: false },
        instructions: "server only",
      }),
    ).toEqual({
      voice: "maple",
      visual: "none",
      fps: 10,
      panel: false,
      duck: true,
      keybinds: { toggle: "<leader>v", mute: ["ctrl+y", "f9"], panel: false },
    })
  })

  test("drops values of the wrong type instead of failing", () => {
    expect(terminalOptions({ fps: "10", panel: "no", keybinds: { toggle: 3, mute: "f9" } })).toEqual({
      keybinds: { mute: "f9" },
    })
  })
})
