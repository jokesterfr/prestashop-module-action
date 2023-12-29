const core = require("@actions/core");
const compose = require("docker-compose");
const utils = require("./utils");

const composeV2 = compose.v2;
try {

  // FLASHLIGHT_DOCKER_TAG=latest
  // MARIADB_DOCKER_TAG=lts
  // DEBUG_MODE=true
  // MODULE_DIRECTORY=./
  // MODULE_NAME=ps_module
  
  
  const options = {
    config: './docker/docker-compose.yml',
    log: true,
    composeOptions: utils.parseFlags(core.getInput("compose-flags")),
    commandOptions: utils.parseFlags(core.getInput("up-flags")),
  };
  
  // composeV2.upMany(services, options)
  composeV2.upAll(options)
    .then(() => {
      console.log("compose started");
    })
    .catch((err) => {
      core.setFailed(`compose up failed ${JSON.stringify(err)}`);
    });
} catch (error) {
  core.setFailed(error.message);
}
