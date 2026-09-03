import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import InfinteMarker from "@/components/InfinteMarker";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
    <NavBar/>
      <header className=" flex flex-col items-center justify-center overflow-hidden ">
        <HeroSection />
        <SearchBar />
        <InfinteMarker/>
      </header>
      
        <CtaSection/>
        <Footer/>

     
        
    </>
  );
}
