import IWord from '../../model/iword';

class TextBookSection {
  baseURL: string;

  currentChapter: number;

  currentPage: number;

  pagesPerChapter = 30;

  constructor(url: string) {
    this.baseURL = url;
    this.currentChapter = 0;
    this.currentPage = 1;
    this.draw_selectors();
    this.reassign_selectors();
  }

  draw_page(data: IWord[]) {
    const wordWrapper = <HTMLDivElement>document.querySelector('.words');
    wordWrapper.innerHTML = '';
    data.forEach((wordContents) => {
      wordWrapper.appendChild(this.draw_word(wordContents));
    });
  }

  draw_selectors() {
    const pageWrapper = <HTMLSelectElement>(
      document.querySelector('.pagination')
    );
    pageWrapper.innerHTML = '';
    const backBtn = document.createElement('button');
    backBtn.id = 'pagprev';
    backBtn.innerHTML =
      '<svg viewBox="0 0 24 24"><path d="M14 7l-5 5 5 5V7z"></path></svg>';
    pageWrapper.appendChild(backBtn);

    const curBtn = document.createElement('button');
    curBtn.id = 'pagcur';
    curBtn.classList.add('active');
    pageWrapper.appendChild(curBtn);

    const nextBtn = document.createElement('button');
    nextBtn.id = 'pagnext';
    nextBtn.innerHTML =
      '<svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5v10z"></path></svg>';
    pageWrapper.appendChild(nextBtn);
  }

  reassign_selectors() {
    const prev = <HTMLButtonElement>document.getElementById('pagprev');
    prev.disabled = false;
    const cur = <HTMLButtonElement>document.getElementById('pagcur');
    const next = <HTMLButtonElement>document.getElementById('pagnext');
    next.disabled = false;
    switch (this.currentPage) {
      case 0:
        prev.disabled = true;
        break;
      case 29:
        next.disabled = true;
        break;
    }
    cur.textContent = `Страница ${this.currentPage + 1}`;
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
