import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading3D from '../../components/Loading3D';

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInWithToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      signInWithToken(token).then(() => navigate('/event-dashboard', { replace: true }));
    } else {
      navigate('/login?error=google_failed', { replace: true });
    }
  }, []);

  return <Loading3D isVisible={true} />;
};

export default GoogleAuthCallback;
