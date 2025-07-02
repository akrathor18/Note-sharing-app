import { Save, Eye, EyeOff, Lock } from 'lucide-react';

export default function SettingsSecurity({
    showPassword,
    setShowPassword,
    errors,
    register,
    isSubmitting,
    newPassword,
    handleSubmit,
    onSubmit,
}) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2 className="text-lg font-bold mb-4">Security Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                            Current Password
                        </label>
                        <input
                            {...register('currentPassword', {
                                required: 'This field is Required *',
                            })}
                            id="currentPassword"
                            type="password"
                            className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                        />
                        {errors.currentPassword && (
                            <span className="text-red-500 text-sm">
                                {errors.currentPassword.message}
                            </span>
                        )}
                    </div>
                    {/* New Password */}
                    <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                        New Password
                    </label>
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                            size={18}
                        />
                        <input
                            id="newPassword"
                            type={showPassword ? 'text' : 'password'}
                            {...register('newPassword', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className={`w-full bg-[#0D0D0D] border ${errors.newPassword ? 'border-red-500' : 'border-[#F5F5F5]/10'} rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:border-[#FF007F]`}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40 hover:text-[#F5F5F5]"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.newPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>
                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                                size={18}
                            />
                            <input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) =>
                                        value === newPassword || 'Passwords do not match',
                                })}
                                className={`w-full bg-[#0D0D0D] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#F5F5F5]/10'} rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors`}
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <div className="pt-2">
                        <p className="text-sm text-[#F5F5F5]/60 mb-2">Password Requirements:</p>
                        <ul className="text-xs text-[#F5F5F5]/60 space-y-1 list-disc pl-5">
                            <li>At least 8 characters long</li>
                            <li>Include at least one uppercase letter</li>
                            <li>Include at least one number</li>
                            <li>Include at least one special character</li>
                        </ul>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex items-center gap-2 ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#FF007F] hover:bg-[#FF007F]/90'} text-white px-4 py-2 rounded-lg transition-colors`}
                        >
                            <Save size={16} />
                            {isSubmitting ? 'Saving...' : 'Update Password'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
