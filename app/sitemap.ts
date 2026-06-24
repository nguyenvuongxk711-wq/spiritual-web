import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tamlinhviet.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tu-vi",
    "/calendar",
    "/ngay",
    "/tuoi",
    "/phong-thuy",
    "/que",
    "/tarot",
    "/numerology",
    "/zodiac",
    "/sim",
    "/dream",
    "/quiz",
    "/meditation",
  ];

  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
