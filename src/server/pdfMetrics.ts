import { promises as fs } from "node:fs";
import { join } from "node:path";
import { createServerFn } from "@tanstack/react-start";

const METRICS_DIR = join(process.cwd(), "data");
const LOG_FILE = join(METRICS_DIR, "pdf-events.log");
const COUNT_FILE = join(METRICS_DIR, "pdf-count.txt");

const readCount = async (): Promise<number> => {
	try {
		const n = Number.parseInt(
			(await fs.readFile(COUNT_FILE, "utf-8")).trim(),
			10,
		);
		return Number.isFinite(n) ? n : 0;
	} catch {
		return 0;
	}
};

const writeCountAtomic = async (count: number) => {
	const tmp = `${COUNT_FILE}.tmp`;
	await fs.writeFile(tmp, String(count), "utf-8");
	await fs.rename(tmp, COUNT_FILE);
};

export const recordPdfSuccess = createServerFn({ method: "POST" }).handler(
	async () => {
		try {
			await fs.mkdir(METRICS_DIR, { recursive: true });
			const next = (await readCount()) + 1;
			await Promise.all([
				fs.appendFile(LOG_FILE, `${new Date().toISOString()}\n`, "utf-8"),
				writeCountAtomic(next),
			]);
			return { count: next };
		} catch (err) {
			console.error("Failed to record PDF success:", err);
		}
	},
);
