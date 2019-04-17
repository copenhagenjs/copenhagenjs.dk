const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { promisify } = require("util");
const marked = promisify(require("marked"));

const files = readdirSync("./_posts/");

async function main() {
  for (let file in files) {
    const splitted = files[file].split(".");
    const fileEnding = splitted[splitted.length - 1];
    if (fileEnding !== "md") return;
    console.log(files[file]);
    const content = readFileSync("./_posts/" + files[file], "utf8");
    const parsed = content.includes("---")
      ? content
          .split("---")
          .splice(2)
          .join("")
      : content;
    const html = await marked(parsed);
    writeFileSync(
      "./pages/archive/" + files[file].replace(".md", ".js"),
      `import Page from '../../components/Page'
        export default () => ( <Page><div dangerouslySetInnerHTML={{__html: \`${html}\`}}></div></Page> )
      `
    );
  }
}

main();
