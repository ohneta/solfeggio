import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

//------------------------------------------------------------
//window.AudioContext = window.AudioContext || window.webkitAudioContext;
//let audioContext: AudioContext = new AudioContext();
//let audioContext: AudioContext | undefined = undefined;
// let audioContext = new(window.AudioContext() || window.webkitAudioContext());
// let oscillatorNode: OscillatorNode = audioContext.createOscillator();
// let gainNode: GainNode = audioContext.createGain();

let audioContext: AudioContext | undefined;
let oscillatorNode: OscillatorNode | undefined;
let gainNode: GainNode | undefined;

function changeSound(freq: number) {
  if (audioContext === undefined) return;
  if (oscillatorNode === undefined) return;
  if (gainNode === undefined) return;

  const stopTime = 1.0;
  gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.0, audioContext.currentTime + stopTime);
  setTimeout(() => {
    if (audioContext === undefined) return;
    if (oscillatorNode === undefined) return;
    if (gainNode === undefined) return;
    const startTime = 2.0;
    gainNode.gain.value = 0;
    gainNode.gain.linearRampToValueAtTime(0.0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1.0, audioContext.currentTime + startTime);
    oscillatorNode.frequency.setValueAtTime(freq, audioContext.currentTime)
  }, (stopTime) * 1000);
}

function playSound(freq: number) {
//  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
console.log(`init AudioContext():`);
console.log(audioContext);
  oscillatorNode = audioContext.createOscillator();
  gainNode = audioContext.createGain();

  oscillatorNode.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillatorNode.type = 'sine';	// sine,square,sawtooth, triangle
//  oscillatorNode.type = 'sawtooth';	// sine,square,sawtooth, triangle

  oscillatorNode.frequency.setValueAtTime(freq, audioContext.currentTime)
  gainNode.gain.value = 0.0;
  oscillatorNode.start(audioContext.currentTime);
}

function stopSound() {
  if (audioContext === undefined) return;
  if (oscillatorNode === undefined) return;
  if (gainNode === undefined) return;


  const stopTime = 3.0;
  gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.0, audioContext.currentTime + stopTime);
  oscillatorNode.stop(audioContext.currentTime + stopTime);

  setTimeout(() => {
    if (audioContext === undefined) return;
    if (oscillatorNode === undefined) return;
    if (gainNode === undefined) return;
    oscillatorNode.disconnect(gainNode);
    gainNode.disconnect(audioContext.destination);

    audioContext.close().then(()=> {
      console.log(`close AudioContext():`);
    });
  }, stopTime * 1000);

}

//------------------------------------------------------------
//------------------------------------------------------------

type Props = {
  freq: string;
}

const SolfeggioTone = (props: Props) => {
//  const [count, setCount] = useState(0);
  const [playFlag, setPlayFlag] = useState(false);
  let freq: number = Number(props.freq);

  useEffect(() => {
    if (playFlag) {
      changeSound(freq);
    }
  });

  useEffect(() => {
    return () => {  // clean up the subscription
    };
  });

  return (
    <div>
      <Button variant="contained" onClick={() => {
        playFlag ? stopSound() : playSound(freq);
        setPlayFlag(!playFlag);
        }}>{playFlag ? 'とめる' : 'はじめる'}</Button>
    </div>
  );
}

export default SolfeggioTone;

//------------------------------------------------------------
