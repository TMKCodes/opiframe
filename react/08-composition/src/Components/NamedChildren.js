import './NamedChildren.css';

const NamedChildren = ({header, media, content}) => {
  return (
    <div className="card">
      <div>{ header }</div>
      { media ? <div>{ media }</div> : <></> }
      <div>{ content }</div>
    </div>
  )
}

export default NamedChildren;