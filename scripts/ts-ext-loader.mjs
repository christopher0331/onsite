/**
 * Node's type stripper does not add .ts to extensionless relative imports.
 * Next resolves those itself; this loader is only for the bot-gate script.
 */
export async function resolve(specifier, context, nextResolve) {
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !/\.[cm]?[jt]sx?$/.test(specifier)
  ) {
    return nextResolve(`${specifier}.ts`, context);
  }
  return nextResolve(specifier, context);
}
