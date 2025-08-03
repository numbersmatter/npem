import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Outlet, useNavigate } from 'react-router'
import type { Route } from './+types/layout'
import { requireAuth } from '~/services/auth/auth_utils.server'
import { getUserProfileData } from './dashboard/data.server'
import { signOut } from '~/services/auth/auth_client'

type SiteProfile = {
  firstName: string;
  lastName: string;
  email: string;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Projects', href: '/projects', current: false },
  { name: 'Calendar', href: '/calendar', current: false },
]



export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request })
  // const { siteProfile } = await getUserProfileData({ user });

  // This is a placeholder for any data fetching logic you might need
  // For example, fetching user data or settings
  return {};
}



export default function MainLayout({ loaderData }: Route.ComponentProps) {

  // const { siteProfile } = loaderData;
  const navigate = useNavigate();
  const signOutSite = async () => {
    // Logic to sign out the user
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate('/login', {
            replace: true
          });
        }
      }
    })
  };
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow-xs">
          <DesktopNavBar signOutSite={signOutSite} />
          <MobileMenu signOutSite={signOutSite} />
        </Disclosure>

        <div className="py-10">
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

function DesktopNavBar({ signOutSite }: { signOutSite: () => Promise<void> }) {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 justify-between">
      <div className="flex">
        <div className="flex shrink-0 items-center">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="block h-8 w-auto lg:hidden" />
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="hidden h-8 w-auto lg:block" />
        </div>
        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
          {/* {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={clsx(
                item.current
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
              )}
            >
              {item.name}
            </a>
          ))} */}
        </div>
      </div>
      <div className="hidden sm:ml-6 sm:flex sm:items-center">
        <button
          type="button"
          className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
          <MenuButton className="relative flex rounded-full bg-white text-sm text-gray-400 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <UserIcon aria-hidden="true" className="size-6" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <MenuItem key="sign-out">
              <button
                onClick={signOutSite}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                Sign Out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="-mr-2 flex items-center sm:hidden">
        {/* Mobile menu button */}
        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
          <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
        </DisclosureButton>
      </div>
    </div>
  </div>
}

function MobileMenu({
  signOutSite
}: {
  signOutSite: () => Promise<void>
}) {
  return <DisclosurePanel className="sm:hidden">
    <div className="space-y-1 pt-2 pb-3">
      {navigation.map((item) => (
        <DisclosureButton
          key={item.name}
          as="a"
          href={item.href}
          aria-current={item.current ? 'page' : undefined}
          className={clsx(
            item.current
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
            'block border-l-4 py-2 pr-4 pl-3 text-base font-medium'
          )}
        >
          {item.name}
        </DisclosureButton>
      ))}
    </div>
    <div className="border-t border-gray-200 pt-4 pb-3">
      <div className="flex items-center px-4">
        <div className="shrink-0">
          <div className="size-10 rounded-full bg-amber-200" />
        </div>

        <button
          type="button"
          className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="mt-3 space-y-1">

        <DisclosureButton
          as="button"
          onClick={signOutSite}
          className="block px-4 py-2 min-w-full text-base text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        >
          Sign Out
        </DisclosureButton>
      </div>
    </div>
  </DisclosurePanel>
}


