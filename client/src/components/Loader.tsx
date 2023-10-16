import { DotWave } from '@uiball/loaders';

interface LoaderProps {
  size: number;
  dotColor?: string;
}

const Loader: React.FC<LoaderProps> = ({ dotColor, size }) => {
  return (
    <DotWave size={size} speed={1} color={dotColor ? dotColor : 'black'} />
  );
};
export default Loader;
