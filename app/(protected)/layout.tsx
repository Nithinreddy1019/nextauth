import { NavBar } from "./_components/navbar"


interface ProtectedLayoutProps {
    children: React.ReactNode,
}


const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-r from-blue-700  via-blue-500 via-50% to-blue-600 ">
            <NavBar />
            {children}
        </div>
    )
}


export default ProtectedLayout