# Netlify Build Plugin: Persist the Hugo resources Between Builds

Persist the Hugo resources folder between Netlify builds for huge build speed improvements! ⚡️

## Usage

To install, add the following lines to your `netlify.toml` file:

```toml
[build]
  publish = "public"

[[plugins]]
  package = "netlify-plugin-hugo-cache-resources"

	[plugins.inputs]
	# If it should show more verbose logs (optional, default = true)
	debug = true
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.

This plugin caches the `resources` folder after build. If you are processing many images, this would improve build duration significantly.