import orbistoreLogo from "../assets/SVG/orbistore-logo-01.svg";

function Home() {
  return (
    <div className="home-base">
      <a href="/login">
        <img src={orbistoreLogo} alt="Orbistore Logo" width={500} />
      </a>
    </div>
  );
}

export default Home;
