import IUser from './iuser';
import IUserWord from './iuserword';
import IStatistics from './istat';
import ISettings from './isettings';
declare class Model {
    baseURL: string;
    getBook(): Promise<any>;
    getPage(page: number, group: number): Promise<any>;
    getWord(wordId: string): Promise<any>;
    createUser(user: IUser): Promise<any>;
    getUser(id: string, token: string): Promise<any>;
    login(user: IUser): Promise<any>;
    getUserWords(userId: string, token: string): Promise<any>;
    createUserWord(uid: string, wid: string, token: string, word: IUserWord): Promise<any>;
    getUserWord(uid: string, wid: string, token: string): Promise<any>;
    updUserWord(uid: string, wid: string, token: string, word: IUserWord): Promise<any>;
    delUserWord(uid: string, wid: string, token: string): Promise<void>;
    getStat(uid: string, token: string): Promise<any>;
    updStat(uid: string, token: string, stat: IStatistics): Promise<any>;
    getSettings(uid: string, token: string): Promise<any>;
    updSettings(uid: string, token: string, settings: ISettings): Promise<any>;
}
export default Model;
