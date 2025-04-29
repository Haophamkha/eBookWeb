import { useParams } from 'react-router-dom';
import { Truyen } from './Truyen';

export default function TruyenWrapper() {
  const { bookId } = useParams();
  return <Truyen bookId={bookId} />;
}
