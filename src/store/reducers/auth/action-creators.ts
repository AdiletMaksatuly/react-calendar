import { AppDispatch } from '../..';
import UserService from '../../../api/UserService';
import { IUser } from '../../../models/IUser';
import { AuthAction, AuthActionEnum } from './types';

export const AuthActionCreators = {
    setUser: (user: IUser): AuthAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
    setError: (error: string): AuthAction => ({ type: AuthActionEnum.SET_ERROR, payload: error }),
    setIsLoading: (isLoading: boolean): AuthAction => ({
        type: AuthActionEnum.SET_IS_LOADING,
        payload: isLoading,
    }),
    setIsAuth: (isAuth: boolean): AuthAction => ({
        type: AuthActionEnum.SET_AUTH,
        payload: isAuth,
    }),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            AuthActionCreators.setIsLoading(true);
            setTimeout(async () => {
                const response = await UserService.getUsers();
                const mockUser = response.data.find(
                    (user) => user.username === username && user.password === password
                );

                if (mockUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUser.username);
                    dispatch(AuthActionCreators.setUser(mockUser));
                    dispatch(AuthActionCreators.setIsAuth(true));
                } else {
                    dispatch(AuthActionCreators.setError('Invalid username or password'));
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000);
        } catch (error) {
            AuthActionCreators.setError('Unknown error');
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));
    },
};
