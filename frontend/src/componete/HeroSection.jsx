import { Play, MessageCircle, Users, Zap } from "lucide-react";

import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const heroImage = "/BgmiBack.jpg";
  const mascotImage = "/Scout.jpg";
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-yellow-900 to-black text-white">
      {/* BGMI Battleground Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat brightness-80"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* BGMI Style Animated Lights */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-24 left-52 w-60 h-60 rounded-full bg-yellow-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-24 right-40 w-52 h-52 rounded-full bg-orange-700/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-2/3 left-1/5 w-36 h-36 rounded-full bg-green-600/30 blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        {/* BGMI Mascot */}
        <div className="mb-10 flex justify-center">
          <img
            src={mascotImage}
            alt="BGMI Hero Mascot"
            className="w-40 h-40 animate-float"
          />
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-wide text-yellow-400 drop-shadow-[0_2px_15px_rgba(252,211,77,0.7)]">
          BGMI HUB
        </h1>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-yellow-300 max-w-3xl mx-auto leading-relaxed mb-12 font-semibold">
          Squad up for the ultimate <span className="text-green-400 font-bold">battle royale</span> experience.
          Join gamers across India—team up, strategize, and become the last one standing!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-14">
          <button onClick={()=>navigate('/users')} className="btn-hero bg-yellow-600 hover:bg-yellow-700 shadow-lg text-white text-lg px-10 py-4 flex items-center rounded-xl transition">
            <Users className="mr-3 h-6 w-6" />
            Find Team
          </button>
          <button onClick={()=>window.location.href="http://www.youtube.com/@bgmi_with-pattedar"}
            variant="outline"
            className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-10 py-4 text-lg flex items-center rounded-xl transition backdrop-blur-sm bg-white/5"
          >
            <Play className="mr-3 h-6 w-6" />
            Watch Gameplay
          </button>
        </div>

        {/* Feature Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          <div className="anime-card p-8 rounded-xl bg-gradient-to-br from-yellow-700 to-yellow-900 shadow-xl hover:shadow-yellow-600 transition text-center pulse-glow">
            <Users className="mx-auto mb-4 h-10 w-10 text-green-400" />
            <div className="text-3xl font-extrabold text-green-400">7+</div>
            <div className="text-yellow-300 font-semibold mt-1">Active Players</div>
          </div>
          <div className="anime-card p-8 rounded-xl bg-gradient-to-br from-orange-700 to-orange-900 shadow-xl hover:shadow-orange-600 transition text-center pulse-glow delay-500">
            <MessageCircle className="mx-auto mb-4 h-10 w-10 text-yellow-300" />
            <div className="text-3xl font-extrabold text-yellow-300">20+</div>
            <div className="text-orange-300 font-semibold mt-1">Matches Played Daily</div>
          </div>
          <div className="anime-card p-8 rounded-xl bg-gradient-to-br from-gray-800 to-black shadow-xl hover:shadow-green-600 transition text-center pulse-glow delay-1000">
            <Zap className="mx-auto mb-4 h-10 w-10 text-yellow-400" />
            <div className="text-3xl font-extrabold text-yellow-400">24/7</div>
            <div className="text-gray-300 font-semibold mt-1">Can chat</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-8 h-12 border-4 border-yellow-400 rounded-full flex justify-center">
          <div className="w-2 h-4 bg-yellow-400 rounded-full mt-3 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
