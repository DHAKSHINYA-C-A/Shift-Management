import axiosInstance from './axiosInstance';

export const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/users');
        return response.data;
    } catch (err) {
        console.error('Error fetching users:', err);
        return [];
    }
};

export const fetchShifts = async () => {
    try {
        const response = await axiosInstance.get('/api/shifts/current-and-next-2-weeks');
        return response.data;
    } catch (err) {
        console.error('Error fetching shifts:', err);
        return [];
    }
};

export const updateShift = async (shiftData) => {
    try {
        const response = await axiosInstance.post('/api/shifts/update', shiftData);
        return response.data;
    } catch (err) {
        console.error('Error updating shift:', err);
        return null;
    }
};
