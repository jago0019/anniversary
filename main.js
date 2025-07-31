import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import MainScene from './scenes/MainScene.js';
import PhotoScene from './scenes/PhotoScene.js';
import BarbieScene from './scenes/BarbieScene.js';
import MovieScene from './scenes/MovieScene.js';
import SnowScene from './scenes/SnowScene.js';
import ChessScene from './scenes/ChessScene.js';
import ChessGameScene from './scenes/ChessGameScene.js';
import LondonScene from './scenes/LondonScene.js';
import SubwayScene from './scenes/SubwayScene.js';
import StartScene from './scenes/StartScene.js';
import EndScene from './scenes/EndScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1500,
  height: 800,
  backgroundColor: '#1e1e1e',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [BootScene, PreloadScene, MainScene, PhotoScene, BarbieScene, MovieScene, SnowScene, ChessScene, ChessGameScene, LondonScene, SubwayScene, StartScene, EndScene]
};

new Phaser.Game(config);