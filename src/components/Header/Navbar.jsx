import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogoutOutlined, DashboardOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Typography } from 'antd'

const Navbar = () => {
    const navigate = useNavigate()
    const { isAuth, handleLogout, user } = useAuth()
    const [open, setOpen] = useState(false)
    const displayName = user?.fullName || user?.email || 'User'

    const items = [
        {
            key: '1',
            label: 'Dashboard',
            icon: <DashboardOutlined />,
            onClick: () => {
                navigate('/dashboard')
            }
        },
        {
            key: '2',
            label: 'Logout',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: () => {
                handleLogout()
            }
        }
    ]
    return (
        <nav className="h-17.5 relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-linear-to-r from-indigo-700 to-violet-500 transition-all">

            <div className="flex items-center gap-10">
                <Link to="/" className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold text-white">Todos</h1>
                </Link>

                <ul className="hidden md:flex items-center gap-10 text-white">
                    <li><Link to="/" className="hover:text-white/70 transition">Home</Link></li>
                    <li><Link to="/about" className="hover:text-white/70 transition">About</Link></li>
                    <li><Link to="/contact" className="hover:text-white/70 transition">Contact</Link></li>
                </ul>
            </div>

            <div className="hidden md:flex items-center gap-3">
                {isAuth ?
                    <>
                        <h2 className="text-xl text-white/90">{user?.fullName}</h2>
                        <Dropdown menu={{ items }} placement="bottomRight">
                            <Avatar size={48} className="cursor-pointer shadow" style={{ backgroundColor: 'white', color: 'black' }}>
                                {user?.fullName?.charAt(0).toUpperCase()}
                            </Avatar>
                        </Dropdown>
                    </>
                    :
                    <>
                        <Link to="/auth/login" className="bg-white text-gray-700 text-sm hover:opacity-90 active:scale-95 transition-all w-32 h-11 rounded-full flex items-center justify-center">
                            Login
                        </Link>
                        <Link to="/auth/register" className="bg-white text-gray-700 text-sm hover:opacity-90 active:scale-95 transition-all w-32 h-11 rounded-full flex items-center justify-center">
                            Register
                        </Link>
                    </>
                }
            </div>

            <div className="flex items-center gap-2 md:hidden">
                {isAuth && (
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-white active:scale-95 transition"
                            aria-label="user-menu"
                        >
                            <Avatar size={28} className="bg-white text-gray-700">
                                {displayName.charAt(0).toUpperCase()}
                            </Avatar>
                            <span className="max-w-24 truncate text-sm font-medium">{displayName}</span>
                        </button>
                    </Dropdown>
                )}

                <button
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label="menu-btn"
                    aria-expanded={open}
                    type="button"
                    className="inline-block active:scale-90 transition"
                >
                    {/* Menu Icon SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#fff">
                        <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${open ? 'block' : 'hidden'} absolute top-17.5 left-0 w-full bg-linear-to-r from-indigo-700 to-violet-500 p-6 md:hidden`}>
                <ul className="flex flex-col space-y-4 text-white text-lg">
                    <li><Link to="/" onClick={() => setOpen(false)} className="text-sm">Home</Link></li>
                    <li><Link to="/about" onClick={() => setOpen(false)} className="text-sm">About</Link></li>
                    <li><Link to="/contact" onClick={() => setOpen(false)} className="text-sm">Contact</Link></li>
                </ul>
                {!isAuth && (
                    <div className="mt-6 flex flex-col gap-3">
                        <Link to="/auth/login" onClick={() => setOpen(false)} className="bg-white text-gray-700 text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full flex items-center justify-center">
                            Login
                        </Link>
                        <Link to="/auth/register" onClick={() => setOpen(false)} className="bg-white text-gray-700 text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full flex items-center justify-center">
                            Register
                        </Link>
                    </div>
                )}
            </div>

        </nav>
    )
}

export default Navbar