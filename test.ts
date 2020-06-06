import title from "./mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("main functionality", () => {
  let from = "updates TO hAndLinG of Failed paYMEnts";
  let to = "Updates to Handling of Failed Payments";

  assertEquals(title(from), to);

  from = "toWArds NEXT.JS 5: Introducing cANaRY Updates";
  to = "Towards Next.js 5: Introducing Canary Updates";

  assertEquals(title(from), to);

  from = "capitalize your titles";
  to = "Capitalize Your Titles";

  assertEquals(title(from), to);

  from = "seattle’S BEST coffee & grandma's cookies";
  to = "Seattle’s Best Coffee & Grandma's Cookies";

  assertEquals(title(from), to);
});

Deno.test("respect the words provided in `special` option", () => {
  let from = "mY cusToM brand is awesome";
  let to = "My Custom BRAnD Is awesoMe";

  assertEquals(
    title(from, {
      special: ["BRAnD", "awesoMe"],
    }),
    to,
  );

  from = "modify speCials like Facebook or microsoft";
  to = "Modify Specials like facebook or Microsoft";

  assertEquals(
    title(from, {
      special: ["facebook", "Microsoft"],
    }),
    to,
  );
});

Deno.test("should not capitalize word in adjacent parens", () => {
  let from = "employment region(s) for my application";
  let to = "Employment Region(s) for My Application";
  assertEquals(title(from), to);

  from = "(s)omething or other";
  to = "(s)omething or Other";
  assertEquals(title(from), to);

  from = "cat(s) can be a pain";
  to = "Cat(s) can Be a Pain";
  assertEquals(title(from), to);
});
