import { createContext, useContext, useEffect, useState } from "react";
import { authoLogin, changePassword, deleteUser, forgotPassword, getAllUsers, loginUser, logoutUser, resetPassword, signupUser, updateMe, updateUser } from "../services/authservice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');

    useEffect(() => {
        const checkUser = async () => {

            try {
                const { data } = await authoLogin();
                setUser(data.user);
            } catch (err) {
                console.log("Not logged in:", err.response?.data?.message || err.message);
            }
        }
        checkUser();

        fetchUsers();

    }, []);

    const signup = async (data) => {
        const toastId = toast.loading('Signing up...');
        try {
            const response = await signupUser(data);
            if (!response) {
                throw new Error('Signup failed');
            }
            toast.update(toastId, {
                render: 'Signup successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            setActiveTab("login")
        } catch (error) {
            toast.update(toastId, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    console.log("heyyy", user);

    const login = async (data) => {
        const toastId = toast.loading('logining...');
        try {
            const response = await loginUser(data);
            if (!response) {
                throw new Error('Login failed');
            }
            setUser(response.data.user);


            await fetchUsers();

            toast.update(toastId, {
                render: 'Login successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            navigate('/')

        }
        catch (error) {
            toast.update(toastId, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }


    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            if (!response) {
                throw new Error('Failed to load users');
            }
            setUsers(response.data.users);
            if (user.role === 'admin') {
                await fetchUsers();
            }

        } catch (err) {
            console.log(err)

        }
    }

    const updateUserrr = async (id, updateData) => {
        const toastId = toast.loading('Updating...');

        try {
            const { data } = await updateUser(id, updateData);
            // update local users state
            setUsers((prev) =>
                prev.map((u) => (u._id === id ? data.user : u))
            );

            toast.update(toastId, {
                render: 'Updated successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            return data.user;
        } catch (err) {
            toast.update(toastId, {
                render: err.response?.data?.message || "Failed to update user",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw err;
        }
    };


    const updateMyProfile = async (updateData) => {
        const toastId = toast.loading('Updating profile...');
        try {
            const { data } = await updateMe(updateData);
            setUser(data.user);
            toast.update(toastId, {
                render: 'Profile updated successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
            return data.user;
        } catch (err) {
            toast.update(toastId, {
                render: err.response?.data?.message || "Failed to update profile",
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
            throw err;
        }
    };

    const deleteUserrr = async (id) => {
        const toastId = toast.loading('Deleting user...');
        try {
            await deleteUser(id); // API call
            setUsers(prev => prev.filter(u => u._id !== id));
            toast.update(toastId, {
                render: 'User deleted successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
        } catch (err) {
            toast.update(toastId, {
                render: err.response?.data?.message || "Failed to delete user",
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
            throw err;
        }
    };


    const changeUserPassword = async (passwordData) => {
        const toastId = toast.loading('Changing password...');
        try {
            await changePassword(passwordData);
            toast.update(toastId, {
                render: 'Password changed successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
        } catch (err) {
            toast.update(toastId, {
                render: err.response?.data?.message || "Failed to change password",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw err;
        }
    };

    const logout = async () => {
        const toastId = toast.loading('Logging out...');
        try {
            await logoutUser()
            setUser(null);
            toast.update(toastId, {
                render: 'Logout successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            navigate('/authentication');

        } catch (err) {
            toast.update(toastId, {
                render: err.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }

    const forgotPasswordAction = async (email) => {
        const toastId = toast.loading('Sending reset link...');
        try {
            await forgotPassword({ email });
            toast.update(toastId, {
                render: 'Reset link sent to your email!',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
        } catch (err) {
            toast.update(toastId, {
                render: err.response?.data?.message || "Failed to send link",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const resetPasswordAction = async (token, newPassword) => {
        const toastId = toast.loading('Resetting password...');
        try {
            await resetPassword(token, { password: newPassword });
            toast.update(toastId, {
                render: 'Password reset successfully! You can now log in.',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
            navigate('/authentication'); // გადავიყვანოთ ავტორიზაციის გვერდზე
        } catch (err) {
            toast.update(toastId, {
                render: err.response?.data?.message || "Link expired or invalid",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };


    return (
        <AuthContext.Provider value={{ userCount: users.length, user, users, activeTab, setActiveTab, signup, login, logout, updateUserrr, changeUserPassword, deleteUserrr, updateMyProfile, forgotPasswordAction, resetPasswordAction }}>
            {children}
        </AuthContext.Provider>
    )

}