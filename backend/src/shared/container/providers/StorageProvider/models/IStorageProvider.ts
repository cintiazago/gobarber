export default interface IStorgeProvider {
    saveFile(file: string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}
