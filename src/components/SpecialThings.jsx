function SpecialThings() {
	const specialThings = [
		{
			emoji: "😊",
			title: "Your Smile",
			text:
				"That smile has a way of making everything around you feel a little brighter.",
		},
		{
			emoji: "💖",
			title: "Your Kind Heart",
			text:
				"The way you care about people and the little things you do make you truly special.",
		},
		{
			emoji: "😂",
			title: "Your Crazy Side",
			text:
				"Life would definitely be boring without your funny, crazy and unexpected moments.",
		},
		{
			emoji: "🤝",
			title: "Our Friendship",
			text:
				"From random conversations to unforgettable memories, I'm grateful for every moment.",
		},
		{
			emoji: "✨",
			title: "Just Being You",
			text:
				"Never change the beautiful, genuine and wonderful person that you are.",
		},
		{
			emoji: "🌸",
			title: "The Memories",
			text:
				"Every little memory we've created has become a beautiful part of our story.",
		},
	];

	return (
		<section className="special-things-section" id="special-things">
			<div className="special-things-heart special-heart-1">💗</div>
			<div className="special-things-heart special-heart-2">💗</div>
			<div className="special-things-heart special-heart-3">💗</div>

			<div className="special-things-container">
				<div className="special-things-heading">
					<span>💗</span>

					<p>A FEW THINGS I LOVE ABOUT YOU</p>

					<h2>What Makes You So Special, Sindhu?</h2>

					<p className="special-things-description">
						There are so many things that make you special,
						but here are just a few of my favorites. 💕
					</p>
				</div>

				<div className="special-things-grid">
					{specialThings.map((thing) => (
						<article className="special-card" key={thing.title}>
							<div className="special-card-emoji">{thing.emoji}</div>

							<h3>{thing.title}</h3>

							<p>{thing.text}</p>
						</article>
					))}
				</div>

				<div className="special-things-ending">
					<p>And honestly... this list could go on forever. 💗</p>

					<a href="#music" className="special-things-btn">
						One More Surprise 🎵 ↓
					</a>
				</div>
			</div>
		</section>
	);
}

export default SpecialThings;
