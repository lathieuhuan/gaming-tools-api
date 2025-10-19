export function logError(error: any) {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
}
