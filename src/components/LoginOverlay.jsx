import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../context/UserContext';
import {
  LoginCard,
  LogoContainer as PoseidonLogo,
  Title,
  Form,
  Input,
  Button,
  Divider,
  SignUpText,
  SignUpLink,
  PoseidonIcon,
  FormGroup,
  Label,
  Select
} from './LoginCard';

// User roles for the signup form
const USER_ROLES = [
  { value: 'STUDENT', label: 'Student' },
  { value: 'TEACHER', label: 'Teacher' }
];

const LoginOverlay = () => {
  const [activeTab, setActiveTab] = useState('login');
  // Login state
  const [username, setUsername] = useState('');
  // Signup state
  const [signupStep, setSignupStep] = useState('username');
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'STUDENT',
    bio: '',
    gender: 'MALE'
  });
  
  const genderOptions = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' },
    { value: 'OTHER', label: 'Other' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' }
  ];
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const inputRef = useRef(null);
  const { login, register, checkUsername } = useUser();

  useEffect(() => {
    // Auto-focus the input when the component mounts or tab changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkUsernameAvailability = async () => {
    if (!userData.username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    setIsCheckingUsername(true);
    try {
      const result = await checkUsername(userData.username);
      if (result.available) {
        setIsUsernameAvailable(true);
        setSignupStep('userDetails');
      } else {
        toast.error('Username is already taken');
      }
    } catch (error) {
      toast.error(error.message || 'Error checking username');
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (userData.password !== userData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Prepare user data according to backend's UserRequest DTO
    const userRequest = {
      name: `${userData.firstName} ${userData.lastName}`.trim(),
      username: userData.username,
      type: userData.role.toLowerCase(), // 'student' or 'teacher'
      bio: userData.bio || '',
      avatar: '',
      followers: 0,
      following: 0,
      gender: userData.gender
    };

    setIsSubmitting(true);
    try {
      const result = await register(userRequest);
      if (result.success) {
        toast.success('Account created successfully!');
        // Reset form
        setUserData({
          username: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          role: 'STUDENT',
          bio: ''
        });
        setSignupStep('username');
        setActiveTab('login');
      } else {
        toast.error(result.message || 'An error occurred during signup');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(username);
      if (result.success) {
        toast.success('Successfully logged in!');
      } else {
        toast.error(result.message || 'Invalid username or password');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLoginForm = () => (
    <Form onSubmit={handleLogin} $isSignUp={false}>
      <Input
        ref={inputRef}
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        autoComplete="username"
        disabled={isSubmitting}
      />
      
      <Button 
        type="submit"
        disabled={isSubmitting || !username.trim()}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </Form>
  );

  const renderSignupForm = () => {
    if (signupStep === 'username') {
      return (
        <Form onSubmit={(e) => { e.preventDefault(); checkUsernameAvailability(); }}>
          <FormGroup>
            <Label htmlFor="signup-username">Choose a username</Label>
            <Input
              id="signup-username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              placeholder="Username"
              disabled={isCheckingUsername}
            />
          </FormGroup>
          
          <Button 
            type="submit"
            disabled={isCheckingUsername || !userData.username.trim()}
          >
            {isCheckingUsername ? 'Checking...' : 'Check Availability'}
          </Button>
        </Form>
      );
    }

    return (
      <Form onSubmit={handleSignup}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <button 
            type="button" 
            onClick={() => setSignupStep('username')}
            style={{
              background: 'transparent',
              color: '#1DA1F2',
              border: '1px solid #1DA1F2',
              borderRadius: '9999px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
              fontSize: '16px',
              lineHeight: 1
            }}
            aria-label="Go back to username step"
          >
            ←
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontSize: '14px', color: '#71767B' }}>
            Step 2 of 2
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <FormGroup style={{ flex: 1 }}>
            <Label htmlFor="firstName">First Name <span style={{ color: 'red' }}>*</span></Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              required
            />
          </FormGroup>
          
          <FormGroup style={{ flex: 1 }}>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
            />
          </FormGroup>
        </div>

        <FormGroup>
          <Label htmlFor="role">I am a</Label>
          <Select 
            id="role"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
          >
            {USER_ROLES.map(role => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password <span style={{ color: 'red' }}>*</span></Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="Create a password"
            required
            minLength="6"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password <span style={{ color: 'red' }}>*</span></Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="gender">Gender</Label>
          <Select 
            id="gender"
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #2F3336',
              backgroundColor: 'transparent',
              color: '#E7E9EA',
              fontSize: '14px',
              outline: 'none',
              marginBottom: '15px'
            }}
          >
            {genderOptions.map(option => (
              <option 
                key={option.value} 
                value={option.value}
                style={{ backgroundColor: '#15202B', color: '#E7E9EA' }}
              >
                {option.label}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bio">Bio (Optional)</Label>
          <Input
            id="bio"
            as="textarea"
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself..."
            rows="3"
          />
        </FormGroup>

        <Button 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Sign up'}
        </Button>
      </Form>
    );
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          top: '1rem',
          right: '1rem',
          width: 'auto',
          maxWidth: '400px'
        }}
        toastStyle={{
          background: '#15202b',
          color: '#fff',
          borderLeft: '4px solid #1DA1F2',
          marginBottom: '0.5rem',
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}
      />
      
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
        <LoginCard $isSignUp={activeTab === 'signup'}>
          <PoseidonLogo>
            <PoseidonIcon />
          </PoseidonLogo>
          
          <Title>{activeTab === 'login' ? 'Dive in Gladiator' : 'Create your account'}</Title>
          
          {activeTab === 'login' ? renderLoginForm() : renderSignupForm()}
          
          {activeTab === 'login' && (
            <>
              <Divider>or</Divider>
              <Button type="button" style={{ background: 'transparent', border: '1px solid #333', color: '#fff' }}>
                Sign in with Google
              </Button>
            </>
          )}
          
          <SignUpText>
            {activeTab === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <SignUpLink 
              onClick={() => {
                if (activeTab === 'register') {
                  setSignupStep('username');
                  setUserData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
                    role: 'STUDENT',
                    bio: ''
                  });
                }
                setActiveTab(activeTab === 'login' ? 'register' : 'login');
              }}
              disabled={isSubmitting || isCheckingUsername}
            >
              {activeTab === 'login' ? 'Sign up' : 'Sign in'}
            </SignUpLink>
          </SignUpText>
        </LoginCard>
      </div>
    </>
  );
};

export default LoginOverlay;
