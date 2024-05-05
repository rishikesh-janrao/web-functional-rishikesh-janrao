import { useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";
import { fetchContent } from "./content";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const onBoundary = (e: SpeechSynthesisEvent) => {};
  const onEnd = (e: SpeechSynthesisEvent) => {};
  const onStateUpdate = (state: PlayingState) => {};
  const { load, cancel } = createSpeechEngine({
    onBoundary,
    onEnd,
    onStateUpdate,
  });
  const allSentences = sentences;
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const play = () => {
    if (!["playing"].includes(playbackState)){
      setPlaybackState("playing")
      allSentences.forEach((sentence, index) => {
        setCurrentSentenceIdx(index);
      });
    }
  };
  const pause = () => {
    setPlaybackState("paused")
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
