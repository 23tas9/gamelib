import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-github.tsx"

interface Data {
	name: string;
	id: string;
	favicon: string;
	github: string;
	keywords: string[];
};

export default function Home() {
	const dirs = Deno.readDirSync('./static/games/');

	const contents: Data[] = [];

	for (const dir of dirs) {
		const text = Deno.readTextFileSync(`./static/games/${dir.name}/info.json`);
		const content: Data = JSON.parse(text);

		contents.push(content);
	}

	return (
		<div>
			<main>
				<h1>ゲーム一覧</h1>
				<div className="gamelist">
					{contents.map(content => (
						<a href={`/${content.id}`}>
							<figure className="gamelist__item">
								<img className="gamelist__item__img" src={content.favicon} alt="" />
								<figcaption className="gamelist__item__description">
									<p>{content.name}</p>
									<a href={content.github} className="gamelist__item__description__github" target="_blank" rel="noopener">
										<IconBrandGithub />
									</a>
								</figcaption>
							</figure>
						</a>
					))}
				</div>
			</main>
		</div>
	);
}