import { EnkaClient } from "enka-network-api";
import path from "path";

const enka = new EnkaClient({
  userAgent: "GIDC",
  cacheDirectory: path.resolve(process.cwd(), "cache"),
});

enka.cachedAssetsManager.cacheDirectorySetup();

// if (process.env.NODE_ENV === "production") {
//   enka.cachedAssetsManager.activateAutoCacheUpdater({
//     // instant: true, // Run the first update check immediately
//     timeout: 24 * 60 * 60 * 1000, // 24 hours interval
//     onUpdateStart: async () => {
//       console.log("Updating Genshin Data...");
//     },
//     onUpdateEnd: async () => {
//       enka.cachedAssetsManager.refreshAllData(); // Refresh memory
//       console.log("Updating Completed!");
//     },
//   });
// }

export default enka;
