import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login(email, password);

            // Redirect based on role if default path
            if (from === '/') {
                if (user.role === 'admin') navigate('/admin');
                else if (user.role === 'ops_manager') navigate('/ops');
                else if (user.role === 'dca_agent') navigate('/dca');
                else navigate('/');
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const fillCredentials = (role) => {
        if (role === 'admin') {
            setEmail('admin@fedex.com');
            setPassword('Admin@123');
        } else if (role === 'ops') {
            setEmail('ops@fedex.com');
            setPassword('Ops@123');
        } else if (role === 'dca') {
            setEmail('dca@agency.com');
            setPassword('Dca@123');
        }
    };

    return (
        <Card className="w-full shadow-lg border-0">
            <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                    F
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Sign in to your account</CardTitle>
                <p className="text-sm text-gray-500 mt-2">
                    FedEx DCA Management Platform
                </p>
            </CardHeader>

            <CardContent>
                {error && (
                    <div className="mb-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-text-primary">Email address</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-sm font-medium text-text-primary">Password</label>
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary/90">Forgot password?</a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-11"
                        />
                    </div>

                    <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </Button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Quick Login (Demo)</span>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" onClick={() => fillCredentials('admin')} className="text-xs">Admin</Button>
                        <Button variant="outline" size="sm" onClick={() => fillCredentials('ops')} className="text-xs">Ops</Button>
                        <Button variant="outline" size="sm" onClick={() => fillCredentials('dca')} className="text-xs">DCA</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Login;
