export function track(
  event: string,
  properties: Record<string, string | number | boolean> = {},
) {
  // Host analytics can listen to this privacy-preserving event. No form values are emitted.
  if (typeof window !== "undefined")
    window.dispatchEvent(
      new CustomEvent("areesan:analytics", {
        detail: { event, properties, timestamp: Date.now() },
      }),
    );
}
