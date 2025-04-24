import React, { useState } from 'react';

const GeneratePodcast: React.FC = () => {
  const [length, setLength] = useState('short');
  const [humorLevel, setHumorLevel] = useState('medium');
  const [profile, setProfile] = useState('startup');

  return (
    <section className="bg-gradient-to-b from-white to-gray-300 py-12">
      <div className="max-w-screen-xl sm:px-7 px-4 mx-auto">
        {/* Header Section */}
        <div className="rounded-lg mb-6">
          <div className="lg:grid lg:grid-cols-12 items-center">
            <div className="text-black lg:col-span-12 flex flex-col text-center">
              <h2 className="text-4xl font-medium lg:text-6xl"><span className="text-purple-500 font-bold"
                style={{fontFamily: '"Nothing You Could Do", cursive'}}>Generate</span> your podcast</h2>
              <span className="text-gray-600 pt-2 text-[18px] leading-[24px] mb-6">
                Create custom podcasts from your content with our advanced AI technology
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Podcast Options Section */}
          <div className="bg-white rounded-lg shadow-xl p-6 md:col-span-1">
            <h2 className="text-2xl font-medium text-center">Podcast <span className="text-purple-500 font-bold"
              style={{fontFamily: '"Nothing You Could Do", cursive'}}>Options</span></h2>
            <span className="text-gray-600 text-sm block text-center mb-4">
              Customize your generation preferences
            </span>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Length:</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 text-sm"
                >
                  <option value="short">Short (5-10 minutes)</option>
                  <option value="medium">Medium (10-20 minutes)</option>
                  <option value="long">Long (20-30 minutes)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Humor Level:</label>
                <select
                  value={humorLevel}
                  onChange={(e) => setHumorLevel(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 text-sm"
                >
                  <option value="low">Low (Serious tone)</option>
                  <option value="medium">Medium (Casual tone)</option>
                  <option value="high">High (Entertaining tone)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Profile:</label>
                <select
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 text-sm"
                >
                  <option value="startup">Startup World</option>
                  <option value="football">Football</option>
                  <option value="tech">Technology</option>
                </select>
              </div>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 mt-4">
                Generate Podcast
              </button>
            </div>
          </div>

          {/* Transcript Section */}
          <div className="bg-white rounded-lg shadow-xl p-6 md:col-span-2">
            <h2 className="text-2xl font-medium text-center">Podcast <span className="text-purple-500 font-bold"
              style={{fontFamily: '"Nothing You Could Do", cursive'}}>Transcript</span></h2>
            <span className="text-gray-600 text-sm block text-center mb-4">
              Follow along with the generated audio content
            </span>
            
            <div className="bg-gray-50 p-4 rounded-md text-gray-800 border border-gray-200 h-[350px] overflow-y-auto text-sm">
              <p className="mb-3"><strong>Host:</strong> Welcome to our podcast! Today, we're diving into the fascinating world of AI and technology.</p>
              <p className="mb-3"><strong>Guest:</strong> Thanks for having me! I'm excited to share insights on how AI is shaping our future.</p>
              <p className="mb-3"><strong>Host:</strong> Let's get started with the basics. What are some of the most exciting developments you've seen in AI recently?</p>
              <p className="mb-3"><strong>Guest:</strong> Great question! One of the most promising areas is generative AI, which is transforming everything from content creation to product design. We're seeing systems that can not only understand human language but also produce creative, original work.</p>
              <p className="mb-3"><strong>Host:</strong> That's fascinating. How do you see this affecting industries like media and entertainment?</p>
              <p className="mb-3"><strong>Guest:</strong> The impact is already substantial. Media companies are using AI to generate summaries, create personalized content recommendations, and even produce draft articles. In entertainment, we're seeing AI assist in scriptwriting, music composition, and visual effects. The key is finding the right balance where AI enhances human creativity rather than replacing it.</p>
              <p className="mb-3"><strong>Host:</strong> And what about concerns around AI-generated content? How can we ensure quality and authenticity?</p>
              <p><strong>Guest:</strong> That's a crucial question. As AI-generated content becomes more prevalent, we need robust systems for verification and attribution. Transparency is key – audiences should know when they're consuming AI-generated content. We also need to develop better methods for detecting AI-generated content that might be misleading or harmful. It's a balance between embracing innovation and maintaining trust.</p>
            </div>
          </div>
        </div>

        {/* Audio Player Section */}
        <div className="bg-black rounded-lg shadow-xl p-6 mt-6">
          
          <div className="max-w-3xl mx-auto bg-gray-900 p-5 rounded-md border border-gray-700">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-4">
                <i className="bi bi-mic-fill text-white text-xl"></i>
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium">AI Technology Discussion</h3>
                <p className="text-gray-400 text-sm">Generated on April 24, 2025</p>
              </div>
            </div>
            
            <audio controls className="w-full h-10 mb-4" style={{accentColor: '#8b5cf6'}}>
              <source src="/path-to-audio-file.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            
            <div className="flex justify-between">
              <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2 px-4 rounded-md text-sm flex items-center">
                <i className="bi bi-download mr-2"></i>Download
              </button>
              <div className="flex gap-2">
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2 px-3 rounded-md text-sm">
                  <i className="bi bi-twitter"></i>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2 px-3 rounded-md text-sm">
                  <i className="bi bi-facebook"></i>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2 px-3 rounded-md text-sm">
                  <i className="bi bi-linkedin"></i>
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md text-sm">
                  <i className="bi bi-share-fill mr-1"></i>Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratePodcast;