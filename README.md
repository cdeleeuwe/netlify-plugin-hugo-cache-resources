# Netlify Build Plugin: Persist Hugo resources Between Builds

Persist [Hugo](https://gohugo.io/) resources folder between Netlify builds for huge build speed improvements! ⚡️

This plugin caches the `resources` folder after build. If you are processing many images, this would improve build duration significantly.

Note: Restoring cache only comes from the production branch. So once cache is saved on the production branch, the next preview build would use the cache. For example, when pushing to the same preview build, the latest preview build will not get the cache from the previous preview build, but will get it from master.

## Usage

You can install this plugin in the Netlify UI from this [direct in-app installation link](https://app.netlify.com/plugins/netlify-plugin-hugo-cache-resources/install) or from the [Plugins directory](https://app.netlify.com/plugins).

For file-based installation, add the following lines to your `netlify.toml` file:

```toml
[build]
  publish = "public"

[[plugins]]
  package = "netlify-plugin-hugo-cache-resources"

	[plugins.inputs]
	# If it should show more verbose logs (optional, default = true)
	debug = true
	# Relative path to source directory in case you use Hugo's "--s" option
	srcdir = "path/to/website"
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.

To complete file-based installation, from your project's base directory, use npm, yarn, or any other Node.js package manager to add the plugin to `devDependencies` in `package.json`.

```bash
npm install -D netlify-plugin-hugo-cache-resources
```
