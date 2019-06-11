const { readdirSync, readFileSync, writeFileSync } = require("fs");
const fm = require("front-matter");

const files = readdirSync("./_posts/");

async function main() {
  let missing = 0;
  let present = 0;
  let allSpeakers = [];
  for (let file in files) {
    let speakerList;
    const split = files[file].split(".");
    const fileEnding = split[split.length - 1];
    if (fileEnding !== "md") continue;

    const raw = readFileSync("./_posts/" + files[file], "utf8");
    const content = fm(raw);

    if (typeof content.attributes.speakers === 'undefined') {
      missing++;
    } else {
      present++;
      console.log(content.attributes.speakers);
      speakerList = {
        src: files[file],
        speakers: content.attributes.speakers
      }
      allSpeakers.push(speakerList);
    }
  }
  console.log(`Found ${present} speaker tags, ${missing} are missing`)
}

main();
