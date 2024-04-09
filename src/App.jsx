import Container from "./Components/Container";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div
      className="flex flex-col min-h-screen bg-green-100 justify-between
    "
    >
      <Navbar />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
