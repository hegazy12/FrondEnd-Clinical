export class UserState {
    static #instance: UserState;
    private loginstate : number = 0 ;
    private token : string ="";
    
    private Roles: Array<string> = new Array<string>();

    private constructor() { }

    public static get instance(): UserState {
      if (!UserState.#instance) {
            UserState.#instance = new UserState();
        }

        return UserState.#instance;
    }
    
    
    public setLoginState(loginstate : number ): void 
    {
        this.loginstate = loginstate;
    }

    public getLoginState() : number
    {
      return this.loginstate;
    }

    public setToken(token : string) : void
    {
       this.token = token
    } 

    public getToken() : string
    {
      return this.token;
    }

    public getRoles() : Array<string> {
      return this.Roles;
    }

    public setRole(Role :string) : void{
      this.Roles.push(Role);
    } 

    
    public GetLoginID() : string |null
    {
        return localStorage.getItem('id');
    }
}
