/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";

function NavLink({ to, active, children }) {
	return <Link href={to} className={`md:ml-4 my-4 md:my-0 px-4 text-2xl md:text-lg colorWhite ${active ? "bgRedOrange fontInterSB py-2 rounded-sm" : "fontInterMed"}`}>{children}</Link>
}

function Menu({ activePage }) {
	return (
		<>
			<NavLink to="/home" active={activePage === "Home"}> Home </NavLink>
			<NavLink to="/myideas" active={activePage === "My Ideas"}> My Ideas </NavLink>
			<NavLink to="/ideas" active={activePage === "Ideas"}> Ideas </NavLink>
			<NavLink to="/leaderboard" active={activePage === "Leaderboard"}> Leaderboard </NavLink>
		</>
	)
}

function MobileNav({ open, setOpen, activePage }) {
	return (
		<div className={`absolute top-0 left-0 h-screen w-screen transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md bgBlack`}>
			<div className="flex items-center justify-center h-20 px-4">
				<img src="/images/icon_white.svg" alt="InnoScope icon" className="w-12" />
				<h1 className="mx-4 text-3xl md:text-4xl colorWhite fontMarkProBold">InnoScope</h1>
			</div>
			<div className="flex flex-col w-10/12 mx-4">
				<Menu activePage={activePage} />
			</div>
		</div>
	)
}

function Navbar({ activePage }) {
	const [open, setOpen] = useState(false);

	return (
		<nav className="flex filter drop-shadow-md px-4 py-4 h-20 items-center bgBlack">
			<MobileNav open={open} setOpen={setOpen} activePage={activePage} />
			<div className="flex items-center justify-center h-20 px-4">
				<img src="/images/icon_white.svg" alt="InnoScope icon" className="w-12" />
				<h1 className="mx-4 text-3xl md:text-4xl colorWhite fontMarkProBold">InnoScope</h1>
			</div>
			<div className="w-9/12 flex justify-end items-center">

				<div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
					setOpen(!open)
				}}>
					<span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""} bgWhite`} />
					<span className={`h-1 w-full rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"} bgWhite`} />
					<span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""} bgWhite`} />
				</div>

				<div className="hidden md:flex items-center">
					<Menu activePage={activePage} />
				</div>
			</div>
		</nav>
	)
}

export default Navbar;