export const Ellipsis = (v, length)=> {
  if (v.length >= length) {
    return v.substr(0, length) + '...'
  }
  return v
}

export const dateTime = time => {
  return new Date(time).toLocaleString('chinese', {hour12: false}).replace('/', "-").replace("/", "-")
}
