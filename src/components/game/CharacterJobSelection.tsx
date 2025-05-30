import { useState, useCallback, useEffect, useRef } from "react";
import { useGameStore } from "@/stores/GameStore";
import CharacterAvatar from "./elements/CharacterAvatar";
import SoundEffect, { SoundEffectHandle } from "@/components/sound/SoundEffect";
import ToastNotification from "../ui/ToastNotification";

interface CharacterJobSelectionProps {
  onStartGame: (character: string, job: string) => void;
}

const CharacterJobSelection: React.FC<CharacterJobSelectionProps> = ({ onStartGame }) => {
  const characters = useGameStore(state => state.characters);
  const jobs = useGameStore(state => state.jobs);
  const setSelectedCharacter = useGameStore(state => state.setSelectedCharacter);
  const setSelectedJob = useGameStore(state => state.setSelectedJob);
  const setSelectedCharacterGender = useGameStore(state => state.setSelectedCharacterGender);
  const initializeGameWithChoices = useGameStore(state => state.initializeGameWithChoices);

  const [selectedCharacter, setSelectedCharacterState] = useState<string | null>(null);
  const [selectedJob, setSelectedJobState] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const [stamina, setStamina] = useState<number>(100);

  const [selectedCharacterData, setSelectedCharacterData] = useState<any>(null);
  const selectedCharacterGender = useGameStore(state => state.selectedCharacterGender);

  const clickSoundRef = useRef<SoundEffectHandle>(null);
  const startSoundRef = useRef<SoundEffectHandle>(null);
  const warningAudioRef = useRef<SoundEffectHandle>(null);
  
  // Set initial stamina when character is selected
  useEffect(() => {
    if (selectedCharacter) {
      const characterData = characters.find(character => character.id === selectedCharacter);
      setSelectedCharacterData(characterData || null);
      
      if (characterData) {
        setStamina(100 * characterData.staminaModifier);
      }
    }
  }, [selectedCharacter, characters]);

  // Handle gender selection
  const handleGenderSelect = (gender: 'male' | 'female') => {
    if (selectedCharacterGender !== gender) {
      setSelectedCharacterGender(gender);
      clickSoundRef.current?.play();
    }
  };

  // Handle character selection
  const handleCharacterSelect = (characterId: string) => {
    if (selectedCharacter !== characterId) {
      setSelectedCharacterState(characterId);
      setSelectedCharacter(characterId);
      clickSoundRef.current?.play();
    }
  };

  const handleJobChange = useCallback((job: string) => {
    if (selectedJob !== job) {
      setSelectedJobState(job);
      setSelectedJob(job);
      clickSoundRef.current?.play();
    }
  }, [selectedJob, setSelectedJob]);

  const handleStartGame = () => {
    if (selectedCharacter && selectedJob) {
      initializeGameWithChoices();
      startSoundRef.current?.play()
      onStartGame(selectedCharacter, selectedJob);
    } else {
      setWarning("⚠️ Please select a character and a job.");
    }
  };
  
  useEffect(() => {
    if (warning) {
      warningAudioRef.current?.play();
    }
  }, [warning]); 

  return (
    <div className="p-6 mt-4 max-w-2xl mx-auto relative bg-gray-800 rounded-lg shadow-xl">
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {warning && (
          <ToastNotification message={warning} type="warning" keyProp={Date.now()} />
        )}
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center text-white">💸 Budgeting Simulation Game</h1>

      {/* Gender Selection Section */}
      <div className="mb-6">
        <h2 className="text-xl text-white mb-3 text-center">Choose Your Gender</h2>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleGenderSelect('male')}
            className={`p-4 w-28 h-28 border cursor-pointer rounded-full transition transform duration-300 ${selectedCharacterGender === 'male' ? 'bg-blue-500 text-white scale-105 shadow-lg' : 'bg-gray-600 text-white'} hover:bg-blue-400 hover:scale-105 hover:shadow-xl`}
          >
            <span role="img" aria-label="Male Icon" className="text-4xl">👨‍🦱</span>
            <p className="mt-2 text-sm">Male</p>
          </button>

          <button
            onClick={() => handleGenderSelect('female')}
            className={`p-4 w-28 h-28 border cursor-pointer rounded-full transition transform duration-300 ${selectedCharacterGender === 'female' ? 'bg-pink-500 text-white scale-105 shadow-lg' : 'bg-gray-600 text-white'} hover:bg-pink-400 hover:scale-105 hover:shadow-xl`}
          >
            <span role="img" aria-label="Female Icon" className="text-4xl">👩‍🦱</span>
            <p className="mt-2 text-sm">Female</p>
          </button>
        </div>

        {/* Display avatar after gender selection */}
        {selectedCharacterGender && (
          <div className="mt-6 flex justify-center items-center text-center">
            <div className="text-white">
              <p className="text-lg mb-4">Your Selected Gender:</p>
              <div className="flex justify-center items-center">
                <div className="animate-fade-in">
                  <CharacterAvatar gender={selectedCharacterGender} stamina={stamina} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Character Selection Section */}
      <div className="mb-6">
        <h2 className="text-xl text-white mb-3">Choose Your Character</h2>
        <div className="grid grid-cols-3 gap-4">
          {characters.map(character => (
            <div key={character.id} className="flex flex-col items-center">
              <button
                onClick={() => handleCharacterSelect(character.id)}
                className={`w-full p-4 border cursor-pointer rounded-lg ${selectedCharacter === character.id ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'} hover:bg-blue-400 transition`}
              >
                {character.name}
              </button>
            </div>
          ))}
        </div>
        {/* Display Character Description */}
        {selectedCharacterData && (
          <div className="mt-4 text-white">
            <h3 className="text-lg font-semibold">Character Description:</h3>
            <p>{selectedCharacterData.description}</p>
          </div>
        )}
      </div>

      {/* Job Selection Section */}
      <div className="mb-6">
        <h2 className="text-xl text-white mb-3">Choose Your Job</h2>
        <div className="grid grid-cols-3 gap-4">
          {jobs.map(job => (
            <button
              key={job.id}
              onClick={() => handleJobChange(job.id)}
              className={`w-full p-4 border cursor-pointer rounded-lg ${selectedJob === job.id ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'} hover:bg-green-400 transition`}
            >
              {job.name}
            </button>
          ))}
        </div>
        {/* Display Job Description */}
        {selectedJob && (
          <div className="mt-4 text-white">
            <h3 className="text-lg font-semibold">Job Description:</h3>
            <p>{jobs.find(job => job.id === selectedJob)?.description}</p>
          </div>
        )}
      </div>

      {/* Start Game Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleStartGame}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300 cursor-pointer"
        >
          Start Game
        </button>
      </div>
      
      <SoundEffect ref={clickSoundRef} src="/sounds/click.mp3" />
      <SoundEffect ref={startSoundRef} src="/sounds/start.mp3" />
      <SoundEffect ref={warningAudioRef} src="/sounds/warning.mp3" />
    </div>
  );
};

export default CharacterJobSelection;
