import { Outlet } from "react-router-dom";
// import Header from "../components/Header";

const Layout = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/weatherBackGrounds/d8e9712b61aba22c5ca6dac8c7336dcb.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex w-full flex-col min-h-screen"
    >
      {/* <Header /> */}
      <main className=" p-7">
        <Outlet />
      </main>
      <footer className="p-7 w-full bg-gray-100">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
