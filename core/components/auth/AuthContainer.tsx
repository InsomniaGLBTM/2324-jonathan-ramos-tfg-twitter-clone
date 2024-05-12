import { FaTwitter } from 'react-icons/fa';
export const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black rounded-xl min-h-40 flex flex-col place-items-center pt-4 pb-12 px-20">
      <FaTwitter size={50} className="text-sky-500 mb-6" />
      {children}
    </div>
  );
};
