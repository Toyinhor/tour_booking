// src/utils/auth.js
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
};

export const getCurrentUserId = () => {
    const user = getCurrentUser();
    return user?.id || null;
};

export const getCurrentUserRole = () => {
    const user = getCurrentUser();
    return user?.role || null;
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user?.role === 'ADMIN';
};

export const isLogin = () => {
    const user = getCurrentUser();
    if (user !== null) {
        return true;
    }
};

