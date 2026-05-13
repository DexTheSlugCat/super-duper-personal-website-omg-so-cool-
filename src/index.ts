/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(Request, Enviroment, CTX): Promise<Response> {
		const Url = new URL(Request.url);

		const { success: Allowed } = await Enviroment.Ratelimit.limit({ key: Url.pathname });
		if (!Allowed) {
			return new Response("Too Many Requests", { status: 429 });
		}

		if (Url.pathname === "/") {
			return await Enviroment.Assets.fetch("/src/Public/index.html");
		}

		console.log(Url.searchParams)

		return new Response("Hello World!");
	},
} satisfies ExportedHandler<Env>;
