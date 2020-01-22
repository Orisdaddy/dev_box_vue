export function ws(mode, p) {
  return new WebSocket('ws://127.0.0.1:8000/ws/' + mode +'_server/' + p)
}
