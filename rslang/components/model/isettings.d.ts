interface ISettings {
    wordsPerDay: string;
    optional?: {
        wordsPerMoth?: string;
    };
}
export default ISettings;
