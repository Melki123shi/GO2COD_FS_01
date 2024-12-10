const Failure = ({image} : {image: string}) => {
  return (
    <div className="min-h-screen mt-20 place-self-center">
        <img src={image} alt="%00 Server failure" />
    </div>
  )
}

export default Failure