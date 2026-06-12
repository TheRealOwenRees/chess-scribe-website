import { trackAppRouter } from "@socialgouv/matomo-next";
import { useLocation, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { env } from "#/env.ts";

const MATOMO_URL = env.VITE_MATOMO_URL;
const MATOMO_SITE_ID = env.VITE_MATOMO_SITE_ID;

export function MatomoAnalytics() {
	const location = useLocation();
	const searchParams = useSearch({ strict: false });

	useEffect(() => {
		if (typeof window === "undefined") return;

		const serializedParams = new URLSearchParams(
			searchParams as Record<string, string>,
		);

		trackAppRouter({
			url: MATOMO_URL || "",
			siteId: MATOMO_SITE_ID || "",
			pathname: location.pathname,
			searchParams: serializedParams,
			enableHeatmapSessionRecording: false,
			enableHeartBeatTimer: true,
			cleanUrl: true,
			disableCookies: true,
			debug: import.meta.env.DEV,
		});
	}, [location.pathname, searchParams]);

	return null;
}
