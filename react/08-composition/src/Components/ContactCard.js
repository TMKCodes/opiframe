const ContactCard = (props) => {
  let cardStyle = {
    background : "lightblue",
    height : "200px",
    width : "150px",
    textAlign: "center",
    margin: "10px"
  }

  return (
    <div style={ cardStyle }>
      { props.children }
    </div>
  )
}

export default ContactCard;