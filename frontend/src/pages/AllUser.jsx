import { useState } from "react";
import Sidebar from "../componete/sidebar";
import Card from '../componete/Media'; // Assuming this is the component you want to fix to the bottom right.

const players = [
  {
    id: 1,
    name: "IGL",
    rank: "Conqueror",
    frontImage: "/sri.jpeg",
    backImage: "/sriD.jpeg",
    stats: "Kills: 1250, Wins: 310, K/D Ratio: 4.5",
  },
  {
    id: 2,
    name: "BattleRush",
    rank: "Ace dominator",
    frontImage: "/vishnu.jpeg",
    backImage: "/vishnuD.jpeg",
    stats: "Kills: 900, Wins: 280, K/D Ratio: 3.8",
  },
  {
    id: 3,
    name: "Team sniper",
    rank: "Ace dominator",
    frontImage: "/Rocky.jpeg",
    backImage: "/RockyD.jpeg",
    stats: "Kills: 850, Wins: 250, K/D Ratio: 3.6",
  },
  {
    id: 4,
    name: "Prime",
    rank: "Acs dominator",
    frontImage: "/Prime.jpeg",
    backImage: "/PrimeD.jpeg",
    stats: "Kills: 750, Wins: 200, K/D Ratio: 3.2",
  },
  {
    id: 5,
    name: "Vishwa",
    rank: "Acs dominator",
    frontImage: "/vishwa.jpeg",
    backImage: "/vishwaD.jpeg",
    stats: "Kills: 600, Wins: 180, K/D Ratio: 3.0",
  },
];

// PlayerCard Component (Unchanged from previous iteration)
const PlayerCard = ({ player, openModal }) => {
  return (
    <div
      key={player.id}
      onClick={() => openModal(player.id)}
      className="cursor-pointer relative w-full h-72 rounded-xl group focus:outline-none transition-all hover:scale-[1.03] active:scale-[0.98] duration-200"
      title={`Click to view ${player.name}'s details`}
      style={{
        border: '3px solid #FFC107',
        boxShadow: '0 0 15px rgba(255, 193, 7, 0.5)',
        backgroundColor: 'rgba(25, 25, 25, 0.7)'
      }}
    >
      <div className="absolute w-full h-full rounded-xl overflow-hidden">
        <img
          src={player.frontImage}
          alt={`${player.name} front`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-front.png'; }}
        />
        <div className="absolute bottom-0 w-full bg-gray-900/80 p-3 text-center border-t-2 border-orange-500">
          <h3 className="text-amber-400 font-extrabold text-xl truncate">{player.name}</h3>
          <p className="text-orange-300 font-medium text-sm">{player.rank}</p>
        </div>
      </div>
    </div>
  );
};

// PlayerStats Helper Component (Unchanged)
const PlayerStats = ({ stats, rank }) => {
  const defaultStats = "Kills: N/A, Wins: N/A, K/D Ratio: N/A";
  const statString = stats || defaultStats;

  const statItems = statString.split(',').map((item) => {
    const [label, value] = item.trim().split(':');
    return (
      <div key={label} className="flex justify-between border-b border-gray-700/50 pb-1 mb-1 last:border-b-0">
        <span className="font-semibold text-gray-300">{label.trim()}</span>
        <span className="font-extrabold text-orange-400">{value.trim()}</span>
      </div>
    );
  });

  return (
    <div className="w-full mt-4 bg-gray-800/60 p-3 rounded-lg border border-amber-500/30">
      <h4 className="text-lg font-bold text-center mb-2 text-amber-400">Current Rank: {rank}</h4>
      {statItems}
    </div>
  );
};

// PlayerModal Component (Unchanged)
const PlayerModal = ({ player, onClose }) => {
  if (!player) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border-4 border-amber-400 rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-500 text-3xl font-bold transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-orange-400 mb-4">{player.name}'s Profile</h2>

          <img
            src={player.backImage}
            alt={`${player.name} detail`}
            className="w-full h-48 object-cover rounded-md border-2 border-gray-700 shadow-xl mx-auto mb-4"
            loading="lazy"
            onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-back.png'; }}
          />

          <PlayerStats stats={player.stats} rank={player.rank} />
        </div>
      </div>
    </div>
  );
};

// Main Users Component
export default function Users() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const selectedPlayer = players.find(p => p.id === selectedPlayerId);

  const openModal = (id) => {
    setSelectedPlayerId(id);
  };

  const closeModal = () => {
    setSelectedPlayerId(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white relative"> {/* Added relative for positioning fixed child */}
      <Sidebar />

      <main className="flex-1 p-4 sm:p-8">
        <header className="mb-10 text-center pt-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-400 drop-shadow-2xl shadow-black tracking-wider uppercase">
            BGMI Sports Squad
          </h1>
          <p className="text-orange-300 mt-3 max-w-2xl mx-auto font-medium text-lg">
            Meet the Roster! Tap a player card to view their core stats. 🔍
          </p>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              openModal={openModal}
            />
          ))}
        </section>
      </main>

      {/* Modal Rendering */}
      <PlayerModal player={selectedPlayer} onClose={closeModal} />

      {/* FIXED CARD AT BOTTOM RIGHT */}
      <div className="fixed bottom-8 right-8 z-40"> {/* Adjust bottom-8 and right-8 for padding */}
        <Card />
      </div>
    </div>
  );
}
