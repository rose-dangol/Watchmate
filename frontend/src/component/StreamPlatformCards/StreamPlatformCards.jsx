import React from 'react'
import Card from 'react-bootstrap/Card';

const StreamPlatformCards = ({platforms}) => {
  const handleEdit =()=>{
    return true
  }
  return (
    <div className="platforms-container">
      {platforms.map((platform) => {
        return (
            
          <Card style={{ width: '18rem' }} key={platform.id}>
            <Card.Body>
              <Card.Title>{platform.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Streaming Platform</Card.Subtitle>
              <Card.Text>
                {platform.about}
              </Card.Text>
              <Card.Link href={platform.website}>
                Website
              </Card.Link>
              <button onClick={handleEdit}>Edit</button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default StreamPlatformCards