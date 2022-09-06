import IWord from '../../model/iword';
declare class TextBookSection {
    baseURL: string;
    currentChapter: number;
    currentPage: number;
    pagesPerChapter: number;
    constructor(url: string);
    draw_page(data: IWord[]): void;
    draw_selectors(): void;
    draw_word(content: IWord): HTMLDivElement;
}
export default TextBookSection;
