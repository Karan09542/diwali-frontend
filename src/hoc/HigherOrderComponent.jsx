import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

function HOC(WrapperComponent) {
  return function InnerComponent() {
    return (
      <div className="bg-[url('https://thumbs.dreamstime.com/b/close-up-captures-illuminated-floating-diya-oil-lamp-vibrant-flame-reflecting-calm-water-serene-image-perfect-380641886.jpg')] bg-cover w-screen flex flex-col h-screen">
        <div className="m-4">
          <HeaderComponent/>
          {<WrapperComponent />}
        </div>
        <footer className="mt-auto bg-yellow-300/10 text-white px-5 py-5 ">
          <p className="text-sm">Copyright &copy; Deepawali 2025</p>
        </footer>
      </div>
    );
  };
}
export default HOC;
