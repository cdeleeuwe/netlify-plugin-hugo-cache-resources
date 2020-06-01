const getResourcesDir = constants => {
  return 'resources';
}

module.exports = {
	// Restore file/directory cached in previous builds.
	// Does not do anything if:
	//  - the file/directory already exists locally
	//  - the file/directory has not been cached yet
	async onPreBuild({utils, constants}) {
		const path = getResourcesDir(constants);
		const success = await utils.cache.restore(path);

		if (success) {
			console.log(`Restored the cached Resources folder`);
		} else {
			console.log(`No cache found for the Resources folder`);
		}
	},
	// Cache file/directory for future builds.
	// Does not do anything if:
	//  - the file/directory does not exist locally
	//  - the file/directory is already cached and its contents has not changed
	//    If this is a directory, this includes children's contents
	// Note that this will cache after the build, even if it fails, which could be unwanted behavior
	async onPostBuild({utils, constants}) {
		const path = getResourcesDir(constants);
		const success = await utils.cache.save(path);

		if (success) {
			console.log(`Cached the Resources folder`);
		} else {
			console.log(`No Resources folder cached`);
		}
	}
};