import styled from 'styled-components';

export const LoginCard = styled.div`
  width: 100%;
  max-width: ${props => props.$isSignUp ? '800px' : '500px'};
  min-height: ${props => props.$isSignUp ? '700px' : '600px'};
  background: #000;
  color: #fff;
  border-radius: 16px;
  padding: ${props => props.$isSignUp ? '40px' : '30px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  margin: 0 auto;
  transition: all 0.3s ease;
`;

export const PoseidonIcon = () => (
  <img 
    src="/src/assets/poseidonIcon.png" 
    alt="Poseidon Logo" 
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      filter: 'invert(1)'
    }}
  />
);

export const LogoContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 25px;
  color: #1d9bf0;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Title = styled.h1`
  font-family: 'Caveat', cursive;
  font-size: 42px;
  font-weight: 700;
  margin: 10px 0 30px;
  color: #1DA1F2;
  text-align: center;
  letter-spacing: -0.5px;
  line-height: 1.1;
  text-transform: none;
`;

export const Form = styled.form`
  width: 100%;
  max-width: ${props => props.$isSignUp ? '500px' : '400px'};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  background: transparent;
  border: 1px solid #333;
  border-radius: 4px;
  color: #fff;
  font-size: 17px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #1d9bf0;
  }

  &::placeholder {
    color: #71767b;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: #fff;
  color: #0f1419;
  border: none;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;

  &:hover {
    background-color: #e6e6e6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SignUpLink = styled.button`
  background: none;
  border: none;
  color: #1d9bf0;
  cursor: pointer;
  font-weight: 600;
  margin-left: 5px;
  padding: 0;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #e7e9ea;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #1d9bf0;
  }
  
  option {
    background-color: #000;
    color: #fff;
    padding: 10px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #71767b;
  font-size: 15px;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #333;
    margin: 0 10px;
  }
`;

export const SignUpText = styled.p`
  color: #71767b;
  font-size: 15px;
  margin-top: 40px;
  text-align: center;
`;

