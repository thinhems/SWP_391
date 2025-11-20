import React from 'react';
import AboutHeader from './AboutHeader';
import AboutMission from './AboutMission';
import AboutFeatures from './AboutFeatures';
import AboutStats from './AboutStats';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <AboutHeader />
      <AboutMission />
      <AboutFeatures />
      <AboutStats />
    </div>
  );
}
