'use client';

const flagMap: Record<string, string> = {
  CA: '/_next/static/media/CA.9f041382.svg',
  US: '/_next/static/media/US.7987b663.svg',
  BR: '/_next/static/media/BR.dc6da8ce.svg',
  FI: '/_next/static/media/FI.6e683e8a.svg',
  UK: '/_next/static/media/UK.94f12761.svg',
  DE: '/_next/static/media/DE.e4725556.svg',
  CH: '/_next/static/media/CH.790e9e93.svg',
  ES: '/_next/static/media/ES.8d02d729.svg',
  FR: '/_next/static/media/FR.281d1e7e.svg',
  IL: '/_next/static/media/IL.63963872.svg',
  IN: '/_next/static/media/IN.61c5f730.svg',
  SG: '/_next/static/media/SG.2d790ff2.svg',
  JP: '/_next/static/media/JP.568247ab.svg',
  AU: '/_next/static/media/AU.65b57104.svg',
};

interface RegionFlagProps {
  code: string;
  name: string;
  className?: string;
}

export default function RegionFlag({ 
  code, 
  name,
  className = "w-5 h-4 rounded-sm"
}: RegionFlagProps) {
  const flagSrc = flagMap[code.split('-')[0]] || flagMap.US;

  return (
    <div className="flex-shrink-0 bg-gray-100/50 drop-shadow-md">
      <img
        src={flagSrc}
        alt={`Flag for ${name}`}
        className={className}
        loading="lazy"
        width="16"
        height="12"
        decoding="async"
      />
    </div>
  );
}
