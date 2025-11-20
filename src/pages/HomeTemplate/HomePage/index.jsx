import React from 'react';
import HomeHeader from './HomeHeader';
import HomeModels from './HomeModels';
import HomeFeatures from './HomeFeatures';
import HomeFooter from './HomeFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HomeHeader />
      <HomeModels />
      <HomeFeatures />
      <HomeFooter />
    </div>
  );
}
