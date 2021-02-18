export function ws(mode, p) {
  return new WebSocket('ws://${host}:8090/ws/' + mode +'_server/' + p)
}
