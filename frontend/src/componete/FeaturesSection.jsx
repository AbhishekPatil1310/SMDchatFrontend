import { MessageSquare, Video, Smile, Shield, Gamepad2, Heart } from "lucide-react";
import featuresImage from "/chat-features-icons.png";

const FeaturesSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Real-time Messaging",
      description: "Lightning-fast messages with anime stickers and custom emojis",
      color: "text-pink-400",
      bgFrom: "from-pink-300/20",
      bgTo: "to-pink-500/40"
    },
    {
      icon: Video,
      title: "Voice & Video Chat",
      description: "Crystal clear voice channels for anime watch parties and discussions",
      color: "text-indigo-400",
      bgFrom: "from-indigo-300/20",
      bgTo: "to-indigo-500/40"
    },
    {
      icon: Smile,
      title: "Anime Emojis",
      description: "Express yourself with thousands of kawaii emojis and reactions",
      color: "text-purple-400",
      bgFrom: "from-purple-300/20",
      bgTo: "to-purple-500/40"
    },
    {
      icon: Shield,
      title: "Safe Community",
      description: "Moderated servers to keep our anime community wholesome and fun",
      color: "text-pink-400",
      bgFrom: "from-pink-300/20",
      bgTo: "to-pink-500/40"
    },
    {
      icon: Gamepad2,
      title: "Mini Games",
      description: "Play anime trivia and games while chatting with friends",
      color: "text-indigo-400",
      bgFrom: "from-indigo-300/20",
      bgTo: "to-indigo-500/40"
    },
    {
      icon: Heart,
      title: "Find Your Waifu/Husbando",
      description: "Connect with people who share your anime preferences",
      color: "text-purple-400",
      bgFrom: "from-purple-300/20",
      bgTo: "to-purple-500/40"
    }
  ];

  return (
    <section className="py-20 relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-pink-400 drop-shadow-lg glow-text">
            Epic Features
          </h2>
          <p className="text-xl text-pink-200 max-w-3xl mx-auto font-semibold">
            Discover why AnimeChat is the ultimate destination for anime enthusiasts worldwide
          </p>
        </div>

        {/* Features Image */}
        <div className="flex justify-center mb-16">
          <img
            src={featuresImage}
            alt="Chat Features"
            className="max-w-md w-full h-auto animate-float rounded-xl shadow-lg"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="anime-card p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-105 transition-transform duration-300 shadow-xl group cursor-pointer"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.bgFrom} ${feature.bgTo} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`${feature.color} h-8 w-8`} />
                </div>

                <h3 className="text-xl font-bold mb-4 text-pink-300 group-hover:text-pink-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-pink-200 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="anime-card p-10 max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-pink-700 to-pink-900 shadow-2xl">
            <h3 className="text-3xl font-extrabold mb-6 text-pink-400 glow-text">
              Ready to Join the Fun?
            </h3>
            <p className="text-pink-200 mb-8 text-lg font-semibold">
              Start your anime chat adventure today and meet thousands of fellow otaku!
            </p>
            <button className="btn-hero bg-pink-500 hover:bg-pink-600 text-white text-lg px-12 py-4 rounded-xl shadow-lg transition">
              Join AnimeChat Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
