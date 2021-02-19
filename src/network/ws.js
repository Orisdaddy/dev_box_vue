export function ws(mode, p) {
  return new WebSocket('ws://${host}:8091/ws/' + mode +'_server/' + p)
}
