const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });

// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");
// const path = require("path");

// const projectRoot = __dirname;
// const workspaceRoot = path.resolve(projectRoot, "../..");

// let config = getDefaultConfig(projectRoot);

// // Ensure metro resolves deps from both local and workspace root node_modules
// config.resolver = {
//   ...config.resolver,
//   nodeModulesPaths: [
//     path.join(projectRoot, "node_modules"),
//     path.join(workspaceRoot, "node_modules"),
//   ],
//   // Helps with pnpm's symlinked node_modules layout
//   unstable_enableSymlinks: true,
// };

// // Reanimated transformer MUST be last
// config.transformer = {
//   ...config.transformer,
//   babelTransformerPath: require.resolve("react-native-reanimated/plugin"),
// };

// module.exports = withNativeWind(config, { input: "./src/css/global.css" });
