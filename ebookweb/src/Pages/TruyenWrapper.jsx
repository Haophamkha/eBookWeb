import { useParams } from 'react-router-dom';
import { Truyen } from './truyen';

export default function TruyenWrapper() {
  const { bookId } = useParams();
  return <Truyen bookId={bookId} />;
}
