import LandingNavBar from '../components/landingPage/LandingNavBar';
import LandingHero from '../components/landingPage/LandingHero';
import LandingFeatures from '../components/landingPage/LandingFeatures';
import LandingCommunity from '../components/landingPage/LandingCommunity';
import LandingTestimonials from '../components/landingPage/LandingTestimonials';
import LandingCTA from '../components/landingPage/LandingCTA';
import LandingFooter from '../components/landingPage/LandingFooter';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

// export default function LandingPage({ onGetStarted }) {
export default function LandingPage() {
    const navigate = useNavigate();
    const onGetStarted = () => {
        navigate('/signup');
    };

    if (!isTokenExpired()) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
            <LandingNavBar onGetStarted={onGetStarted} />
            <LandingHero onGetStarted={onGetStarted} />
            <LandingFeatures />
            <LandingCommunity />
            <LandingTestimonials />
            <LandingCTA onGetStarted={onGetStarted} />
            <LandingFooter />
        </div>
    );
}
