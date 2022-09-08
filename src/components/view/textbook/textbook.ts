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
    //this.reassign_selectors();
  }

  draw_page(data: IWord[]) {
    const wordWrapper = <HTMLDivElement>document.querySelector('.words');
    wordWrapper.innerHTML = '';
    data.forEach((wordContents) => {
      wordWrapper.appendChild(this.draw_word(wordContents));
    });
  }

  draw_selectors() {
    const ulTag = <HTMLUListElement>document.querySelector('.pag-list');

    const totalPages = 29;

    let liTag = '';
    let activeLi;
    let beforePage = this.currentPage - 1;
    let afterPage = this.currentPage + 1;

    if (this.currentPage > 1) {
      liTag += '<li class="btn prev" ><span>‹Prev</span></li>';
    }

    if (this.currentPage > 2) {
      liTag += '<li class="numb"><span>1</span></li>';
      if (this.currentPage > 3) {
        liTag += '<li class="dots"><span>...</span></li>';
      }
    }

    //как много страниц или li показывать перед текущим li
    if (this.currentPage == totalPages) {
      beforePage = beforePage - 2;
    } else if (this.currentPage == totalPages - 1) {
      beforePage = beforePage - 1;
    }

    //как много страниц или li показывать после текущего li
    if (this.currentPage == 0) {
      afterPage = afterPage + 2;
    } else if (this.currentPage == 1) {
      afterPage = afterPage + 1;
    }

    for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
      if (pageLength > totalPages) {
        continue;
      }
      if (pageLength == -1) {
        pageLength = pageLength + 1;
      }
      if (this.currentPage == pageLength) {
        activeLi = 'active';
      } else {
        activeLi = '';
      }
      liTag += `<li class="numb ${activeLi}"><span>${pageLength}</span></li>`;
    }

    if (this.currentPage < totalPages - 1) {
      if (this.currentPage < totalPages - 2) {
        liTag += '<li class="dots"><span>...</span></li>';
      }
      liTag += `<li class="numb"><span>${totalPages}</span></li>`;
    }

    if (this.currentPage < totalPages) {
      liTag += '<li class="btn next"><span>Next›</span></li>';
    }
    ulTag.innerHTML = liTag;
  }

  playWord(audio: HTMLAudioElement) {
    return new Promise((resolve, reject) => {
      audio.play();
      audio.addEventListener('ended', () => {
        resolve();
      });
    });
  }

  // reassign_selectors() {
  //   const prev = <HTMLButtonElement>document.getElementById('pagprev');
  //   prev.disabled = false;
  //   const cur = <HTMLButtonElement>document.getElementById('pagcur');
  //   const next = <HTMLButtonElement>document.getElementById('pagnext');
  //   next.disabled = false;
  //   switch (this.currentPage) {
  //     case 0:
  //       prev.disabled = true;
  //       break;
  //     case 29:
  //       next.disabled = true;
  //       break;
  //   }
  //   cur.textContent = `Страница ${this.currentPage + 1}`;
  // }

  draw_word(content: IWord): HTMLDivElement {
    const wordCard = document.createElement('div');
    wordCard.id = '_' + content.id;
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
    playButton.innerHTML = `<svg class="icon_audio" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
    <audio class='word_audio' src="${
      this.baseURL + '/' + content.audio
    }"></audio>
    <audio class='example_audio' src="${
      this.baseURL + '/' + content.audioExample
    }"></audio>
    <audio class='meaning_audio' src="${
      this.baseURL + '/' + content.audioMeaning
    }"></audio>`;

    playButton.addEventListener('click', () => {
      const audio_1 = <HTMLAudioElement>(
        document.querySelector(`#${wordCard.id} .word_audio`)
      );
      console.log(audio_1);
      const audio_2 = <HTMLAudioElement>(
        document.querySelector(`#${wordCard.id} .example_audio`)
      );
      const audio_3 = <HTMLAudioElement>(
        document.querySelector(`#${wordCard.id} .meaning_audio`)
      );

      this.playWord(audio_1)
        .then(() => this.playWord(audio_2))
        .then(() => this.playWord(audio_3));
    });
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
