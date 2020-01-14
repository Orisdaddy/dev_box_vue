export function ws(p) {
  return new WebSocket('ws://127.0.0.1:8000/ws/server/' + p)
}
