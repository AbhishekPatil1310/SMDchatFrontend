import { Play, MessageCircle, Users, Zap } from "lucide-react";
import heroImage from "/anime-chat-hero.png";
import mascotImage from "/anime-mascot.png";
import { Navigate, useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate()
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat brightness-75"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Animated Background Circles */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-36 h-36 rounded-full bg-pink-600/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-52 h-52 rounded-full bg-indigo-500/30 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-28 h-28 rounded-full bg-purple-500/30 blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        {/* Mascot */}
        <div className="mb-10 flex justify-center">
          <img
            src={mascotImage}
            alt="Anime Chat Mascot"
            className="w-36 h-36 animate-float"
          />
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-wide text-pink-400 drop-shadow-[0_2px_15px_rgba(236,72,153,0.7)]">
          AnimeChat
        </h1>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-pink-200 max-w-3xl mx-auto leading-relaxed mb-12 font-semibold">
          Connect with fellow anime lovers in the most <span className="text-yellow-300 font-bold">kawaii</span> chat experience.
          Share your passion, make friends, and dive into endless conversations!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-14">
          <button onClick={()=>navigate('/users')} className="btn-hero bg-pink-500 hover:bg-pink-600 shadow-lg text-white text-lg px-10 py-4 flex items-center rounded-xl transition">
            <MessageCircle className="mr-3 h-6 w-6" />
            Start Chatting
          </button>
          <button
            variant="outline"
            className="border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white px-10 py-4 text-lg flex items-center rounded-xl transition backdrop-blur-sm bg-white/10"
          >
            <Play className="mr-3 h-6 w-6" />
            Watch Demo
          </button>
        </div>

        {/* Feature Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          <div className="anime-card p-8 rounded-xl bg-gradient-to-br from-pink-500 to-pink-700 shadow-xl hover:shadow-pink-600 transition text-center pulse-glow">
            <Users className="mx-auto mb-4 h-10 w-10 text-yellow-300" />
            <div className="text-3xl font-extrabold text-yellow-300">50K+</div>
            <div className="text-pink-300 font-semibold mt-1">Active Otaku</div>
          </div>

          <div className="anime-card p-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-xl hover:shadow-indigo-600 transition text-center pulse-glow delay-500">
            <MessageCircle className="mx-auto mb-4 h-10 w-10 text-purple-300" />
            <div className="text-3xl font-extrabold text-purple-300">1M+</div>
            <div className="text-indigo-300 font-semibold mt-1">Messages Daily</div>
          </div>

          <div className="anime-card p-8 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-xl hover:shadow-purple-600 transition text-center pulse-glow delay-1000">
            <Zap className="mx-auto mb-4 h-10 w-10 text-pink-400" />
            <div className="text-3xl font-extrabold text-pink-400">24/7</div>
            <div className="text-purple-300 font-semibold mt-1">Online Fun</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-8 h-12 border-4 border-pink-400 rounded-full flex justify-center">
          <div className="w-2 h-4 bg-pink-400 rounded-full mt-3 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
