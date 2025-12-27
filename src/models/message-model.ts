export class MessageModel {
    public type: string;
    public to: string;
    public content: string;

    constructor(type: string, to: string, content: string) {
        this.type = type;
        this.to = to;
        this.content = content;
    }
}