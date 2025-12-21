import Home from './pages/Home';
import AEDLocations from './pages/AEDLocations';
import FirstAid from './pages/FirstAid';
import EmergencyContacts from './pages/EmergencyContacts';
import MedicalProfile from './pages/MedicalProfile';
import AEDLocationDetail from './pages/AEDLocationDetail';
import GuardianAI from './pages/GuardianAI';
import GuardianCard from './pages/GuardianCard';
import Settings from './pages/Settings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "AEDLocations": AEDLocations,
    "FirstAid": FirstAid,
    "EmergencyContacts": EmergencyContacts,
    "MedicalProfile": MedicalProfile,
    "AEDLocationDetail": AEDLocationDetail,
    "GuardianAI": GuardianAI,
    "GuardianCard": GuardianCard,
    "Settings": Settings,
    "PrivacyPolicy": PrivacyPolicy,
    "TermsOfService": TermsOfService,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};