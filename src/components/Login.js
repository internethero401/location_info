import { useEffect } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const Login = ({ setFlag, loginEmail, setLoginEmail }) => {
  useEffect(() => {
    // 認証状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合
        setLoginEmail(user.email);
        setFlag(false);
      } else {
        // ユーザーがログアウトしている場合
        setLoginEmail('');
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, [setFlag, setLoginEmail]);

  // button押したらGoogleにLogin
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButton = () => {
    setFlag(false);
  };

  return (
    <div style={{ height: '844px', width: '390px' }}>
      <div style={{ fontSize: '120px', fontWeight: 'bold', marginTop: '120px', textAlign: 'center' }}>Login</div>
      <div style={{ fontSize: '50px', fontWeight: 'bold', marginTop: '80px', textAlign: 'center' }}>sign in with Google account</div>
      {loginEmail === '' ? (
        <button onClick={handleLogin} style={{ height: '90px', width: '300px', fontSize: '60px', fontWeight: 'bold', margin: '80px 45px 0px 45px' }}>sign in</button>
      ) : (
        <button onClick={handleButton} style={{ height: '90px', width: '300px', fontSize: '60px', fontWeight: 'bold', margin: '80px 45px 0px 45px' }}>Next</button>
      )}
    </div>
  );
};

export default Login;