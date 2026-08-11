import heroImage from "../assets/photos/hero.png";

function BirthdayHero() {
  return (
    <section className="birthday-hero">
      <img src={heroImage} alt="Happy Birthday Sindhu" className="hero-image" />
    </section>
  );
}

export default BirthdayHero;