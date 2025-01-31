import { ReactNode } from 'react';
import DocsSidebar from '../components/DocsSidebar';

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      <DocsSidebar />
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
