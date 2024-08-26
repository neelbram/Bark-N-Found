import dynamic from 'next/dynamic';

const MapPage = dynamic(() => import('../components/map-page'), { ssr: false });

export default MapPage;