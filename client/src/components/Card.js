function Card(props) {

    const cardStyle = {
        backgroundColor: 'white',
        padding:'40px',
        borderRadius: '10px',
        boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)',
        width: '600px',
        height: '400px'
    }

    return (
        <div style={cardStyle}>
            {props.children}
        </div>
    )
}

export default Card;