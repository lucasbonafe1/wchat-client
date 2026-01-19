export class RegisterModel {
    public username: string;
    public normalizedUsername: string;
    public email: string;
    public password: string;

    public constructor(username: string, email: string, password: string) {
        this.username = username;
        this.normalizedUsername = username.toLowerCase();
        this.email = email;
        this.password = password;
    }
}