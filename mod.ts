// Utilities
import lowerCase from "./lower-case.ts";
import specials from "./specials.ts";

const regex = /(?:(?:(\s?(?:^|[.\(\)!?;:"-])\s*)(\w))|(\w))(\w*[’']*\w*)/g;

function convertToRegExp(specials: string[]): [RegExp, string][] {
  return specials.map((s) => [new RegExp(`\\b${s}\\b`, "gi"), s]);
}

function parseMatch(match: string) {
  const firstCharacter = match[0];

  // test first character
  if (/\s/.test(firstCharacter)) {
    // if whitespace - trim and return
    return match.substr(1);
  }
  if (/[\(\)]/.test(firstCharacter)) {
    // if parens - this shouldn't be replaced
    return null;
  }

  return match;
}

type Options = {
  special?: string[];
};

export default function (str: string, options: Options = {}) {
  str = str.toLowerCase().replace(
    regex,
    (m, lead = "", forced, lower, rest) => {
      const parsedMatch = parseMatch(m);
      if (!parsedMatch) {
        return m;
      }
      if (!forced) {
        const fullLower = lower + rest;

        if (lowerCase.has(fullLower)) {
          return parsedMatch;
        }
      }

      return lead + (lower || forced).toUpperCase() + rest;
    },
  );

  const customSpecials = options.special || [];
  const replace = [...specials, ...customSpecials];
  const replaceRegExp = convertToRegExp(replace);

  replaceRegExp.forEach(([pattern, s]) => {
    str = str.replace(pattern, s);
  });

  return str;
}
