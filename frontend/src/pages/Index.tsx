import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromptForm from '@/components/PromptForm';
import VideoPreview from '@/components/VideoPreview';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <PromptForm />
        <VideoPreview />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
