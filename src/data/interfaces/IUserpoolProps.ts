export interface IUserpoolProps {
    login: (email: string, password: string) => void;
    loading: boolean;
    isLoggedIn: boolean;
    logout: () => void;
}