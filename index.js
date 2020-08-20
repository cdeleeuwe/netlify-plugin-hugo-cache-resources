const glob = require('glob');

const getResourcesDir = () => {
  return 'resources';
}

const printList = (items) => {
  console.log('---');
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
}

module.exports = {

  async onPreBuild({ utils, inputs }) {
    const path = getResourcesDir();
    const success = await utils.cache.restore(path);

    if (success) {
      const cachedFiles = await utils.cache.list(path);
      console.log(`Restored cached resources folder. Total files: ${cachedFiles.length}`);
      if (inputs.debug) printList(cachedFiles);
    } else {
      console.log(`No cache found for resources folder`);
    }
  },

  async onPostBuild({ utils, inputs }) {
    const path = getResourcesDir();
    const resourceFiles = glob.sync(`${path}/**/*`, { nodir: true });

    // Do nothing if there are no files to cache, else it throws an error
    // Workaround for https://github.com/netlify/build/issues/1411
    if (resourceFiles.length == 0) {
      console.log(`No resources files to cache`);
      return;
    }

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