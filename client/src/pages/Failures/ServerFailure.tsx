import Failure from '../../components/Failure';
import ServerFailureImage from '../../assets/500.png';

const ServerFailure = () => {
  return (
    <Failure image={ServerFailureImage}/>
  )
}

export default ServerFailure