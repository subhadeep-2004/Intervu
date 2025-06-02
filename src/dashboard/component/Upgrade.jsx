import React from 'react';
import Header from './Header';

function Upgrade() {
  return (
    <>
      <Header />
      <div className="min-h-screen text-white p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10 text-purple-400">Upgrade Your Plan</h1>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* $1 Plan */}
          <UpgradeCard
            price="$1/month"
            features={['Behavioral Interview Practice', 'Technical Interview Preparation','Overall great practice']}
            buttonText="Pay $1"
            highlight={false}
          />

          {/* $2 Plan */}
          <UpgradeCard
            price="$2/month"
            features={[
              'Behavioral Interview Practice',
              'Technical Interview Preparation',
              '1-on-1 Personal Mentorship',
            ]}
            buttonText="Pay $2"
            highlight={true}
          />
        </div>
      </div>
    </>
  );
}

function UpgradeCard({ price, features, buttonText, highlight }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-transform hover:scale-[1.02] shadow-xl ${
        highlight ? 'border-purple-500' : 'border-purple-700'
      }`}
    >
      {/* Gradient Header */}
      <div
        className="p-4 text-center text-lg font-semibold text-white"
        style={{
          background: 'linear-gradient(270deg, #0f0c29, #302b63, #24243e)',
          backgroundSize: '600% 600%',
          animation: 'gradientMove 8s ease infinite',
        }}
      >
        {price}
      </div>

      {/* Card Body */}
      <div className="bg-[#2e2e3a] p-6">
        <p className="text-gray-300 mb-4 text-sm">Includes:</p>
        <ul className="list-disc pl-5 text-gray-200 mb-6 space-y-2">
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
        <button
          className={`w-full px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 ${
            highlight
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-[#4b3b78] hover:bg-[#5c4b91]'
          }`}
        >
          {buttonText}
        </button>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

export default Upgrade;
