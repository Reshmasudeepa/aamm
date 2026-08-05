import video1 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.21 AM.mp4";
import video2 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.20 AM.mp4";
import video3 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.20 AM (1).mp4";
import video4 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.17 AM.mp4";
import video5 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.15 AM.mp4";
import video6 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.09 AM.mp4";

const videos = [video1, video2, video3, video4, video5, video6];

function Music() {
	return (
		<section className="music-section" id="video-memories">
			<div className="music-hearts music-heart-1">💗</div>
			<div className="music-hearts music-heart-2">💗</div>
			<div className="music-hearts music-heart-3">💗</div>

			<div className="music-container">
				<div className="music-emoji">🎵</div>

				<p className="music-kicker">THE SONG THAT FEELS LIKE YOU</p>

				<h2>A Little Melody For Your Day</h2>

				<p className="music-description">
					This is the quiet little ending to the surprise, where the feeling stays warm
					and the music keeps the moment alive. 💗
				</p>

				<div className="music-video-grid">
					{videos.map((video, index) => (
						<article className="music-video-card" key={video}>
							<div className="music-video-frame">
								<video
									src={video}
									controls
									muted
									playsInline
									preload="metadata"
								/>
							</div>
							<p className="music-video-label">
								{[
									"The Smile That Says Everything 😂💗",
									"Just Another Beautiful Moment ✨",
									"Pretty You, Happy You 💕",
									"Your Cute & Crazy Side 🎀",
									"This Smile Never Gets Old 😂💗",
									"A Little Moment Worth Keeping 🦋",
								][index]}
							</p>
						</article>
					))}
				</div>

				<div className="music-ending">
					<p>And honestly... this list could go on forever. 💗</p>

					<a href="#music" className="music-surprise-btn">
						One More Surprise 🎵 ↓
					</a>
				</div>
			</div>
		</section>
	);
}

export default Music;
