import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SmartDoctorFinder from '@/components/SmartDoctorFinder';
import DoctorList from '@/components/DoctorList';
import ProfileManagement from '@/components/ProfileManagement';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <SmartDoctorFinder />
        <DoctorList />
        <ProfileManagement />
      </main>
      <Footer />
    </div>
  );
}
