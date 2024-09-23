// robotsGenerator för att generera robots.txt

export const generateRobotsTxt = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const content = isProduction
    ? "User-agent: *\nDisallow:"
    : "User-agent: *\nDisallow: /"; // Blockera alla sidor i utvecklingsmiljön - vad betyder det?

  return content;
};
