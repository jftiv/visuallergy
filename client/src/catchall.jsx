import { Navigate } from 'react-router';

const CatchAllComponent = () => {
  return <Navigate to="/login" replace />
}

export default CatchAllComponent;