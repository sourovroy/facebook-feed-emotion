import Output from '../components/Output';
import Importer from '../components/Importer';
import { useSelector } from 'react-redux';

function Home() {
  const resultPage = useSelector((state) => state.process.resultPage);

  return (
    <div>
      {resultPage ? <Output /> : <Importer />}
    </div>
  );
}

export default Home;
