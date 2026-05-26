import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <header className="top-header">
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>DEBUG_OS_v1.0</div>

            <div className="icons" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {auth.currentUser && auth.currentUser.photoURL && (
                    <img src={auth.currentUser.photoURL} alt="Profile" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                )}
                <button onClick={handleLogout} className="btn" style={{ padding: '8px 16px', backgroundColor: '#222', border: '1px solid #444', color: '#fff', fontSize: '0.85rem' }}>
                    Logout
                </button>
            </div>
        </header>
    );
}
