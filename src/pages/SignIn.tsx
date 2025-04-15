import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../ReusableComponents/Input";

const LoginForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    interface ILoginForm {
        email: string;
        password: string;
    }
    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        try {
            setLoading(true);
            await login(data.email, data.password);
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) {
        console.log('a');

    }

    return (
        <div className="w-full text-dark-color min-h-screen flex items-center justify-center">
            <div className="flex flex-col w-md">
                <form className='text-dark-color space-y-4 my-4 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                {...field}  // Spread field to ensure onChange, value, onBlur are passed
                                label="მეილი"
                                placeholder="შეიყვანეთ მეილი"
                            />
                        )}
                    />
                    {errors.email && <span className="text-red-700 text-sm mt-2">importantField</span>}

                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                {...field}  // Spread field to ensure onChange, value, onBlur are passed
                                label="პაროლი"
                                type="password"
                                placeholder="შეიყვანეთ პაროლი"
                            />
                        )}
                    />
                    {errors.password && <span className="text-red-700 text-sm mt-2">importantField</span>}

                    {/* {!forAdmin && <div className="flex items-center justify-end">
                    <Link to='/participant/reset-password' className="self-end hover:text-blue-800 hover:underline">{t("forgotPassword")}?</Link>
                </div>} */}

                    <div>
                        <button className="bg-main-color cursor-pointer text-grayish px-5 py-3 w-full" type='submit'>
                            {loading && <span className="loading loading-spinner"></span>}
                            login
                        </button>
                    </div>
                </form>
                <span className='mt-8'>რეგისტრაცია
                    <Link to="/register" className="text-main-color underline ml-2">დაგვიკავშირდი</Link>
                </span>
            </div>
        </div>
    );
};

export default LoginForm;