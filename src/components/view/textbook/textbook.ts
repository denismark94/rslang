import IWord from '../../model/iword';

class TextBookSection {
  baseURL: string;

  constructor(url: string) {
    this.baseURL = url;
    console.log('textbook_constructor_stub');
  }

  draw_page(data: IWord[]) {
    console.log(data);
    const wordWrapper = <HTMLDivElement>document.querySelector('.words');
    wordWrapper.innerHTML = '';
    data.forEach((wordContents) => {
      wordWrapper.appendChild(this.draw_word(wordContents));
    });
  }

  draw_word(content: IWord): HTMLDivElement {
    const wordCard = document.createElement('div');
    wordCard.className = 'word-card';
    const img = document.createElement('img');
    img.className = 'association';
    img.src = this.baseURL + '/' + content.image;
    img.alt = 'association';
    wordCard.appendChild(img);

    const contentBlock = document.createElement('div');
    contentBlock.className = 'contents';

    const titleBlock = document.createElement('div');
    titleBlock.className = 'title';
    const spanWord = document.createElement('span');
    spanWord.className = 'word';
    spanWord.textContent = content.word;
    titleBlock.appendChild(spanWord);
    const spanTranscript = document.createElement('span');
    spanTranscript.className = 'transcription';
    spanTranscript.textContent = content.transcription;
    titleBlock.appendChild(spanTranscript);
    const spanTranslate = document.createElement('span');
    spanTranslate.className = 'translate';
    spanTranslate.textContent = content.wordTranslate;
    titleBlock.appendChild(spanTranslate);
    const playButton = document.createElement('button');
    playButton.className = 'audio';
    playButton.textContent = 'Play';
    titleBlock.appendChild(playButton);
    contentBlock.appendChild(titleBlock);

    const desciptionBlock = document.createElement('div');
    desciptionBlock.className = 'description';
    const descriptEN = document.createElement('p');
    descriptEN.className = 'en';
    descriptEN.innerHTML = content.textMeaning;
    desciptionBlock.appendChild(descriptEN);
    const descriptRU = document.createElement('p');
    descriptRU.className = 'ru';
    descriptRU.innerHTML = content.textMeaningTranslate;
    desciptionBlock.appendChild(descriptRU);

    const exampleBlock = document.createElement('div');
    exampleBlock.className = 'example';
    const exampleEN = document.createElement('p');
    exampleEN.className = 'en';
    exampleEN.innerHTML = content.textExample;
    exampleBlock.appendChild(exampleEN);
    const exampleRU = document.createElement('p');
    exampleRU.className = 'ru';
    exampleRU.innerHTML = content.textExampleTranslate;
    exampleBlock.appendChild(exampleRU);

    contentBlock.appendChild(desciptionBlock);
    contentBlock.appendChild(exampleBlock);

    wordCard.appendChild(contentBlock);
    return wordCard;
  }
}

export default TextBookSection;
