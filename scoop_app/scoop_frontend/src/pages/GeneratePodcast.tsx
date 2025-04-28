import React, { useState, useEffect, useRef } from 'react';
// Import the audio files directly - using relative paths to ensure proper loading
import completeOneAudio from '../assets/complete_podcast_one.mp3';
import completeTwoAudio from '../assets/complete_podcast_two.mp3';

const GeneratePodcast: React.FC = () => {
  const [length, setLength] = useState('short');
  const [humorLevel, setHumorLevel] = useState('medium');
  const [profile, setProfile] = useState('startup');
  const [podcastType, setPodcastType] = useState('solo');
  
  // State variables
  const [isGenerated, setIsGenerated] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioSource, setAudioSource] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioDuration, setAudioDuration] = useState<string>('0:00');
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Event handler for when audio metadata is loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      setAudioDuration(formatTime(duration));
      console.log("Audio metadata loaded. Duration:", duration);
    }
  };
  
  // Event handler for audio time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(formatTime(audioRef.current.currentTime));
    }
  };
  
  // Function to fetch transcript content
  const fetchTranscript = async (type: string) => {
    try {
      const response = await fetch(`/src/assets/${type === 'solo' ? 'one' : 'two'}_podcast.txt`);
      if (!response.ok) {
        // Fallback to hardcoded transcripts if fetch fails
        return getHardcodedTranscript(type);
      }
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Error fetching transcript:', error);
      // Fallback to hardcoded transcripts
      return getHardcodedTranscript(type);
    }
  };
  
  // Fallback function with hardcoded transcript snippets
  const getHardcodedTranscript = (type: string) => {
    if (type === 'solo') {
      return "Hey Justin, it's Scoop — reporting for duty, and today we're strapping in for a full marathon across the fields of AI innovation, venture chaos, tech dreams, policy pivots, and maybe, just maybe, a little soul-searching on what it all means. So pour yourself a coffee, and let's get to it.\n\nStarting us off, Gemma 3 just rolled out a new update that seriously shifts the game. This model — once requiring an H100 GPU — can now run on a desktop GPU, thanks to something called Quantization-Aware Training. Basically, they taught the model to pack light without forgetting anything important.";
    } else {
      return "Host 1:\nAlright, welcome back everyone. Today's show is packed — I mean absolutely loaded — with the wildest updates from AI, tech, and venture land. You're gonna want to strap in for this one.\n\nHost 2:\nI'm already strapped in. Hit me. I'm ready for the chaos.\n\nHost 1:\nAlright, let's start with something that sounds small but is actually huge — Google announced new versions of their Gemma 3 model. Used to need a monster H100 GPU, now it can run on a desktop GPU thanks to some wizardry called quantization-aware training.";
    }
  };
  
  // Reset audio player when changing podcast type
  useEffect(() => {
    if (isGenerated) {
      setIsGenerated(false);
      setAudioSource('');
      setTranscript('');
      setCurrentTime('0:00');
      setAudioDuration('0:00');
    }
  }, [podcastType]);

  // Load audio from direct file path
  const loadAudioFile = (isSolo: boolean) => {
    try {
      return isSolo ? completeOneAudio : completeTwoAudio;
    } catch (error) {
      console.error("Error loading audio file:", error);
      // Fallback to direct path if import fails
      return isSolo ? 
        '/src/assets/complete_podcast_one.mp3' : 
        '/src/assets/complete_podcast_two.mp3';
    }
  };
  
  // Function to handle podcast generation
  const handleGeneratePodcast = async () => {
    setIsLoading(true);
    
    try {
      // Simulate a small delay for loading
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const isSolo = podcastType === 'solo';
      // Set the appropriate files based on podcast type
      const transcriptContent = await fetchTranscript(isSolo ? 'solo' : '2-person');
      setTranscript(transcriptContent);
      
      // Load the audio file
      const audioFile = loadAudioFile(isSolo);
      console.log("Loading audio file:", isSolo ? "solo" : "two-person", audioFile);
      setAudioSource(audioFile);
      
      setIsGenerated(true);
      
      // Force reload of audio element if needed
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
        }
      }, 100);
    } catch (error) {
      console.error('Error generating podcast:', error);
      setTranscript('Failed to generate podcast. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Podcast Type:</label>
                <select
                  value={podcastType}
                  onChange={(e) => setPodcastType(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 text-sm"
                >
                  <option value="solo">Solo</option>
                  <option value="2-person">2-Person</option>
                </select>
              </div>
              <button 
                className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-purple-500 hover:bg-purple-600'} text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 mt-4`}
                onClick={handleGeneratePodcast}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Podcast'}
              </button>
            </div>
          </div>

          {/* Transcript Section */}
          <div className={`bg-white rounded-lg shadow-xl p-6 md:col-span-2 ${!isGenerated ? 'filter blur-sm pointer-events-none' : ''}`}>
            <h2 className="text-2xl font-medium text-center">Podcast <span className="text-purple-500 font-bold"
              style={{fontFamily: '"Nothing You Could Do", cursive'}}>Transcript</span></h2>
            <span className="text-gray-600 text-sm block text-center mb-4">
              {isGenerated ? 'Follow along with the generated audio content' : 'Generate a podcast to see the transcript'}
            </span>
            
            <div className="bg-gray-50 p-4 rounded-md text-gray-800 border border-gray-200 h-[350px] overflow-y-auto text-sm">
              {isGenerated ? (
                <div>
                  {transcript.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-3">
                      {paragraph.split('\n').map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {line}
                          {lineIndex < paragraph.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Podcast transcript will appear here after generation</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Audio Player Section */}
        <div className={`bg-white rounded-lg shadow-xl p-6 mt-6 ${!isGenerated ? 'filter blur-sm pointer-events-none' : ''}`}>
          <div className="max-w-3xl mx-auto bg-gray-900 p-5 rounded-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-4">
                  <i className="bi bi-mic-fill text-white text-xl"></i>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-medium">X Feed Digest</h3>
                  <p className="text-gray-500 text-sm">Generated on April 27, 2025</p>
                </div>
              </div>
              {isGenerated && (
                <div className="text-right">
                  <span className="text-white text-sm">{currentTime} / {audioDuration}</span>
                </div>
              )}
            </div>
            
            {isGenerated && (
              <div className="mb-4">
                <audio 
                  ref={audioRef}
                  controls 
                  className="w-full h-10" 
                  style={{accentColor: '#8b5cf6'}}
                  onLoadedMetadata={handleLoadedMetadata}
                  onTimeUpdate={handleTimeUpdate}
                >
                  <source src={audioSource} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                {podcastType === 'solo' ? (
                  <div className="text-gray-400 text-xs mt-1 text-center">
                    Playing solo podcast
                  </div>
                ) : (
                  <div className="text-gray-400 text-xs mt-1 text-center">
                    Playing two-person podcast
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-between">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md text-sm flex items-center">
                <i className="bi bi-download mr-2"></i>Download
              </button>
              <div className="flex gap-2">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-3 rounded-md text-sm">
                  <i className="bi bi-twitter"></i>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-3 rounded-md text-sm">
                  <i className="bi bi-facebook"></i>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-3 rounded-md text-sm">
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