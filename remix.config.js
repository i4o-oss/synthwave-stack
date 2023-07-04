/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	postcss: true,
	tailwind: true,
	future: {
		v2_routeConvention: true,
	},
	ignoredRouteFiles: ['**/.*'],
	// appDirectory: "app",
	// assetsBuildDirectory: "public/build",
	// serverBuildPath: "api/index.js",
	// publicPath: "/build/",
}
