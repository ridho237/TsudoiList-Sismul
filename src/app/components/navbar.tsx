'use client';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../utils/auth';
import {
	Navbar,
	NavbarContent,
	NavbarItem,
	Link,
	Dropdown,
	DropdownTrigger,
	Avatar,
	DropdownItem,
	DropdownMenu,
	Spinner,
} from '@heroui/react';

export default function App() {
	const pathname = usePathname();
	const auth = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		try {
			await logoutUser();
			auth?.logout();
			window.location.replace('/');
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Navbar
			maxWidth='full'
			className='flex justify-start w-full mx-auto bg-firsto border-b-3 border-fourtho'
		>
			<NavbarContent
				className='flex'
				justify='start'
			>
				<NavbarItem>
					<Link
						href='/'
						className='text-fourtho font-semibold'
					>
						TsudoiList
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent
				className='flex'
				justify='center'
			>
				<NavbarItem isActive={pathname === '/#anime'}>
					<Link
						href='/#anime'
						className='text-fourtho'
					>
						Welcome To TsudoiList
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify='end'>
				{auth?.user ? (
					<Dropdown placement='bottom-end'>
						<DropdownTrigger>
							<Avatar
								isBordered
								as='button'
								className='transition-transform'
								src={auth.user.profileImage ?? '/default-avatar.png'}
								alt={auth.user.username ?? 'User'}
							/>
						</DropdownTrigger>
						<DropdownMenu
							aria-label='Profile Actions'
							variant='flat'
						>
							<DropdownItem
								className='text-black'
								key='profile'
							>
								Welcome, {auth.user.username ?? 'User'}!
							</DropdownItem>
							<DropdownItem
								key='profiles'
								href='/profile'
								className='text-fourtho'
							>
								Profile
							</DropdownItem>
							<DropdownItem
								key='animelist'
								href='/anime'
								className='text-fourtho'
							>
								Your Animelist
							</DropdownItem>
							<DropdownItem
								key='logout'
								color='danger'
								className='text-black'
								onPress={handleLogout}
							>
								{loading ? (
									<Spinner
										size='sm'
										color='danger'
									/>
								) : (
									'Log Out'
								)}
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<>
						<Link
							href='/login'
							className='text-fourtho mr-4'
						>
							Login
						</Link>
						<Link
							href='/register'
							className='bg-fourtho text-firsto px-3 py-1 rounded-lg'
						>
							Register
						</Link>
					</>
				)}
			</NavbarContent>
		</Navbar>
	);
}
