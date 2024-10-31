export function isValidUrl(url) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|" + // domain name
        "localhost|" + // localhost
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$",
      "i"
    ); // port and path
    return pattern.test(url);
  }