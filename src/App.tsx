import React from 'react';

//import HttpsRedirect from 'react-https-redirect';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SolfeggioTone from './SolfeggioTone';

import './App.css';

function App() {
  const [value, setValue] = React.useState('528');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="./solfeggio.jpg" alt="solfeggio" />
      </header>

      <main className="App-main">
        <FormControl component="fieldset">
          <FormLabel component="legend">ソルフェジオ周波数</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel value="528" control={<Radio />} label="基本の周波数 528Hz プラーナ、気：トランスフォーメーション、奇跡、DNA修復" />
            <FormControlLabel value="852" control={<Radio />} label="直感の周波数 852Hz 直感力の覚醒" />
            <FormControlLabel value="285" control={<Radio />} label="促進の周波数 285Hz 多次元領域からの意識の拡大と促進" />
            <FormControlLabel value="396" control={<Radio />} label="解放の周波数 396Hz ハーモニー／１つである／統一：罪悪感と恐怖を開放" />
            <FormControlLabel value="174" control={<Radio />} label="安定の周波数 174Hz 意識の拡大と進化の基礎" />
            <FormControlLabel value="639" control={<Radio />} label="調和の周波数 639Hz つながり／コミュニケーション：人間関係をつなぐ" />
            <FormControlLabel value="741" control={<Radio />} label="自由の周波数 741Hz 音：直感を呼び起こす" />
            <FormControlLabel value="417" control={<Radio />} label="変化の周波数 417Hz マイナスな状況からの回復、変容の促進" />
            <FormControlLabel value="963" control={<Radio />} label="活性の周波数 963Hz 意識、特訓：霊とのつながり" />
          </RadioGroup>
        </FormControl>
        <div>
          <SolfeggioTone freq={value} />
        </div>
      </main>
      <footer className="App-footer">
      </footer>
    </div>
  );
}

export default App;
