module.exports = {
  apps: [
    {
      name: "gaming-tools-api",
      script: "dist/index.js",
      // instances: "max", // Recommended for cluster mode to use all CPU cores
      // exec_mode: "cluster", // Run in cluster mode for load balancing
      // Default environment (optional)
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
