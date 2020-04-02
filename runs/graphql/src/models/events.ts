const fm = require("front-matter");
const marked = require("marked");
const { readFileSync } = require("fs");
const pMemoize = require("p-memoize");
const { join } = require("path");

type Speaker = {
  name: string;
  title: string;
};

export enum EventStatus {
  UPCOMING = "UPCOMING",
  PAST = "PAST"
}

export type EventDetails = {
  title?: string;
  slug: string;
  selfLink?: string;
  link?: string;
  markdown?: string;
  content?: string;
  date: Date;
  type?: string;
  location?: string;
  presentations: Speaker[];
};

export const getEvents = (): EventDetails[] => {
  const data = require("../../_posts/_data.json");
  return data.posts.map(post => {
    const markdown = readFileSync(
      join(__dirname, "../../_posts/" + post),
      "utf8"
    );
    const parsed = fm(markdown);
    const date = parsed.attributes.date
      ? parsed.attributes.date
      : new Date(
          post
            .split("-")
            .slice(0, 2)
            .join("-")
        );

    // YAML will by default parse dates as UTC
    // This parses the date as Copenhagen time
    // and takes care of summertime
    const timezoneFormatted = date.toLocaleString("en-US", {
      timeZone: "Europe/Copenhagen"
    });
    const diff =
      new Date(timezoneFormatted + " UTC").getTime() - date.getTime();
    const correctDate = new Date(date.getTime() - diff);

    return {
      title: parsed.attributes.title || post.replace(".md", ""),
      slug: post.replace(".md", ""),
      selfLink: `https://copenhagenjs.dk/archive/${post.replace(".md", "")}/`,
      link: parsed.attributes.link || "",
      markdown: parsed.body,
      content: marked(parsed.body),
      date: correctDate,
      type: parsed.attributes.type || "",
      location: parsed.attributes.location || "",
      presentations: parsed.attributes.speakers || []
    };
  });
};

export const memGetEvents: () => EventDetails[] = pMemoize(getEvents, {
  maxAge: 1000 * 3600
});

export const memGetSingleEvent = (slug: string) => {
  return memGetEvents().find(event => event.slug === slug);
};
