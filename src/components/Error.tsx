type Props = {
    message: string
}

const Error:React.FC<Props> = ({message}: Props) => {
  return (
    <p style={{textAlign: 'center', fontSize: '1.25rem', fontWeight: 900, backgroundColor: 'red', padding: '1rem', width: 'calc(100% - 3rem)', margin: '1rem auto 1rem auto'}}>{message}</p>
  )
}

export default Error