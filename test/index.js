const util = require("util");
const webpack = util.promisify(require("webpack"));
const chalk = require("chalk");

async function build() {
  console.log(`Creating test build...`);
  try {
    const config = require(`./webpack.config`);

    console.log("Compiling app...");
    const stats = await webpack(config);

    if (stats.compilation && stats.compilation.errors && stats.compilation.errors.length) {
      console.log(chalk.red("Failed to compile.\n"));

      stats.compilation.errors.forEach(error => {
        console.log(chalk.red(`${error.message}\n`));
      });

      process.exit(1);
      return;
    }

    console.log(chalk.green("Compiled successfully.\n"));
  } catch (e) {
    console.log(chalk.red("Failed to compile.\n"));
    console.log(e + "\n");
    process.exit(1);
  }
}

build();
