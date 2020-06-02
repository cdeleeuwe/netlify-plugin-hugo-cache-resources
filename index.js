const getResourcesDir = constants => {
  return 'resources';
}

module.exports = {
  // Restore file/directory cached in previous builds.
  // Does not do anything if:
  //  - the file/directory already exists locally
  //  - the file/directory has not been cached yet
  async onPreBuild({ utils, constants, inputs }) {
    const path = getResourcesDir(constants);
    const success = await utils.cache.restore(path);

    if (success) {
      const cachedFiles = await utils.cache.list(path);
      console.log(`Restored cached resources folder. Total files: ${cachedFiles.length}`);
      if (inputs.debug) printList(cachedFiles);
    } else {
      console.log(`No cache found for resources folder`);
    }
  },
  // Cache file/directory for future builds.
  // Does not do anything if:
  //  - the file/directory does not exist locally
  //  - the file/directory is already cached and its contents has not changed
  //    If this is a directory, this includes children's contents
  async onPostBuild({ utils, constants, inputs }) {
    const path = getResourcesDir(constants);
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

const printList = (items) => {
  console.log('---');
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
}