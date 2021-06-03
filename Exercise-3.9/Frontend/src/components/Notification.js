

const Notification = ({ message,errormessage }) => {
    if (message === null && errormessage ===null) {
      return(
        <></>
      )
    }
    
  if(errormessage===null)
  {
    return (
      <div className="msg">
        {message}
      </div>
    )
  }
  if(message===null)
  {
    return (
      <div className="errormsg">
        {errormessage}
      </div>
    )
  }

  }

  export default Notification