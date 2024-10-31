export function isValidAlias(alias) {
  // Allow only alphanumeric characters, hyphens, and underscores, and enforce a max length
  const aliasRegex = /^[a-zA-Z0-9-_]{1,15}$/;
  return aliasRegex.test(alias);
}
