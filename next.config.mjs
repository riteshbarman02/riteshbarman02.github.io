const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgSite = repository.endsWith(".github.io");
const derivedBasePath =
  repository && !isUserOrOrgSite ? `/${repository}` : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || derivedBasePath;

const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
