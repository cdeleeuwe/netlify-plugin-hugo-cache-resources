const { join } = require("path");

const getResourcesDir = ({ inputs }) => {
  return join(inputs.srcdir, 'resources');
}

const printList = (items) => {
  console.log('---');
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
}

module.exports = {

  async onPreBuild({ utils, inputs }) {
    const path = getResourcesDir({ inputs });
    const success = await utils.cache.restore(path);
    console.log(`Checking if resources exist at "${path}"`);

    if (success) {
      const cachedFiles = await utils.cache.list(path);
      console.log(`Restored cached resources folder. Total files: ${cachedFiles.length}`);
      if (inputs.debug) printList(cachedFiles);
    } else {
      console.log(`No cache found for resources folder`);
    }
  },

  async onPostBuild({ utils, inputs }) {
    const path = getResourcesDir({ inputs });
    const success = await utils.cache.save(path);

    if (success) {
      const cachedFiles = await utils.cache.list(path);
      console.log(`Saved resources folder to cache. Total files: ${cachedFiles.length}`);
      if (inputs.debug) printList(cachedFiles);
    } else {
      console.log(`No resources folder cached`);
    }
  }
};