import { useForm, useWatch, type Control } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom' // 1. Import useNavigate

// interface for type Safety
interface RegistrationData {
    name: string,
    email: string, 
    password: string,
    confirmPassword: string
}

const Set_Rules = [
    { id: 'length', label: "8+ characters", test: (v: string) => v.length >= 8 },
    { id: 'upper', label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
    { id: 'lower', label: 'Lowercase letter', test: (v: string) => /[a-z]/.test(v) },
    { id: 'num', label: 'A number', test: (v: string) => /[0-9]/.test(v) },
    { id: 'spaec', label: 'Special characters', test: (v: string) => /[!@#$%^&*]/.test(v) }
]

const PasswordCheckList = ({ control }: { control: Control<RegistrationData> }) => {
    const password = useWatch({ control, name: "password", defaultValue: '' })

    return (
        <div className='grid grid-cols-2 gap-2.5 p-3 mt-1.5 bg-gray-50 rounded-2xl border border-gray-400'>
            {Set_Rules.map((rules) => {
                const isPasses = rules.test(password)
                return (
                    <div key={rules.id} className={`flex items-center text-sm font-medium transition-colors duration-300
            ${isPasses ? 'text-green-600 ' : 'text-red-500 '}
            `}>
                        <span className={`mr-2 flex items-center justify-center h-4 w-4 rounded-full border ${isPasses ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
                            {isPasses ? '✓' : ''}
                        </span>
                        {rules.label}
                    </div>)
            })}
        </div>
    )
}

const FromRegistration = () => {
    const navigate = useNavigate(); // 2. Initialize navigate
    const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm<RegistrationData>({
        mode: 'onChange'
    })

    const passwordField = watch("password")

    const onSubmit = async (data: RegistrationData) => {
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                })
            });
            const result = await response.json()
            
            if (response.ok) {
                toast.success(result.message || "Registration Successful!")
                // 3. Navigate to home after a short delay
                setTimeout(() => {
                    navigate('/') 
                }, 2000);
            } else {
                toast.error(result.message || "Registration failed")
            }
        } catch (err) {
            toast.error("Failed to connect to the server. Please try again.")
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <Toaster position="top-center" />
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold text-blue-600 mb-6 text-center'>Create Account</h2>

                <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input type='text'
                            {...register('name', { required: 'Name is required' })}
                            placeholder='Full Name'
                            className='w-full px-4 py-2.5 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none' />
                        {errors.name && <p className='text-red-500 text-xs mt-1.5'>{errors.name.message}</p>}
                    </div>

                    <div>
                        <input type='email'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                            })}
                            placeholder='Email Address'
                            className='w-full px-4 py-2.5 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none' />
                        {errors.email && <p className='text-red-500 text-xs mt-1.5'>{errors.email.message}</p>}
                    </div>

                    <div>
                        <input type='password'
                            {...register('password', {
                                required: "Password is required",
                                minLength: { value: 8, message: "Minimum 8 characters" },
                                maxLength: { value: 12, message: "Maximum 12 characters" },
                                validate: (v) => Set_Rules.every(r => r.test(v)) || "Requirements not met"
                            })}
                            placeholder='Password'
                            className='w-full px-4 py-2.5 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none' />
                        <PasswordCheckList control={control} />
                        {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
                    </div>

                    <div>
                        <input type='password' 
                            {...register('confirmPassword', {
                                required: "Please confirm your password",
                                validate: (value) => value === passwordField || "Passwords do not match"
                            })}
                            placeholder='Confirm Password'
                            className='w-full px-4 py-2.5 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none' />
                        {errors.confirmPassword && <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword.message}</p>}
                    </div>

                    <button type='submit'
                        disabled={isSubmitting}
                        className='w-full bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 disabled:bg-gray-400'>
                        {isSubmitting ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FromRegistration